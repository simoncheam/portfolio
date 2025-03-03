#!/bin/bash
# Script to initially deploy the Lambda function
set -e  # Exit on any error

# Ensure AWS CLI is configured
echo "Checking AWS CLI configuration..."
aws sts get-caller-identity

# Install dependencies
echo "Installing dependencies..."
npm install

# Create zip file for Lambda deployment
echo "Creating deployment package..."
zip -r lambda.zip . -x "*.git*" "deploy.sh" "trust-policy.json"

# Create or get IAM role
ROLE_NAME="portfolio-lambda-execution-role"
echo "Checking for IAM role..."
ROLE_ARN=$(aws iam get-role --role-name $ROLE_NAME --query 'Role.Arn' --output text 2>/dev/null) || {
  echo "Creating IAM role for Lambda..."
  
  # Create policy document for trust relationship
  echo '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }]
  }' > trust-policy.json
  
  # Create role
  ROLE_ARN=$(aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document file://trust-policy.json \
    --query 'Role.Arn' --output text)
    
  # Attach SES permissions
  aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn arn:aws:iam::aws:policy/AmazonSESFullAccess
    
  # Attach basic Lambda execution permissions (for logging)
  aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
    
  # Wait for role to propagate
  echo "Waiting for role to propagate..."
  sleep 10
}

# Get environment variable values
read -p "Enter the SES sender email: " SES_SENDER
read -p "Enter the SES recipient email: " SES_RECIPIENT
read -p "Enter the reCAPTCHA secret key (or press Enter to skip): " RECAPTCHA_KEY

# Create the Lambda function
echo "Creating Lambda function..."
aws lambda create-function \
  --function-name portfolio-contact-form-handler \
  --runtime nodejs18.x \
  --handler index.handler \
  --role "$ROLE_ARN" \
  --timeout 10 \
  --memory-size 256 \
  --zip-file fileb://lambda.zip

# Set environment variables
echo "Setting environment variables..."
aws lambda update-function-configuration \
  --function-name portfolio-contact-form-handler \
  --environment "Variables={AWS_SES_EMAIL_FROM=$SES_SENDER,AWS_SES_EMAIL_TO=$SES_RECIPIENT,RECAPTCHA_SECRET_KEY=$RECAPTCHA_KEY}"

# Grant Lambda permission to use SES
echo "Setting up IAM permissions for SES..."
aws lambda add-permission \
  --function-name portfolio-contact-form-handler \
  --statement-id ses-send-email-permission \
  --action lambda:InvokeFunction \
  --principal ses.amazonaws.com

# Get the Lambda ARN for future reference
LAMBDA_ARN=$(aws lambda get-function --function-name portfolio-contact-form-handler --query 'Configuration.FunctionArn' --output text)
echo "Deployment complete!"
echo "Your Lambda function ARN is: $LAMBDA_ARN"
echo "Use this ARN in your Amplify environment variables as LAMBDA_FUNCTION_ARN"