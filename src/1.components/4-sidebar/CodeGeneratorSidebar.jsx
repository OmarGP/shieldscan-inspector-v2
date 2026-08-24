import { useState } from "react";
import ServerSelector from "./ServerSelector";
import CodeBlock from "./CodeBlock";
import CopyButton from "./CopyButton";
import { generateConfig } from "../../2.utils/generateConfig";

export default function CodeGeneratorSidebar({ rawHeaders, results }) {
  const [server, setServer] = useState("apache");

  // Detecta si hay cabeceras reales
  const hasHeaders = (() => {
    if (!rawHeaders || rawHeaders.trim() === "") return false;

    try {
      const obj = JSON.parse(rawHeaders);
      return Object.keys(obj).length > 0;
    } catch {
      return false;
    }
  })();

  const generateCode = hasHeaders && results
    ? generateConfig(server, results)
    : "";

  return (
    <aside className="bg-bg-panel border rounded-lg p-6 w-full flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-text-main">
        Generador de código
      </h2>

      <ServerSelector value={server} onChange={setServer} />

      <CodeBlock
        title="Respuesta HTTP actual"
        code={hasHeaders ? rawHeaders : ""}
      />

      <CodeBlock
        title="Configuración generada"
        code={generateCode}
      />

      <div className="flex justify-center">
        <CopyButton
          text={generateCode}
          disabled={!generateCode}
        />
      </div>
    </aside>
  );
}
