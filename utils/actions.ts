'use server';

import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";



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


const lambdaClient = new LambdaClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  maxAttempts: 3,
});

const LAMBDA_TIMEOUT = 15000;


export async function sendMessage(formData: ContactFormData, recaptchaToken: string): Promise<{ success: boolean; message: string }> {
  try {
    const payload = {
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        recaptchaToken
      })
    };

    const lambdaCommand = new InvokeCommand({
      FunctionName: "sendEmailLambda",
      Payload: JSON.stringify(payload),
      InvocationType: 'RequestResponse',
      LogType: 'Tail'
    });

    // Race between Lambda invocation and timeout
    const response = await Promise.race([
      lambdaClient.send(lambdaCommand) as Promise<LambdaResponse>,
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), LAMBDA_TIMEOUT);
      })
    ]);

    if (!response.Payload) {
      throw new Error("No payload received from Lambda");
    }

    // Parse response
    const responseText = new TextDecoder().decode(response.Payload);

    const responsePayload = JSON.parse(responseText) as ParsedResponse;

    // Enhanced error handling
    if (response.FunctionError) {
      throw new Error(responsePayload.errorMessage || 'Lambda execution failed');
    }

    return {
      success: true,
      message: responsePayload.message || "Message sent successfully!"
    };

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Request timed out') {
        return {
          success: false,
          message: "Request took too long. Please try again in a moment."
        } as const;
      }
    }

    return { success: false, message: "Failed to send message" };
  }
}
