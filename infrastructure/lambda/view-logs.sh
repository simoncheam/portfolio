#!/bin/bash
# Script to view CloudWatch logs for the Lambda function

LOGGROUP="/aws/lambda/portfolio-contact-form-handler"

# Check if log group exists
if ! aws logs describe-log-groups --log-group-name-prefix $LOGGROUP --query 'logGroups[0].logGroupName' --output text &>/dev/null; then
  echo "Log group $LOGGROUP does not exist yet. Run your Lambda function first."
  exit 1
fi

# Get latest log stream
echo "Finding the latest log stream..."
LOGSTREAM=$(aws logs describe-log-streams \
  --log-group-name $LOGGROUP \
  --order-by LastEventTime \
  --descending \
  --limit 1 \
  --query 'logStreams[0].logStreamName' \
  --output text)

if [[ "$LOGSTREAM" == "None" || -z "$LOGSTREAM" ]]; then
  echo "No log streams found. Run your Lambda function first."
  exit 1
fi

echo "Viewing logs from stream: $LOGSTREAM"

# Get the log events with color highlighting
aws logs get-log-events \
  --log-group-name $LOGGROUP \
  --log-stream-name "$LOGSTREAM" \
  --limit 100 | \
  jq -r '.events[].message' | \
  grep --color=auto -E "^|ERROR|error|failed|Failed|FAILED"

echo "End of logs"