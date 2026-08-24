import CopyButton from "./CopyButton";

export default function CodeBlock({ title, code, showCopy = false }) {
    return (
        <div
            className="
                border
                rounded-lg
                p-4
                flex flex-col
                gap-4
                transition-all duration-200
                hover:border-accent-cyan
            "
        >
            {title && (
                <h3 className="text-lg font-semibold text-text-main">
                    {title}
                </h3>
            )}

            {showCopy && (
                <div className="flex justify-end">
                    <CopyButton text={code} />
                </div>
            )}

            <pre
                className="
                    text-sm
                    text-text-secondary
                    whitespace-pre-wrap
                    bg-bg-panel
                    p-3
                    rounded-md
                    border
                    overflow-auto
                "
            >
                {code}
            </pre>
        </div>
    );
}
