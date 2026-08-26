import Brand from "./Brand";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header
            className="
                w-full
                px-6 py-4
                bg-bg-panel
                text-text-main
                border-b
                flex justify-between items-center
                transition-all duration-300
            "
        >
            <Brand />
            <ThemeToggle />
        </header>
    );
}
