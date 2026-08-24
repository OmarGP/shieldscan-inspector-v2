/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import ClearButton from "./ClearButton";
import { parseHeadersText } from "../../2.utils/parseHeaders.js"

/* ---------------------------------------------------------
   COMPONENTE PRINCIPAL
   --------------------------------------------------------- */
export default function HeaderInputArea({
  externalHeaders,
  setHeadersFromUser
}) {
  const [text, setText] = useState("");

  // Sincroniza correctamente cuando externalHeaders cambia
  useEffect(() => {
    if (!externalHeaders || externalHeaders.trim() === "") {
      setText("");
      setHeadersFromUser({});
      return;
    }

    setText(externalHeaders);
    setHeadersFromUser(parseHeadersText(externalHeaders));
  }, [externalHeaders, setHeadersFromUser]);

  return (
    <div className="relative">
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
            border
            p-3 rounded-md
            text-text-main
            placeholder:text-placeholder-color
          "
      />

       <ClearButton
        onClick={() => {
          setText("");
          setHeadersFromUser({});
        }}
        className="absolute bottom-2 right-5"
      />
    </div>
  );
}
