'use server';

import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";

const logEnvironmentCheck = () => {
  console.log('Environment Variables Check:', {
    AWS_REGION: process.env.AWS_REGION ? 'Set' : 'Missing',
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ? 'Set (First 4 chars): ' + process.env.AWS_ACCESS_KEY_ID.substring(0, 4) : 'Missing',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ? 'Set (Length): ' + process.env.AWS_SECRET_ACCESS_KEY.length : 'Missing',
    LAMBDA_FUNCTION_ARN: process.env.LAMBDA_FUNCTION_ARN ? 'Set (Last 8 chars): ' + process.env.LAMBDA_FUNCTION_ARN.slice(-8) : 'Missing',
  });
};

interface LambdaResponse {
  Payload: Uint8Array;
  FunctionError?: string;
  StatusCode: number;
  LogResult?: string;
}

interface ParsedResponse {
  statusCode: number;
  body: string;
  message?: string;
  errorMessage?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

// Improved error logging function
const logError = (error: unknown, context: string) => {
  console.error(`Error in ${context}:`, {
    name: error instanceof Error ? error.name : 'Unknown',
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : 'No stack trace',
    context
  });
};

// Verify environment variables are set
// 'AWS_ACCESS_KEY_ID',
// 'AWS_SECRET_ACCESS_KEY',
const verifyEnvironment = () => {
  const requiredVars = [
    'AWS_REGION',
    'LAMBDA_FUNCTION_ARN'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};



const lambdaClient = new LambdaClient({
  region: "us-east-1",
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  // },
  maxAttempts: 3,
});

const LAMBDA_TIMEOUT = 15000;


export async function sendMessage(formData: ContactFormData, recaptchaToken: string): Promise<{ success: boolean; message: string }> {
  try {
    // logEnvironmentCheck();
    // verifyEnvironment();

    console.log('Starting sendMessage with form data:', {
      name: formData.name,
      email: formData.email,
      messageLength: formData.message.length,
      hasRecaptchaToken: !!recaptchaToken
    });

    const payload = {
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        recaptchaToken
      })
    };

    const lambdaCommand = new InvokeCommand({
      FunctionName: process.env.LAMBDA_FUNCTION_ARN!,
      Payload: JSON.stringify(payload),
      InvocationType: 'RequestResponse',
      LogType: 'Tail'
    });

    console.log('Invoking Lambda with FunctionName:', process.env.LAMBDA_FUNCTION_ARN);

    // Race between Lambda invocation and timeout
    const response = await Promise.race([
      lambdaClient.send(lambdaCommand) as Promise<LambdaResponse>,
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), LAMBDA_TIMEOUT);
      })
    ]);

    console.log('Lambda response received:', {
      statusCode: response.StatusCode,
      hasPayload: !!response.Payload,
      functionError: response.FunctionError,
      hasLogResult: !!response.LogResult
    });

    if (!response.Payload) {
      throw new Error("No payload received from Lambda");
    }

    if (response.LogResult) {
      const decodedLogs = Buffer.from(response.LogResult, 'base64').toString();
      console.log('Lambda execution logs:', decodedLogs);
    }


    // Parse response
    const responseText = new TextDecoder().decode(response.Payload);

    console.log('Decoded response payload:', responseText);

    const responsePayload = JSON.parse(responseText) as ParsedResponse;

    // Enhanced error handling
    if (response.FunctionError) {
      console.error('Lambda function error:', {
        functionError: response.FunctionError,
        errorMessage: responsePayload.errorMessage
      });


      throw new Error(responsePayload.errorMessage || 'Lambda execution failed');
    }

    return {
      success: true,
      message: responsePayload.message || "Message sent successfully!"
    };

  } catch (error) {
    logError(error, 'sendMessage');
    if (error instanceof Error) {
      if (error.message === 'Request timed out') {
        return {
          success: false,
          message: "Request took too long. Please try again in a moment."
        } as const;
      }

      // Handle specific error types
      if (error.message.includes('Missing required environment variables')) {
        return {
          success: false,
          message: "Server configuration error. Please contact support."
        };
      }

      if (error.message.includes('credential')) {
        return {
          success: false,
          message: "Authentication error. Please contact support."
        };
      }



      return {
        success: false,
        message: `Error: ${error.message}`
      };
    }

    return { success: false, message: "Failed to send message" };
  }
}
