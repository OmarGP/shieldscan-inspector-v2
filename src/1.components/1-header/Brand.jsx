import logo from "../../assets/Logo-SSI.png"

export default function Brand() {
    return (
        <div
            className="
                flex
                items-center
                gap-3
            "
        >
            <img 
                src={logo}
                alt="Logo ShieldScan Inspector"
                className="
                    h-16
                    w-16
                    object-contain
                    shrink-0
                "
            />

            <div className="leading-tight">
                <h1
                    className="
                        text-xl
                        font-bold
                        text-text-main
                    "
                >
                    <p className="notranslate">ShieldScan Inspector</p>
                </h1>

                <p
                    className="
                        text-sm
                        text-text-secondary
                    "
                >
                    Audita · Protege · Refuerza.
                </p>
            </div>
        </div>
    )
}
