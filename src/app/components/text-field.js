import { useId } from "react";

export default ({
    value,
    onChange = () => { },
    type = "text",
    label = "",
    placeholder = "",
    error = false,
    maxLength = 80,
    ...props
}) => {
    const id = useId();

    return (
        <div className={props.className}>
            <label htmlFor={id} className="block text-sm font-medium mb-1.5">{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className={`bg-white/10 border rounded-xl text-white placeholder:text-white/40 w-full px-4 py-2.5 focus:outline-none focus:ring-2 transition-all ${
                    error
                        ? "border-red-400/70 focus:ring-red-400/30 focus:border-red-400"
                        : "border-white/25 focus:ring-white/20 focus:border-white/50"
                }`}
                placeholder={placeholder}
            />
        </div>
    );
}
