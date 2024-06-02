import { EmailTemplate } from '../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req) {
    try {
        const body = await req.json();
        // body of our request - to be sent from the Client-side in our form above
        const { content, name, subject, fromEmail } = body;
        const toEmail = process.env.DESTINATION_EMAIL.toString();
        const { data, error } = await resend.emails.send({
            from: `${name} <onboarding@resend.dev>`,
            to: [toEmail],
            subject,
            react: EmailTemplate({ content: content, fromEmail: fromEmail, name: name }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.error("error:", error)
        return Response.json({ error }, { status: 500 });
    }
}
