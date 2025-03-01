#!/bin/bash
# Script to initially deploy the Lambda function

# Ensure AWS CLI is configured
echo "Checking AWS CLI configuration..."
aws sts get-caller-identity

# Install dependencies
echo "Installing dependencies..."
npm ci

# Create zip file for Lambda deployment
echo "Creating deployment package..."
zip -r lambda.zip . -x "*.git*" "deploy.sh"

# Create the Lambda function
echo "Creating Lambda function..."
aws lambda create-function \
  --function-name portfolio-contact-form-handler \
  --runtime nodejs18.x \
  --handler index.handler \
  --timeout 10 \
  --memory-size 256 \
  --zip-file fileb://lambda.zip

# Set environment variables (update with your actual values)
echo "Setting environment variables..."
aws lambda update-function-configuration \
  --function-name portfolio-contact-form-handler \
  --environment "Variables={AWS_SES_EMAIL_FROM=your-verified-email@example.com,AWS_SES_EMAIL_TO=your-email@example.com,RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key}"

# Grant Lambda permission to use SES
echo "Setting up IAM permissions for SES..."
aws lambda add-permission \
  --function-name portfolio-contact-form-handler \
  --statement-id ses-send-email-permission \
  --action lambda:InvokeFunction \
  --principal ses.amazonaws.com

echo "Deployment complete! Don't forget to update the environment variables with your actual values."