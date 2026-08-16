// Botón para copiar texto al portapapeles.
// Se usa dentro de CodeBlock.jsx.

import { useState } from "react";

export default function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);

        // Volver al estado normal después de 1.5s
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <button
            onClick={handleCopy}
            className="
                w-20 h-8
                flex items-center justify-center
                text-sm
                px-3 py-1
                rounded-md
                border border-border-soft
                bg-bg-card
                text-[--text-main]
                hover:bg-bg-hover-strong
                hover:text-accent-cyan
                hover:border-accent-cyan
                transition-all duration-200
            "
        >
            {copied ? "Copied!" : "Copy"}
        </button>
    );
}
