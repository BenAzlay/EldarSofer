import { EmailTemplate } from '../../components/email-template';
import { Resend } from 'resend';

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 3;
const ipSubmissions = new Map();

function checkRateLimit(ip) {
    const now = Date.now();
    const timestamps = (ipSubmissions.get(ip) || []).filter(t => now - t < WINDOW_MS);
    if (timestamps.length >= MAX_PER_WINDOW) {
        return { allowed: false, retryAfterMs: timestamps[0] + WINDOW_MS - now };
    }
    timestamps.push(now);
    ipSubmissions.set(ip, timestamps);
    return { allowed: true };
}

export async function POST(req) {
    try {
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
            || req.headers.get('x-real-ip')
            || 'unknown';

        const { allowed, retryAfterMs } = checkRateLimit(ip);
        if (!allowed) {
            return Response.json({ error: 'Too many requests', retryAfterMs }, { status: 429 });
        }

        const body = await req.json();
        const { content, name, subject, fromEmail, _hp } = body;

        // Honeypot: silently succeed so bots think they succeeded
        if (_hp) {
            return Response.json({});
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        const toEmail = process.env.DESTINATION_EMAIL.toString();
        const { data, error } = await resend.emails.send({
            from: `${name} <${fromEmail}>`,
            to: [toEmail],
            subject,
            react: EmailTemplate({ content, fromEmail, name }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        console.error("error:", error);
        return Response.json({ error }, { status: 500 });
    }
}
