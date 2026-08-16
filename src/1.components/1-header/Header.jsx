import Brand from "./Brand";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header
            className="
                w-full
                px-6 py-4
                bg-[--bg-panel]          /* Fondo del header según el modo */
                text-[--text-main]
                border-b border-[--border-soft]
                flex justify-between items-center
                transition-all duration-300     /* Fade suave entre modos */
            "
        >
            <Brand />
            <ThemeToggle />
        </header>
    );
}
