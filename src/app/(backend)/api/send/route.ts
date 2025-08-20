import { Resend } from 'resend';
import { NextRequest } from 'next/server';
import { EmailTemplate } from '@/components/email-templates/email-template';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

const sender = process.env.RESEND_SENDER_EMAIL;
// Acepta ambas variantes por compatibilidad: RECIEVER (repo) y RECEIVER (correcto)
const receiver = process.env.RESEND_RECIEVER_EMAIL || process.env.RESEND_RECEIVER_EMAIL;
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Website';

export async function POST(request: NextRequest) {
  try {
    if (!resendApiKey) {
      console.error('Missing RESEND_API_KEY');
      return Response.json({ error: 'Server misconfiguration: RESEND_API_KEY is missing' }, { status: 500 });
    }
    if (!sender) {
      console.error('Missing RESEND_SENDER_EMAIL');
      return Response.json({ error: 'Server misconfiguration: RESEND_SENDER_EMAIL is missing' }, { status: 500 });
    }
    if (!receiver) {
      console.error('Missing RESEND_RECEIVER_EMAIL/RESEND_RECIEVER_EMAIL');
      return Response.json({ error: 'Server misconfiguration: RESEND_RECEIVER_EMAIL is missing' }, { status: 500 });
    }

    const formData = await request.json();

    const { error } = await resend.emails.send({
      from: `${siteName} <${sender}>`,
      to: [receiver],
      subject: 'New Form Submission',
      react: EmailTemplate({ formData }),
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Unhandled error in /api/send:', error);
    return Response.json({ error: (error as Error)?.message || 'Unexpected error' }, { status: 500 });
  }
}