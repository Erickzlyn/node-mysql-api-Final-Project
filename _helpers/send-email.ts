import { Resend } from 'resend';
import config from '../config.json';

const resendApiKey = process.env.RESEND_API_KEY || config.resendApiKey;
const resend = new Resend(resendApiKey);

export async function sendEmail({ to, subject, html, from = (process.env.EMAIL_FROM || config.emailFrom) }: any) {
    await resend.emails.send({ from, to, subject, html });
}