import { useMemo, useState } from "react";
import { Send, Loader, CheckCircle } from "react-feather";
import TextField from "./text-field";
import TextareaField from "./textarea-field";

export default () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailIsValid = useMemo(() => email.match(EMAIL_REGEX), [email, EMAIL_REGEX]);

    const onChangeName = ({ target: { value } }) => setName(value);
    const onChangeEmail = ({ target: { value } }) => setEmail(value);
    const onChangeSubject = ({ target: { value } }) => setSubject(value);
    const onChangeContent = ({ target: { value } }) => setContent(value);

    const onClickSend = async () => {
        setSendLoading(true);
        const sendPayload = await fetch("/api/send", {
            method: "POST",
            body: JSON.stringify({
                content,
                name,
                fromEmail: email,
                subject,
            }),
        });
        if (sendPayload.status === 200) {
            setMessageSent(true);
            setName("");
            setEmail("");
            setSubject("");
            setContent("");
        }
        setSendLoading(false);
    };

    if (messageSent) {
        return (
            <div className="max-w-screen-lg flex flex-col items-center justify-center py-12 gap-4">
                <CheckCircle size={52} className="text-green-400" />
                <p className="text-xl font-semibold">Message sent!</p>
                <p className="text-white/70 text-center text-sm">Thank you for reaching out. I'll get back to you soon.</p>
                <button
                    onClick={() => setMessageSent(false)}
                    className="mt-2 text-sm bg-transparent text-white/60 hover:text-white underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-screen-lg grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField value={name} onChange={onChangeName} maxLength={50} label="Your name" placeholder="George Orwell" />
                <TextField value={email} onChange={onChangeEmail} error={email.length > 0 && !emailIsValid} type="email" label="Your email" placeholder="orwell@example.com" />
            </div>
            <TextField value={subject} onChange={onChangeSubject} type="text" label="Subject" placeholder="Healing the world" />
            <TextareaField
                value={content}
                onChange={onChangeContent}
                label="Your message"
                placeholder="Dear Eldar Sofer..."
            />
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
