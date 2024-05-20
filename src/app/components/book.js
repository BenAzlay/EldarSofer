import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default ({
    title = "Story title",
    summary = "Story summary",
    pdfPath = "",
    coverImage,
}) => {
    const [showBack, setShowBack] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [width, setWidth] = useState(0);

    const handleWindowSizeChange = () => setWidth(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => window.removeEventListener('resize', handleWindowSizeChange);
    }, []);

    const isMobile = useMemo(() => width <= 768, [width]);

    return (
        <div className="book-container" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={() => setShowBack(!showBack)}>
            <div className="book" style={{ transform: showBack ? "rotateY(-180deg)" : (isHovering && !isMobile) ? "rotate3d(0.1, -1, 0, 8deg)" : "rotateY(0deg)" }}>
                <div className="book-front">
                    <div className="stitches">
                        <Image className="book-img" src={coverImage} alt={`${title} cover`} />
                        <div>
                            <h2 className="book-title">{title}</h2>
                            <p className="book-author">Eldar Sofer</p>
                        </div>
                    </div>
                </div>
                <div className="book-back">
                    <div className="stitches">
                        <p className="book-summary">
                            {summary}
                        </p>
                        <div onClick={() => window.open(pdfPath, "_blank")} className="read-button">
                            Read {title}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}