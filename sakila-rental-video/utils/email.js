import nodemailer from "nodemailer";
import 'dotenv/config';
export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER, // e.g. your Gmail address
        pass: process.env.SMTP_PASS, // app password
    },
});
export const sendVerificationEmail = async (email, token) => {
    const verifyUrl = `${process.env.APP_URL}/auth/verify-email`;
    const message = {
        from: `"Sakila Rental Video" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Verify your account",
        html: `
      <h2>Welcome to Sakila Rental Video!</h2>
      <p>Please click the 'Confirm' button below to verify your email address:</p>
      <form method="POST" action="${verifyUrl}" target="_blank">
        <input type="hidden" name="token" value="${token}">
        <button style="background-color: green;color: wheat" type="submit">Confirm</button>
      </form>
    `,
    };
    console.log(message);
    //await transporter.sendMail(message);
};
