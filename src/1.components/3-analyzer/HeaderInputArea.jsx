/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

export default function HeaderInputArea({
  externalHeaders,
  setHeadersFromUser,
}) {
  const [text, setText] = useState("");

  const parseHeadersText = (inputText) => {
    const headersObj = {};

    inputText.split("\n").forEach((line) => {
      const [key, value] = line.split(":");
      if (key && value) {
        headersObj[key.trim().toLowerCase()] = value.trim();
      }
    });

    return headersObj;
  };

  // Sincroniza CORRECTAMENTE tanto si el string tiene contenido como si se vacía
  useEffect(() => {
    setText(externalHeaders);
    setHeadersFromUser(parseHeadersText(externalHeaders));
  }, [externalHeaders, setHeadersFromUser]);

  return (
    <textarea
      value={text}
      placeholder="Pega aquí las cabeceras HTTP..."
      onChange={(e) => {
        const newValue = e.target.value;
        setText(newValue);
        setHeadersFromUser(parseHeadersText(newValue));
      }}
      className="
                w-full h-40
                bg-[--bg-card]
                border border-[--border-soft]
                p-3 rounded-md
                text-[--text-main]
                placeholder:text-[--placeholder-color]
            "
    />
  );
}
