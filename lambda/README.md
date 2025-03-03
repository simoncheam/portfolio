# Portfolio Contact Form Lambda Function

This Lambda function processes contact form submissions from the portfolio website and sends email notifications using Amazon SES.

## Overview

The Lambda function is set up for direct invocation (not through API Gateway). It processes the form data, performs reCAPTCHA validation, and sends an email notification.

## Configuration

### Environment Variables

This Lambda function requires the following environment variables:

- `AWS_SES_EMAIL_FROM`: The verified SES email address to send from
- `AWS_SES_EMAIL_TO`: The recipient email address for contact form submissions
- `RECAPTCHA_SECRET_KEY`: The secret key for reCAPTCHA verification

## Deployment

### Initial Deployment

To deploy the Lambda function for the first time:

1. Update the `deploy.sh` script with your actual email addresses and reCAPTCHA key
2. Ensure AWS CLI is configured with appropriate credentials
3. Run the deployment script:
   ```
   ./deploy.sh
   ```

### CI/CD with GitHub Actions

This project includes a GitHub Actions workflow for continuous deployment. When you push changes to the Lambda code, the workflow will automatically update the function.

#### Required GitHub Secrets

Set up the following secrets in your GitHub repository:

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key
- `AWS_SES_EMAIL_FROM`: Your verified SES email address
- `AWS_SES_EMAIL_TO`: The recipient email address
- `RECAPTCHA_SECRET_KEY`: Your reCAPTCHA secret key

## Testing

You can test the Lambda function locally using the AWS CLI:

```bash
aws lambda invoke \
  --function-name portfolio-contact-form-handler \
  --payload '{"name":"Test User","email":"test@example.com","message":"This is a test message","recaptchaToken":"your-test-token"}' \
  response.json

cat response.json
```

## Monitoring

The Lambda function logs to CloudWatch. You can view logs using the AWS Console or CLI:

```bash
aws logs get-log-events \
  --log-group-name /aws/lambda/portfolio-contact-form-handler \
  --log-stream-name $(aws logs describe-log-streams \
                      --log-group-name /aws/lambda/portfolio-contact-form-handler \
                      --query 'logStreams[0].logStreamName' \
                      --output text)
```

## Troubleshooting

Common issues:

1. **Email not sending**: Ensure your SES email address is verified and not in the SES sandbox
2. **reCAPTCHA verification failing**: Verify the secret key is correct
3. **Lambda permissions issues**: Ensure the Lambda role has the `ses:SendEmail` permission

## Contact Form Integration

To call this Lambda function from your Next.js application, use the AWS SDK:

```javascript
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

// UPDATED: Use environment variable from CDK infrastructure
const lambdaClient = new LambdaClient({ region: process.env.AWS_REGION || "us-east-1" });

async function sendContactForm(formData) {
  const command = new InvokeCommand({
    // UPDATED: Get Lambda ARN from environment variable set by CDK
    FunctionName: process.env.LAMBDA_FUNCTION_ARN || "portfolio-contact-form-handler",
    Payload: JSON.stringify(formData)
  });
  
  const response = await lambdaClient.send(command);
  return JSON.parse(new TextDecoder().decode(response.Payload));
}
```