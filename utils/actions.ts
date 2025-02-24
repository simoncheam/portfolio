'use server';

import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";

// const getAuthUser = async () => {
//   const user = await currentUser();
//   if (!user) throw new Error('You must be logged in to access this route');

//   if (!user.privateMetadata.hasProfile) redirect('/profile/create');
//   return user;
// };

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
  console.log("🚀 Directly invoking Lambda...");



  try {

    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), LAMBDA_TIMEOUT);
    });

    const payload = {
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        recaptchaToken
      })
    };

    // console.log("📦 Payload being sent:", payload);

    console.log("🚀 Directly invoking Lambda...");

    const lambdaCommand = new InvokeCommand({
      FunctionName: "sendEmailLambda",
      Payload: JSON.stringify(payload),
      InvocationType: 'RequestResponse',
      LogType: 'Tail'
    });

    // ! This works here
    // const lambdaResponse = await lambdaClient.send(lambdaCommand);
    // console.log("✅ Raw Lambda Response:", lambdaResponse);

    // if (!lambdaResponse.Payload) {
    //   throw new Error("No payload received from Lambda");
    // }

    // // Parse the response properly
    // // TODO: This is not working - error is here
    // const responseText = new TextDecoder().decode(lambdaResponse.Payload);
    // console.log("🔍 Decoded response text:", responseText);

    // const responsePayload = JSON.parse(responseText);
    // console.log("✅ Parsed Lambda Response:", responsePayload);

    // // Handle the response
    // if (lambdaResponse.StatusCode === 200) {
    //   if (responsePayload.statusCode === 200) {
    //     return {
    //       success: true,
    //       message: JSON.parse(responsePayload.body).message || "Email sent successfully!"
    //     };
    //   } else {
    //     const errorBody = JSON.parse(responsePayload.body);
    //     return {
    //       success: false,
    //       message: errorBody.message || "Failed to send message"
    //     };
    //   }
    // }

    // throw new Error("Lambda invocation failed");

    // Race between Lambda invocation and timeout
    const response = await Promise.race([
      lambdaClient.send(lambdaCommand) as Promise<LambdaResponse>,
      timeoutPromise
    ]);

    if (!response.Payload) {
      throw new Error("No payload received from Lambda");
    }

    // Parse response
    const responseText = new TextDecoder().decode(response.Payload);
    console.log("🔍 Decoded response:", responseText);

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
    console.error('Error sending message:', error);
    if (error instanceof Error) {
      if (error.message === 'Request timed out') {
        return {
          success: false,
          message: "Request took too long. Please try again in a moment."
        } as const;
      }
    }

    // return false;
    return { success: false, message: "Failed to send message" };
  }
}
