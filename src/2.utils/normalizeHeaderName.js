
export function normalizeHeaderName(name) {
  if (!name) return null;

  // Normalizar acentos, espacios y mayúsculas
  let n = name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/\s+/g, " "); // normalizar espacios

  const map = {
    // Español → Inglés
    "politica de referencia": "referrer-policy",
    "politica de recursos de origen cruzado": "cross-origin-resource-policy",
    "control cache": "cache-control",
    "politica de permisos": "permissions-policy",
    "politica de apertura de origen cruzado": "cross-origin-opener-policy",
    "politica de incrustacion de origen cruzado": "cross-origin-embedder-policy",

    // Variantes sin guiones
    "strict transport security": "strict-transport-security",
    "content security policy": "content-security-policy",
    "x frame options": "x-frame-options",
    "x content type options": "x-content-type-options",

    // Correctas
    "strict-transport-security": "strict-transport-security",
    "content-security-policy": "content-security-policy",
    "x-frame-options": "x-frame-options",
    "x-content-type-options": "x-content-type-options",
    "referrer-policy": "referrer-policy",
    "permissions-policy": "permissions-policy",
    "cross-origin-resource-policy": "cross-origin-resource-policy",
    "cross-origin-opener-policy": "cross-origin-opener-policy",
    "cross-origin-embedder-policy": "cross-origin-embedder-policy",
    "cache-control": "cache-control",
    "access-control-allow-origin": "access-control-allow-origin",
  };

  return map[n] || n;
}

