import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';
import * as wafv2 from 'aws-cdk-lib/aws-wafv2';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a secret for the reCAPTCHA key (or retrieve existing)
    const recaptchaSecret = new secretsmanager.Secret(this, 'RecaptchaSecret', {
      secretName: 'portfolio/recaptcha-secret-key',
      description: 'Secret key for reCAPTCHA verification',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          RECAPTCHA_SECRET_KEY: 'placeholder-replace-with-actual-key'
        }),
        generateStringKey: 'password' // This won't be used but is required
      }
    });

    // Create a log group for Lambda
    const lambdaLogGroup = new logs.LogGroup(this, 'ContactFormLogGroup', {
      logGroupName: '/aws/lambda/contact-form-handler',
      retention: logs.RetentionDays.ONE_WEEK
    });

    // Create Lambda function for contact form
    const contactFormLambda = new lambdaNodejs.NodejsFunction(this, 'ContactFormLambda', {
      functionName: 'portfolio-contact-form-handler',
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../lambda/contact-form-handler.ts'),
      handler: 'handler',
      environment: {
        RECAPTCHA_SECRET_KEY: recaptchaSecret.secretValueFromJson('RECAPTCHA_SECRET_KEY').toString()
      },
      logGroup: lambdaLogGroup,
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      tracing: lambda.Tracing.ACTIVE, // Enable X-Ray tracing
      bundling: {
        minify: true,
        sourceMap: true,
        externalModules: [
          'aws-sdk'
        ]
      }
    });

    // Grant Lambda permission to send emails with SES
    contactFormLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['ses:SendEmail', 'ses:SendRawEmail'],
      resources: ['*']
    }));

    // Create API Gateway
    const api = new apigateway.RestApi(this, 'ContactFormAPI', {
      restApiName: 'Portfolio Contact Form API',
      description: 'API for the portfolio contact form',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'X-Amz-Date', 'Authorization', 'X-Api-Key']
      },
      deployOptions: {
        stageName: 'prod',
        dataTraceEnabled: true,
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        tracingEnabled: true,
        metricsEnabled: true
      }
    });

    // Create API Key and Usage Plan
    const apiKey = api.addApiKey('ContactFormApiKey');
    
    const plan = api.addUsagePlan('ContactFormUsagePlan', {
      name: 'ContactFormUsagePlan',
      apiKey,
      throttle: {
        rateLimit: 10,
        burstLimit: 2
      },
      quota: {
        limit: 1000,
        period: apigateway.Period.MONTH
      }
    });
    
    plan.addApiStage({
      stage: api.deploymentStage
    });

    // Create WAF Web ACL for API Gateway
    const webAcl = new wafv2.CfnWebACL(this, 'PortfolioApiWaf', {
      name: 'portfolio-api-waf',
      scope: 'REGIONAL',
      defaultAction: {
        allow: {}
      },
      rules: [
        {
          name: 'RateLimitRule',
          priority: 1,
          action: {
            block: {}
          },
          statement: {
            rateBasedStatement: {
              limit: 100,
              aggregateKeyType: 'IP'
            }
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: 'RateLimitRule'
          }
        },
        {
          name: 'AWSManagedRulesCommonRuleSet',
          priority: 2,
          overrideAction: {
            none: {}
          },
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesCommonRuleSet'
            }
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: 'AWSManagedRulesCommonRuleSet'
          }
        }
      ],
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'PortfolioApiWaf',
        sampledRequestsEnabled: true
      }
    });

    // Associate WAF with API Gateway
    new wafv2.CfnWebACLAssociation(this, 'WafApiAssociation', {
      resourceArn: `arn:aws:apigateway:${this.region}::/restapis/${api.restApiId}/stages/${api.deploymentStage.stageName}`,
      webAclArn: webAcl.attrArn
    });

    // Add contact form endpoint
    const contactResource = api.root.addResource('contact');
    contactResource.addMethod('POST', new apigateway.LambdaIntegration(contactFormLambda), {
      apiKeyRequired: true
    });

    // Create Amplify App
    const amplifyApp = new amplify.App(this, 'PortfolioInfrastructureApp', {
      appName: 'Portfolio',
      // Connect to GitHub repo - Uncomment and update when ready to connect to GitHub
      // sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
      //   owner: 'simoncheam', // Replace with your GitHub username
      //   repository: 'portfolio',
      //   oauthToken: cdk.SecretValue.secretsManager('github-token')
      // }),

      // Build specification
      buildSpec: codebuild.BuildSpec.fromObjectToYaml({
        version: '1.0',
        frontend: {
          phases: {
            preBuild: {
              commands: [
                'echo "Starting build..."',
                'cd portfolio',
                'npm ci --cache .npm --prefer-offline'
              ],
            },
            build: {
              commands: [
                'echo "Building Next.js app"',
                'npm run build',
                'echo "Build completed"'
              ],
            },
          },
          artifacts: {
            baseDirectory: 'portfolio/.next',
            files: ['**/*'],
          },
          cache: {
            paths: [
              'node_modules/**',
              '.next/cache/**/*'
            ]
          }
        }
      }),
      environmentVariables: {
        'LAMBDA_FUNCTION_ARN': contactFormLambda.functionArn,
        'API_ENDPOINT': `https://${api.restApiId}.execute-api.${this.region}.amazonaws.com/prod/`,
        'API_KEY': apiKey.keyId
      }
    });

    // Add main branch
    const mainBranch = amplifyApp.addBranch('main', {
      autoBuild: true,
    });

    // Add CloudWatch dashboard for monitoring
    const dashboard = new cdk.aws_cloudwatch.Dashboard(this, 'PortfolioDashboard', {
      dashboardName: 'Portfolio-Monitoring'
    });

    dashboard.addWidgets(
      new cdk.aws_cloudwatch.GraphWidget({
        title: 'API Gateway Requests',
        left: [api.metricCount()]
      }),
      new cdk.aws_cloudwatch.GraphWidget({
        title: 'Lambda Errors',
        left: [contactFormLambda.metricErrors()]
      }),
      new cdk.aws_cloudwatch.GraphWidget({
        title: 'Lambda Duration',
        left: [contactFormLambda.metricDuration()]
      })
    );

    // Outputs
    new cdk.CfnOutput(this, 'AmplifyAppURL', {
      value: `https://${mainBranch.branchName}.${amplifyApp.defaultDomain}`,
      description: 'URL for the deployed Amplify application'
    });

    new cdk.CfnOutput(this, 'ContactFormApiEndpoint', {
      value: `${api.url}contact`,
      description: 'Endpoint for the contact form API'
    });

    new cdk.CfnOutput(this, 'ApiKeyId', {
      value: apiKey.keyId,
      description: 'API Key ID for the contact form API'
    });

    new cdk.CfnOutput(this, 'LambdaFunction', {
      value: contactFormLambda.functionName,
      description: 'Lambda function name for contact form processing'
    });

    new cdk.CfnOutput(this, 'RecaptchaSecretName', {
      value: recaptchaSecret.secretName,
      description: 'Secret name for reCAPTCHA key'
    });
  }
}