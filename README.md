# Portfolio Infrastructure

This repository contains the AWS CDK infrastructure code for deploying a modern portfolio website with a serverless contact form system. The infrastructure follows AWS Well-Architected Framework principles to ensure operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability.

## Architecture Overview

The portfolio infrastructure consists of the following components:

- **AWS Amplify**: Hosts the Next.js portfolio website with CI/CD pipeline
- **API Gateway**: Provides RESTful API endpoints for the contact form
- **Lambda Function**: Processes contact form submissions
<!-- - **DynamoDB**: Stores contact form data -->
- **Amazon SES**: Sends email notifications for new contact submissions
- **CloudWatch**: Monitors and logs infrastructure events
- **AWS WAF**: Protects the application from common web exploits
- **Secrets Manager**: Securely stores sensitive configuration

## Prerequisites

- AWS CLI configured with appropriate permissions
- Node.js (v14.x or later)
- AWS CDK Toolkit installed (`npm install -g aws-cdk`)
- TypeScript knowledge
- Git

## Project Structure

```
portfolio-infrastructure/
├── bin/                    # CDK app entry point
├── lib/                    # Stack definitions
├── test/                   # Unit tests
├── lambda/                 # Lambda function code
├── cdk.json                # CDK configuration
├── package.json            # Dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables in your AWS account or use AWS Secrets Manager

4. Deploy the stack:
   ```
   npm run build
   npx cdk deploy
   ```

## Security Features

- API Gateway secured with API keys and proper IAM roles
- WAF integration to protect against common web attacks
- Secrets managed through AWS Secrets Manager
- Principle of least privilege applied to all IAM roles
- CloudTrail enabled for audit tracking

## Monitoring and Reliability

- CloudWatch alarms for critical metrics
- Error handling with Dead Letter Queues
- Automatic retry mechanisms
- Comprehensive logging for troubleshooting

## Cost Optimization

- Serverless architecture minimizes costs during low-traffic periods
- Budget alerts configured
- Resource tagging strategy implemented
- Right-sized Lambda functions

## Sustainability

- Infrastructure deployed in regions with lower carbon footprints
- Automatic scaling to minimize resource usage
- Efficient resource utilization patterns

## Useful Commands

- `npm run build` Compile TypeScript to JavaScript
- `npm run watch` Watch for changes and compile
- `npm run test` Perform Jest unit tests
- `npx cdk deploy` Deploy stack to your AWS account/region
- `npx cdk diff` Compare deployed stack with current state
- `npx cdk synth` Emit the synthesized CloudFormation template

## Contact Form Integration

The contact form works with the following flow:

1. User submits the form on the portfolio website
2. Form data is validated with reCAPTCHA
3. Request is sent to API Gateway endpoint
4. Lambda processes the submission
5. Data is stored in DynamoDB
6. Notification email is sent via SES
7. Success/failure response returned to user

## Maintenance and Updates

To update the infrastructure:

1. Make changes to the CDK code
2. Run `npm run build` to compile
3. Run `npx cdk diff` to see changes
4. Run `npx cdk deploy` to deploy changes

## Troubleshooting

Common issues and their solutions:

- Check CloudWatch Logs for Lambda errors
- Verify API Gateway configuration
- Ensure SES email addresses are verified
- Check IAM permissions for services

## License

This project is licensed under the MIT License - see the LICENSE file for details
