import { Resend } from 'resend';
import config from '../config.json';

const resend = new Resend((config as any).resendApiKey);

export async function sendEmail({ to, subject, html, from = (config as any).emailFrom }: any) {
    await resend.emails.send({ from, to, subject, html });
}