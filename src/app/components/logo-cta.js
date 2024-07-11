import Image from "next/image";

export default ({
    alt = "",
    url = "",
    title = "",
    src,
}) => {
    return <Image onClick={() => window.open(url, "_blank")} className="logo-cta" src={src} alt={alt} title={title} />;
}