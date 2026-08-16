import logo from "../../assets/Logo-SSI.png"

export default function Brand() {
    return (
        <div
            className="
                flex              /* Activa flexbox para alinear elementos */
                items-center      /* Centra verticalmente el logo y el texto */
                gap-3             /* Espacio horizontal entre logo y texto */
            "
        >
            <img 
                src={logo}
                alt="Logo ShieldScan Inspector"
                className="
                    h-16
                    w-16
                    object-contain /* Mantiene proporción sin recortar */
                    shrink-0       /* Evita que el logo se reduzca en flex */
                "
            />

            <div className="leading-tight">
                <h1
                    className="
                        text-xl            /* Tamaño grande para el título */
                        font-bold          /* Fuente en negrita para destacar */
                        text-[--text-main] /* Color principal */
                    "
                >
                    <p className="notranslate">ShieldScan Inspector</p>
                </h1>

                <p
                    className="
                        text-sm                 /* Texto pequeño */
                        text-[--text-secondary] /* Color secundario */
                    "
                >
                    Audita · Protege · Refuerza.
                </p>
            </div>
        </div>
    )
}
