import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize SES client
const sesClient = new SESClient({ region: "us-east-1" });

// reCAPTCHA verification function
async function verifyRecaptcha(token) {
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

// Process form submission (direct Lambda invocation)
export const handler = async (event) => {
  try {
    console.log("✅ Received event:", JSON.stringify(event, null, 2));

    // For direct Lambda invocation, extract form data directly from the event
    const { name, email, message, recaptchaToken } = event;

    // Validate required fields
    if (!name || !email || !message) {
      throw new Error('Missing required fields');
    }

    // Verify reCAPTCHA if token is provided
    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        throw new Error('reCAPTCHA verification failed');
      }
    }

    // Create email parameters
    const emailParams = {
      Source: process.env.AWS_SES_EMAIL_FROM,
      Destination: { 
        ToAddresses: [process.env.AWS_SES_EMAIL_TO] 
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
      body: { 
        message: "✅ Email sent successfully!" 
      }
    };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    
    return {
      statusCode: 500,
      body: { 
        message: "❌ Failed to send email", 
        error: error.message
      }
    };
  }
};