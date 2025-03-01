import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Initialize SES client
const sesClient = new SESClient({ region: "us-east-1" });

// Define email addresses
const SES_SENDER_EMAIL = "your-verified-email@example.com"; // Replace with your verified SES email
const SES_RECIPIENT_EMAIL = "your-email@example.com"; // Replace with your email

// reCAPTCHA verification function
async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY;
    if (!RECAPTCHA_SECRET) {
      console.error('Missing reCAPTCHA secret key');
      return false;
    }

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET}&response=${token}`
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// Process form submission
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Configure CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // Replace with specific domain in production
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'OPTIONS,POST'
  };

  // Handle OPTIONS request (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    console.log("✅ Received event:", JSON.stringify(event, null, 2));

    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing request body' })
      };
    }

    const formData = JSON.parse(event.body);
    const { name, email, message, recaptchaToken } = formData;

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    // Verify reCAPTCHA if token is provided
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ message: 'reCAPTCHA verification failed' })
        };
      }
    }

    // Create email parameters
    const emailParams = {
      Source: SES_SENDER_EMAIL,
      Destination: { 
        ToAddresses: [SES_RECIPIENT_EMAIL] 
      },
      Message: {
        Subject: { 
          Data: `New Contact Form Submission from ${name}` 
        },
        Body: {
          Text: { 
            Data: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}` 
          }
        }
      }
    };

    console.log("📨 Sending email with params:", JSON.stringify(emailParams, null, 2));

    const sendResult = await sesClient.send(new SendEmailCommand(emailParams));
    console.log("✅ Email sent successfully:", sendResult);

    // Return success
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "✅ Email sent successfully!"
      })
    };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: "❌ Failed to send email",
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};