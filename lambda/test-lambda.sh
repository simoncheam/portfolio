#!/bin/bash
# Script to test the Lambda function from CLI

echo "Testing Lambda function..."

# Invoke the Lambda function with the test event
aws lambda invoke \
  --function-name portfolio-contact-form-handler \
  --payload file://test-event.json \
  --cli-binary-format raw-in-base64-out \
  response.json

# Check if the invocation was successful
if [ $? -eq 0 ]; then
  echo "Lambda invocation successful! Checking the response..."
  
  # Display the response
  echo "Response from Lambda:"
  cat response.json
  
  # Check for CloudWatch logs
  echo -e "\nChecking CloudWatch logs..."
  LOGGROUP="/aws/lambda/portfolio-contact-form-handler"
  
  # Get the latest log stream
  LOGSTREAM=$(aws logs describe-log-streams \
    --log-group-name $LOGGROUP \
    --order-by LastEventTime \
    --descending \
    --limit 1 \
    --query 'logStreams[0].logStreamName' \
    --output text)
  
  echo "Latest log stream: $LOGSTREAM"
  
  # Get the last 10 log events
  echo -e "\nRecent log events:"
  aws logs get-log-events \
    --log-group-name $LOGGROUP \
    --log-stream-name $LOGSTREAM \
    --limit 10 \
    --query 'events[*].message' \
    --output text
else
  echo "Error invoking Lambda function. Check your configuration."
fi

echo -e "\nTest complete!"