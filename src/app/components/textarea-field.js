export default ({
    value,
    onChange = () => { },
    type = "text",
    label = "",
    placeholder = "",
    maxLength = 2000,
    ...props
}) => {

    return (
        <div className={props.className}>
            <label for="price" class="block text-sm font-medium leading-6 mb-1">
                {label}{" "}
                <span className="!text-xs p-1 bg-gray-500 rounded-md">{value.length}/{maxLength}</span>
            </label>
            <textarea
                type={type}
                value={value}
                onChange={onChange}
                rows={4}
                maxLength={maxLength}
                class="block max-h-40 shadow-sm border-gray-300 rounded-lg text-gray-900 m-0 w-full focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
                placeholder={placeholder}
            />
        </div>
    )
}