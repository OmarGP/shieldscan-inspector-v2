// Layout principal de la aplicación.
// Envuelve todas las páginas y contiene el header, navegación y estructura base.

import Header from "../1-header/Header";

export default function MainLayout({ children }) {
  return (
    <div
        className="
                min-h-screen
                bg-bg-main
                text-text-main
                transition-colors duration-300
            "
                >
        {/* Header global */}
            <Header />
        {/* Contenido principal */}
        <main
            className="
            px-6 py-6
            grid
            grid-cols-1
            lg:grid-cols-7
            gap-6
            items-start
        "
        >
            {children}
        </main>
     </div>
  );
}
