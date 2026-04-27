import { useEffect, useMemo, useState } from "react";
import { Send, Loader, CheckCircle } from "react-feather";
import TextField from "./text-field";
import TextareaField from "./textarea-field";

const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes
const LS_KEY = "contactFormLastSent";

const formatCooldown = (ms) => {
    const total = Math.ceil(ms / 1000);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
};

export default () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);
    const [sendError, setSendError] = useState("");
    const [cooldownRemaining, setCooldownRemaining] = useState(0);

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailIsValid = useMemo(() => email.match(EMAIL_REGEX), [email, EMAIL_REGEX]);

    useEffect(() => {
        const lastSent = localStorage.getItem(LS_KEY);
        if (lastSent) {
            const remaining = Math.max(0, COOLDOWN_MS - (Date.now() - parseInt(lastSent, 10)));
            setCooldownRemaining(remaining);
        }
    }, []);

    // Tick down cooldown one second at a time
    useEffect(() => {
        if (cooldownRemaining <= 0) return;
        const timer = setTimeout(() => setCooldownRemaining(prev => Math.max(0, prev - 1000)), 1000);
        return () => clearTimeout(timer);
    }, [cooldownRemaining]);

    const onClickSend = async () => {
        setSendLoading(true);
        setSendError("");
        const res = await fetch("/api/send", {
            method: "POST",
            body: JSON.stringify({ content, name, fromEmail: email, subject, _hp: honeypot }),
        });
        if (res.status === 200) {
            localStorage.setItem(LS_KEY, Date.now().toString());
            setCooldownRemaining(COOLDOWN_MS);
            setMessageSent(true);
            setName("");
            setEmail("");
            setSubject("");
            setContent("");
        } else if (res.status === 429) {
            const data = await res.json();
            const minutes = Math.ceil((data.retryAfterMs || COOLDOWN_MS) / 60000);
            setSendError(`Too many messages sent. Please wait ${minutes} minute(s) before trying again.`);
        } else {
            setSendError("Failed to send message. Please try again.");
        }
        setSendLoading(false);
    };

    if (messageSent) {
        return (
            <div className="max-w-screen-lg flex flex-col items-center justify-center py-12 gap-4">
                <CheckCircle size={52} className="text-green-400" />
                <p className="text-xl font-semibold">Message sent!</p>
                <p className="text-white/70 text-center text-sm">Thank you for reaching out. I'll get back to you soon.</p>
                {cooldownRemaining > 0 ? (
                    <p className="mt-2 text-sm text-white/50">
                        Send another in {formatCooldown(cooldownRemaining)}
                    </p>
                ) : (
                    <button
                        onClick={() => setMessageSent(false)}
                        className="mt-2 text-sm bg-transparent text-white/60 hover:text-white underline"
                    >
                        Send another message
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-screen-lg grid gap-4">
            {/* Honeypot — invisible to users, traps bots */}
            <div aria-hidden="true" style={{ position: "absolute", opacity: 0, height: 0, width: 0, overflow: "hidden", pointerEvents: "none" }}>
                <input type="text" name="website" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField value={name} onChange={e => setName(e.target.value)} maxLength={50} label="Your name" placeholder="George Orwell" />
                <TextField value={email} onChange={e => setEmail(e.target.value)} error={email.length > 0 && !emailIsValid} type="email" label="Your email" placeholder="orwell@example.com" />
            </div>
            <TextField value={subject} onChange={e => setSubject(e.target.value)} type="text" label="Subject" placeholder="Healing the world" />
            <TextareaField value={content} onChange={e => setContent(e.target.value)} label="Your message" placeholder="Dear Eldar Sofer..." />
            {sendError && (
                <p className="text-red-300 text-sm">{sendError}</p>
            )}
            <button
                onClick={onClickSend}
                disabled={!emailIsValid || !name.length || !content.length || sendLoading}
                className="flex items-center justify-center gap-2 bg-white text-[#0021de] font-semibold rounded-xl px-6 py-3 hover:bg-white/90 active:scale-[0.98] transition-all disabled:bg-white/30 disabled:text-white/60 disabled:cursor-not-allowed"
            >
                {sendLoading ? (
                    <>
                        <Loader size={16} className="animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <Send size={16} />
                        Send message
                    </>
                )}
            </button>
        </div>
    );
}
