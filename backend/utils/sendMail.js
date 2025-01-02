import transporter from "../config/emailConfig.js";
import { verifyEmailTemplate, emailVerifiedSuccessfully, passwordResetTemplate } from "../templates/emailTemplates.js";

const sendMail = async ({ to, subject, html }) => {
    try {
        const response = await transporter.sendMail({
            from: `"Authify" <${process.env.EMAIL_SENDER}>`,
            to,
            subject,
            html,
        });
        console.log("Mail sent successfully", response);
    } catch (error) {
        console.error("Error sending email", error);
    }
};

export const sendVerificationEmail = async (email, url) => {
    const html = verifyEmailTemplate.replaceAll('{{verification_link}}', url);
    await sendMail({ to: email, subject: 'Verify your email', html });
};

export const sendVerifiedSuccessMail = async (email) => {
    const html = emailVerifiedSuccessfully;
    await sendMail({ to: email, subject: 'Email verified', html });
};

export const sendResetPasswordMail = async (email, url) => {
    const html = passwordResetTemplate.replaceAll('{{RESET_URL}}', url);
    await sendMail({ to: email, subject: 'Reset password', html });
};
