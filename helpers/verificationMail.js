import sgMail from "@sendgrid/mail";
import { config } from "dotenv";
config();

export const verificationMail = async (email, verificationToken) => {
  const verificationLink = `http://localhost:3000/users/verify/${verificationToken}`;

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: "sawczynska.e@gmail.com",
    subject: "Email Verification",
    text: `Click the following link to verify your email: ${verificationLink}`,
    html: `<strong>Click the following link to verify your email:<a href="${verificationLink}">${verificationLink}</a></strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};