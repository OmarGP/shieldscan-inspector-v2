import { useState } from "react";
import SearchButton from "./SearchButton";

export default function SearchBar({ setHeadersFromUser }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!url) return;

    setLoading(true);

    try {
      const response = await fetch(url);

      const headersObj = {};
      response.headers.forEach((value, key) => {
        headersObj[key] = value;
      });

      setHeadersFromUser(headersObj);
    } catch {
      setHeadersFromUser({ error: "No se pudo analizar la URL" });
    }

    setLoading(false);
  };

  return (
    <div
      className="
                flex
                items-center
                w-full
                bg-[--bg-card]
                border border-[--border-soft]
                rounded-lg
                overflow-hidden
            "
    >
      {/* Input */}
      <input
        type="text"
        placeholder="Pega tu URL aquí..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="
                    w-full px-4 py-2
                    bg-[--bg-card]
                    text-[--text-main]
                    placeholder:text-(--placeholder-color)
                    focus:outline-none
                "
      />

      {/* Botón dentro de la barra */}
      <SearchButton onClick={handleAnalyze} loading={loading} />
    </div>
  );
}
