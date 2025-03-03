#!/bin/bash
# Script to test the Lambda function without reCAPTCHA verification

echo "Creating temporary function version..."

# Create a temporary environment variable configuration that disables reCAPTCHA
aws lambda update-function-configuration \
  --function-name portfolio-contact-form-handler \
  --environment "Variables={SKIP_RECAPTCHA=true,AWS_SES_EMAIL_FROM=$(aws lambda get-function-configuration --function-name portfolio-contact-form-handler --query 'Environment.Variables.AWS_SES_EMAIL_FROM' --output text),AWS_SES_EMAIL_TO=$(aws lambda get-function-configuration --function-name portfolio-contact-form-handler --query 'Environment.Variables.AWS_SES_EMAIL_TO' --output text),RECAPTCHA_SECRET_KEY=$(aws lambda get-function-configuration --function-name portfolio-contact-form-handler --query 'Environment.Variables.RECAPTCHA_SECRET_KEY' --output text)}"

# Wait for update to complete
echo "Waiting for function update to complete..."
sleep 5

# Invoke the Lambda function with the test event
echo "Invoking Lambda function..."
aws lambda invoke \
  --function-name portfolio-contact-form-handler \
  --payload file://test-event.json \
  --cli-binary-format raw-in-base64-out \
  response.json

# Display the response
echo "Response from Lambda:"
cat response.json

# Restore the original configuration (remove SKIP_RECAPTCHA)
echo "Restoring original configuration..."
aws lambda update-function-configuration \
  --function-name portfolio-contact-form-handler \
  --environment "Variables={AWS_SES_EMAIL_FROM=$(aws lambda get-function-configuration --function-name portfolio-contact-form-handler --query 'Environment.Variables.AWS_SES_EMAIL_FROM' --output text),AWS_SES_EMAIL_TO=$(aws lambda get-function-configuration --function-name portfolio-contact-form-handler --query 'Environment.Variables.AWS_SES_EMAIL_TO' --output text),RECAPTCHA_SECRET_KEY=$(aws lambda get-function-configuration --function-name portfolio-contact-form-handler --query 'Environment.Variables.RECAPTCHA_SECRET_KEY' --output text)}"

echo "Test complete!"