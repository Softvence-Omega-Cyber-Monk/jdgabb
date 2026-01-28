import nodemailer from "nodemailer";
import AppError from "../utils/AppError";
import { envVers } from "./env";

const transport = nodemailer.createTransport({
    secure: true,
    host: envVers.NODEMAILER.SMTP_HOST,
    port: 465,
    auth: {
        user: envVers.NODEMAILER.SMTP_USER,
        pass: envVers.NODEMAILER.SMTP_PASS,
    }
});

interface SendEmailOptions {
    to: string;
    subject: string;
    text: string;
}

export const sendEmail = async ({ to, subject, text }: SendEmailOptions) => {
    try {
        const info = await transport.sendMail({
            from: envVers.NODEMAILER.SMTP_FORM,
            to,
            subject,
            text,
        });

        console.log(`✅ Email sent to ${to} : ${info.messageId}`);
    } catch (error) {
        console.error("❌ Email Error:", error);
        throw new AppError(400, "Email send failed.");
    }
};
