import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';

// Adding Lambda and API Gateway imports for potential future use
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // amplify application
    const amplifyApp = new amplify.App(this, 'PortfolioInfrastructureApp', {
      appName: 'Portfolio',
      // Connect to my GitHub repo
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
                'echo "starting build..."',
                'cd portfolio',
                'npm install'
              ],
            },
            build: {
              commands: [
                'echo "Building our Next.js app"',
                'npm run build && npm run export',
                'echo "Build completed"'
              ],
            },
          },
          artifacts: {
            baseDirectory: 'portfolio/out',
            files: ['**/*'],
          },
          cache: {
            paths: [
              'node_modules/**',
              '.next/cache/**/*'
            ]
          }
        }
      })
    })
    const mainBranch = amplifyApp.addBranch('main', {
      autoBuild: true,
    });
    new cdk.CfnOutput(this, 'AmplifyAppURL', {
      value: `https://${mainBranch.branchName}.${amplifyApp.defaultDomain}`,
      description: 'URL for the deployed Amplify application'
    });


    /*
       // Uncomment if you need to implement the Lambda contact form function
       // Create Lambda function for contact form
       const contactFormLambda = new lambda.Function(this, 'ContactFormLambda', {
         runtime: lambda.Runtime.NODEJS_18_X,
         handler: 'index.handler',
         code: lambda.Code.fromInline(`
           // Your Lambda code here...
         `),
         environment: {
           AWS_SES_EMAIL_FROM: 'your-verified-email@example.com',
           AWS_SES_EMAIL_TO: 'your-email@example.com'
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
         defaultCorsPreflightOptions: {
           allowOrigins: apigateway.Cors.ALL_ORIGINS,
           allowMethods: apigateway.Cors.ALL_METHODS
         }
       });
   
       // Add API endpoint output
       const contactResource = api.root.addResource('contact');
       contactResource.addMethod('POST', new apigateway.LambdaIntegration(contactFormLambda));
   
       new cdk.CfnOutput(this, 'ContactFormApiEndpoint', {
         value: `${api.url}contact`,
         description: 'Endpoint for the contact form API'
       });
       */





  }
}
