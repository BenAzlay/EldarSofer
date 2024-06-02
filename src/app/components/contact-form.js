import { useMemo, useState } from "react";
import TextField from "./text-field";
import TextareaField from "./textarea-field";

export default ({

}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [messageSent, setMessageSent] = useState(false);
    const [sendloading, setSendLoading] = useState(false);

    const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailIsValid = useMemo(() => email.match(EMAIL_REGEX), [email, EMAIL_REGEX]);

    const onChangeName = ({ target: { value } }) => {
        setName(value);
    };

    const onChangeEmail = ({ target: { value } }) => {
        setEmail(value);
    };

    const onChangeSubject = ({ target: { value } }) => {
        setSubject(value);
    };

    const onChangeContent = ({ target: { value } }) => {
        setContent(value);
    };

    const onClickSend = async () => {
        setSendLoading(true);
        const sendPayload = await fetch("/api/send", {
            method: "POST",
            body: JSON.stringify({
                content: content,
                name: name,
                fromEmail: email,
                subject: subject,
            }),
        });
        console.log("sendPayload:", sendPayload)
        if (sendPayload.status === 200) {
            console.log("Message successfully sent")
            setMessageSent(true);
            setName("");
            setEmail("");
            setSubject("");
            setContent("");
        } else {
            console.log("Message failed to be sent")    
        }
        setSendLoading(false);
    };

    return (
        <div className="max-w-screen-lg grid gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField value={name} onChange={onChangeName} maxLength={50} label="Your name" placeholder="George Orwell" />
                <TextField value={email} onChange={onChangeEmail} error={email.length > 0 && !emailIsValid} type="email" label="Your email" placeholder="orwell@example.com" />
            </div>
            <TextField value={subject} onChange={onChangeSubject} type="text" label="Subject" placeholder="I think a Yantra would write better stories than you" />
            <TextareaField
                value={content}
                onChange={onChangeContent}
                type="text"
                label="Your message"
                placeholder="Dear Eldar Sofer..."
            />
            <button
                onClick={onClickSend}
                disabled={
                    !emailIsValid ||
                    !name.length ||
                    !content.length ||
                    messageSent ||
                    sendloading
                }
                className="bg-blue-500 p-2 rounded-lg font-bold disabled:bg-gray-200"
            >
                {messageSent ? "Message sent" : sendloading ? "Sending message..." : "Send message"}
            </button>
        </div>
    )
}