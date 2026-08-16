export default function MetricsOverview({ url, totalHeaders }) {
    return (
        <div
            className="
                w-full
                max-w-125
                lg:max-w-200
                bg-[--bg-card]
                border border-[--border-soft]
                p-4 rounded-lg
                text-[--text-main]
                flex flex-col gap-3
            "
        >
            <h3 className="text-lg font-semibold">Resultado</h3>

            <div className="flex flex-col gap-1">
                <p>
                    <strong>URL de web:</strong>{" "}
                    {url || "No se ha analizado ninguna URL"}
                </p>

                <p>
                    <strong>Cabeceras analizadas:</strong>{" "}
                    {totalHeaders || 0}
                </p>
            </div>
        </div>
    );
}
