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

    return (
        <div className={props.className}>
            <label for="price" className="block text-sm font-medium leading-6 mb-1">{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                className={`shadow-sm rounded-lg break-normal text-gray-900 m-0 w-full focus:ring-2 ${error ? "border-red-600 focus:ring-red-200" : "border-gray-300 focus:ring-indigo-200"}`}
                placeholder={placeholder}
            />
        </div>
    )
}