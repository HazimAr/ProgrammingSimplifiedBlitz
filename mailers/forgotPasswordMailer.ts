/* TODO - You need to add a mailer integration in `integrations/` and import here.
 *
 * The integration file can be very simple. Instantiate the email client
 * and then export it. That way you can import here and anywhere else
 * and use it straight away.
 */
import previewEmail from "preview-email";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

type ResetPasswordMailer = {
  to: string;
  token: string;
};

export function forgotPasswordMailer({ to, token }: ResetPasswordMailer) {
  // In production, set APP_ORIGIN to your production server origin
  const origin = process.env.NODE_ENV == "production" ? "https://programmingsimplified.org" : process.env.BLITZ_DEV_SERVER_ORIGIN;
  const resetUrl = `${origin}/reset-password?token=${token}`;

  const msg = {
    to,
    from: "help@programmingsimplified.org",
    subject: "Your Password Reset Instructions",
    html: `
      <h1>Reset Your Password</h1>

      <a href="${resetUrl}">
        Click here to set a new password
      </a>
    `,
  };

  return {
    async send() {
      if (process.env.NODE_ENV === "production") {
        sgMail.send(msg).catch((err) => {
          console.error(err);
        });
      } else {
        // Preview email in the browser
        // await previewEmail(msg);
        sgMail.send(msg).catch((err) => {
          console.error(err);
        });
      }
    },
  };
}
