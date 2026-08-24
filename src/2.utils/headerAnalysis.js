// ===========================================================
//  Motor de análisis de cabeceras HTTP para auditorías OWASP
// ===========================================================
// ------------------------------------------------------
// 1) Funciones de análisis por cabecera
// ------------------------------------------------------

function checkHSTS(headers) {
  const value = headers["strict-transport-security"];
  if (!value) return danger("HSTS", "Falta Strict-Transport-Security.");
  if (value.includes("max-age") && value.includes("includeSubDomains"))
    return success("HSTS", "HSTS correctamente configurado.");
  return warning("HSTS", "HSTS incompleto.");
}

function checkCSP(headers) {
  const value = headers["content-security-policy"];
  if (!value) return danger("CSP", "Falta Content-Security-Policy.");
  if (value.includes("default-src"))
    return success("CSP", "CSP correctamente configurado.");
  return warning("CSP", "CSP incompleto o débil.");
}

function checkXFO(headers) {
  const value = headers["x-frame-options"];
  if (!value) return danger("X-Frame-Options", "Falta X-Frame-Options.");
  if (value === "DENY" || value === "SAMEORIGIN")
    return success("X-Frame-Options", "XFO correctamente configurado.");
  return warning("X-Frame-Options", "XFO con valor inusual.");
}

function checkXCTO(headers) {
  const value = headers["x-content-type-options"];
  if (!value) return danger("X-Content-Type-Options", "Falta X-Content-Type-Options.");
  if (value === "nosniff")
    return success("X-Content-Type-Options", "XCTO correctamente configurado.");
  return warning("X-Content-Type-Options", "XCTO con valor inusual.");
}

function checkReferrerPolicy(headers) {
  const value = headers["referrer-policy"];
  if (!value) return danger("Referrer-Policy", "Falta Referrer-Policy.");
  const good = ["strict-origin", "strict-origin-when-cross-origin", "no-referrer"];
  if (good.includes(value))
    return success("Referrer-Policy", "Referrer-Policy correctamente configurado.");
  return warning("Referrer-Policy", "Referrer-Policy débil o inusual.");
}

function checkPermissionsPolicy(headers) {
  const value = headers["permissions-policy"];
  if (!value) return danger("Permissions-Policy", "Falta Permissions-Policy.");
  if (value.includes("camera=()") || value.includes("microphone=()"))
    return success("Permissions-Policy", "Permissions-Policy correctamente configurado.");
  return warning("Permissions-Policy", "Permissions-Policy incompleto.");
}

function checkCORP(headers) {
  const value = headers["cross-origin-resource-policy"];
  if (!value) return danger("CORP", "Falta Cross-Origin-Resource-Policy.");
  if (value === "same-origin" || value === "same-site")
    return success("CORP", "CORP correctamente configurado.");
  return warning("CORP", "CORP con valor inusual.");
}

function checkCOOP(headers) {
  const value = headers["cross-origin-opener-policy"];
  if (!value) return warning("COOP", "Falta Cross-Origin-Opener-Policy (recomendado).");
  if (value === "same-origin")
    return success("COOP", "COOP correctamente configurado.");
  return warning("COOP", "COOP débil.");
}

function checkCOEP(headers) {
  const value = headers["cross-origin-embedder-policy"];
  if (!value) return warning("COEP", "Falta Cross-Origin-Embedder-Policy (recomendado).");
  if (value === "require-corp")
    return success("COEP", "COEP correctamente configurado.");
  return warning("COEP", "COEP débil.");
}

function checkCORS(headers) {
  const value = headers["access-control-allow-origin"];
  if (!value) return warning("CORS", "Falta Access-Control-Allow-Origin.");
  if (value === "*" || value.includes("http"))
    return success("CORS", "CORS configurado.");
  return warning("CORS", "CORS restrictivo.");
}

function checkCacheControl(headers) {
  const value = headers["cache-control"];
  if (!value) return warning("Cache-Control", "Falta Cache-Control.");
  if (value.includes("no-store") || value.includes("no-cache"))
    return success("Cache-Control", "Cache-Control correctamente configurado.");
  return warning("Cache-Control", "Cache-Control permisivo.");
}

// ------------------------------------------------------
// 2) Helpers
// ------------------------------------------------------

function success(title, description) {
    return { title, status: "success", description };
}

function warning(title, description) {
    return { title, status: "warning", description };
}

function danger(title, description) {
    return { title, status: "danger", description };
}

// ------------------------------------------------------
// 3)Mapa según importancia
// ------------------------------------------------------

const importance = {
  hsts: "essential",
  csp: "essential",
  xfo: "essential",
  xcto: "essential",
  referrer: "essential",

  permissions: "recommended",
  corp: "recommended",
  coop: "recommended",
  coep: "recommended",

  cors: "optional",
  cache: "optional",
};

// ------------------------------------------------------
// 4)Cálculo de Score
// ------------------------------------------------------

function calculateScore(results) {
  const weights = {
    essential: { success: 3, warning: 1, danger: 0 },
    recommended: { success: 2, warning: 1, danger: 0 },
    optional: { success: 1, warning: 0.5, danger: 0 },
  };

  let total = 0;
  let max = 0;

  for (const key in results) {
    const item = results[key];
    const level = importance[key] || "optional";
    const w = weights[level];

    total += w[item.status];
    max += w["success"];
  }

  return Math.round((total / max) * 10);
}

// ------------------------------------------------------
// 5) Recomendaciones
// ------------------------------------------------------

function generateRecommendations(results) {
    const recs = [];
    for (const key in results) {
        const item = results[key];
        if (item.status === "danger")
            recs.push({ 
              key,
              title: `Reparar ${item.title}`, 
              description: item.description, 
              icon: "⚠️",
              status: "danger",
            });
        if (item.status === "warning")
            recs.push({ 
              key,
              title: `Mejorar ${item.title}`, 
              description: item.description, 
              icon: "🔧",
              status: "warning",
            });
    }
    return recs;
}

// ------------------------------------------------------
// 6) Función principal
// ------------------------------------------------------

export function analyzeHeaders(headers) {
    const results = {
        hsts: checkHSTS(headers),
        csp: checkCSP(headers),
        xfo: checkXFO(headers),
        xcto: checkXCTO(headers),
        referrer: checkReferrerPolicy(headers),
        permissions: checkPermissionsPolicy(headers),
        corp: checkCORP(headers),
        coop: checkCOOP(headers),
        coep: checkCOEP(headers),
        cors: checkCORS(headers),
        cache: checkCacheControl(headers)
    };

    return {
        results,
        score: calculateScore(results),
        recommendations: generateRecommendations(results)
    };
}