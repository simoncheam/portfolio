import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as cdk from 'aws-cdk-lib';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class PortfolioInfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Import the existing Lambda function - Next.js app will access this via LAMBDA_FUNCTION_ARN env var
    // This replaces the manually created sendEmailLambda function
    const contactFormLambda = lambda.Function.fromFunctionName(
      this,
      'ImportedContactFormLambda',
      'portfolio-contact-form-handler'
    );

    // Import existing Amplify App instead of creating a new one
    // Note: We use AWS CLI to update this app, not CDK, to avoid TypeScript errors
    const amplifyApp = amplify.App.fromAppId(this, 'ExistingPortfolioApp', 'd3e3dxr1af7svc');
    
    // IMPORTANT: CDK grantInvoke is not sufficient for imported Lambda functions
    // Must manually add permissions to the specific Amplify SSR role with:
    // aws iam attach-role-policy --role-name <AmplifySSRRoleName> --policy-arn <PolicyWithLambdaInvokePermission>
    contactFormLambda.grantInvoke(new iam.ServicePrincipal('amplify.amazonaws.com'));

    // Update environment variables to point to the new Lambda function
    const buildSpec = codebuild.BuildSpec.fromObjectToYaml({
      version: '1.0',
      frontend: {
        phases: {
          preBuild: {
            commands: [
              'echo "Starting build..."',
              'npm ci --cache .npm --prefer-offline'
            ],
          },
          build: {
            commands: [
              'echo "Setting up environment variables..."',
              // This exports the Lambda ARN for Next.js to access during build
              `echo "export LAMBDA_FUNCTION_ARN=${contactFormLambda.functionArn}" >> .env.local`,
              'echo "Building Next.js app"',
              'npm run build',
              // Added export step for static site generation - produces files in 'out' directory
              'npx next export',
              'echo "Build completed"'
            ],
          },
        },
        artifacts: {
          // Changed from '.next' to 'out' to use the static export output
          baseDirectory: 'out',
          files: ['**/*'],
        },
        cache: {
          paths: [
            'node_modules/**/*',
            '.next/cache/**/*'
          ]
        }
      }
    });

    // Note: We use AWS CLI instead of addBranch since IApp interface doesn't have that method
    // AWS CLI command used: aws amplify update-app --app-id d3e3dxr1af7svc --environment-variables LAMBDA_FUNCTION_ARN=arn:aws:lambda:us-east-1:337909778992:function:portfolio-contact-form-handler
    
    // Use a CfnOutput for the Lambda ARN which can be used in AWS CLI commands
    new cdk.CfnOutput(this, 'AmplifyEnvVarCommand', {
      value: `aws amplify update-app --app-id d3e3dxr1af7svc --environment-variables LAMBDA_FUNCTION_ARN=${contactFormLambda.functionArn}`,
      description: 'Command to update Amplify app with Lambda ARN environment variable'
    });
    
    // Create a CloudFormation output for the Amplify app URL
    // This is a hardcoded URL since we can't use defaultDomain on IApp
    new cdk.CfnOutput(this, 'AmplifyAppURL', {
      value: 'https://main.d3e3dxr1af7svc.amplifyapp.com',
      description: 'URL for the deployed Amplify application'
    });

    // Create a CloudFormation output for the Lambda function ARN
    // This exposes the Lambda's unique identifier for reference in other systems or deployments
    new cdk.CfnOutput(this, 'NewLambdaARN', {
      value: contactFormLambda.functionArn,
      description: 'ARN for the contact form Lambda function'
    });
  }
}