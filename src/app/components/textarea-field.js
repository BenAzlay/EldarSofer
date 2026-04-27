import { useId } from "react";

export default ({
    value,
    onChange = () => { },
    label = "",
    placeholder = "",
    maxLength = 2000,
    ...props
}) => {
    const id = useId();

    return (
        <div className={props.className}>
            <label htmlFor={id} className="block text-sm font-medium mb-1.5">
                {label}{" "}
                <span className="text-xs px-1.5 py-0.5 bg-white/20 rounded-md font-normal text-white/70">{value.length}/{maxLength}</span>
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                rows={5}
                maxLength={maxLength}
                className="bg-white/10 border border-white/25 rounded-xl text-white placeholder:text-white/40 w-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/50 transition-all resize-none"
                placeholder={placeholder}
            />
        </div>
    );
}
