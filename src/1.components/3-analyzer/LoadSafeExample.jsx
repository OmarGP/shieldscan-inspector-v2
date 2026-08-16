export default function LoadSafeExample({ setExternalHeaders }) {

  const safeHeaders = {
    "strict-transport-security": "max-age=63072000; includeSubDomains",
    "content-security-policy": "default-src 'self'; script-src 'self'",
    "x-frame-options": "DENY",
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin",
    "permissions-policy": "camera=(), microphone=(), geolocation=()",
    "cross-origin-resource-policy": "same-origin",
    "cross-origin-opener-policy": "same-origin",
    "cross-origin-embedder-policy": "require-corp",
    "cache-control": "no-store",
    "access-control-allow-origin": "*",
  };

  const objectToHeaderText = (obj) =>
    Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

  return (
    <button
      onClick={() => setExternalHeaders(objectToHeaderText(safeHeaders))}
      className="
        px-4 py-2 rounded-md
        bg-blue-900 text-white font-semibold
        hover:bg-blue-700
      "
    >
      Cargar ejemplo seguro
    </button>
  );
}
