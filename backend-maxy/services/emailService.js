import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const sendVerificationEmail = async (email, verificationLink) => {
  const params = {
    Source: "no-reply@yourdomain.com", // Must be verified in SES
    Destination: { ToAddresses: [email] },
    Message: {
      Subject: { Data: "Verify your Maxy Email" },
      Body: {
        Html: {
          Data: `
            <h2>Verify Your Email</h2>
            <p>Welcome to Maxy! Please verify your email by clicking the link below:</p>
            <a href="${verificationLink}" style="color:#1E88E5;">Verify Email</a>
            <p>This link will expire in 15 minutes.</p>
          `,
        },
      },
    },
  };

  await sesClient.send(new SendEmailCommand(params));
};
