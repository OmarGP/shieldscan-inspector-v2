// Selector de servidor para generar configuraciones específicas.
// Se usa dentro de CodeGeneratorSidebar.jsx.

export default function ServerSelector({ value, onChange }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm text-[--text-secondary]">
                Select server:
            </label>

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
                    bg-[--bg-card]
                    border border-[--border-soft]
                    text-[--text-main]
                    p-2
                    rounded-md
                    hover:border-[--accent-cyan]
                    transition-all duration-200
                "
            >
                <option value="apache">Apache</option>
                <option value="nginx">Nginx</option>
                <option value="express">Express.js</option>
                <option value="iis">IIS</option>
            </select>
        </div>
    );
}
