import Image from "next/image";
import { useState } from "react";

export default ({
    title = "Story title",
    summary = "Story summary",
    pdfPath = "",
    coverImage,
}) => {
    const [showBack, setShowBack] = useState(false);
    return (
        <div className="book-container" onClick={() => setShowBack(!showBack)}>
            <div className="book" style={{ transform: showBack ? "rotateY(-180deg)" : "rotateY(0deg)" }}>
                <div className="book-front">
                    <div className="stitches">
                        <Image className="book-img" src={coverImage} alt="master_guzi_cover" />
                        <div>
                            <h1 className="book-title">{title}</h1>
                            <h2 className="book-author">Eldar Sofer</h2>
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