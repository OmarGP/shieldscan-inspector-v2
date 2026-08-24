import { useState } from "react";
import SearchButton from "./SearchButton";

export default function SearchBar({ setHeadersFromUser, setUrl }) {
  
  const [url, setLocalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = async () => {
    if (!url) return;

    setLoading(true);
    setUrl(url);
    setErrorMsg("");

    try {
      const response = await fetch(url);

      const headersObj = {};
      response.headers.forEach((value, key) => {
        headersObj[key] = value;
      });

      setHeadersFromUser(headersObj);
    } catch {
      // Limpia cabeceras para que el análisis se resetee
      setHeadersFromUser({});
      setErrorMsg(
        "No se pudieron obtener las cabeceras (CORS o URL inaccesible).",
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div
        className="
          flex
          items-center
          w-full
          border
          rounded-lg
          overflow-hidden
        "
      >
        {/* Input */}
        <input
          type="text"
          placeholder="Pega tu URL aquí..."
          value={url}
          onChange={(e) => setLocalUrl(e.target.value)}
          className="
            w-full px-4 py-2
            text-text-main
            placeholder:text-slate-400 
            focus:outline-none
          "
        />

        {/* Botón dentro de la barra */}
        <SearchButton onClick={handleAnalyze} loading={loading} />
      </div>

      {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
    </div>
  );
}
