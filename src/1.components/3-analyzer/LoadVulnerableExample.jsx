export default function LoadVulnerableExample({ setExternalHeaders }) {

  const vulnerableHeaders = {
    "access-control-allow-origin": "*",
    "x-powered-by": "Express",
    "server": "nginx",
  };

  const objectToHeaderText = (obj) =>
    Object.entries(obj)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

  return (
    <button
      onClick={() => setExternalHeaders(objectToHeaderText(vulnerableHeaders))}
      className="
        px-4 py-2 rounded-md
        bg-red-900 text-white font-semibold
        hover:bg-red-700
      "
    >
      Cargar ejemplo vulnerable
    </button>
  );
}
