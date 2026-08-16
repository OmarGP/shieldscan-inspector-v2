import { useState } from "react";
import MainLayout from "./1.components/2-layout/MainLayout";
import AnalyzerPanel from "./1.components/3-analyzer/AnalyzerPanel";
import CodeGeneratorSidebar from "./1.components/4-sidebar/CodeGeneratorSidebar";

export default function App() {
    const [rawHeaders, setRawHeaders] = useState("");

    return (
        <MainLayout>
            {/* Columna 1 + 2 */}
            <div className="lg:col-span-5">
                <AnalyzerPanel setRawHeaders={setRawHeaders} />
            </div>

            {/* Columna 3 */}
            <div className="lg:col-span-2">
                <CodeGeneratorSidebar rawHeaders={rawHeaders} />
            </div>
        </MainLayout>
    );
}
