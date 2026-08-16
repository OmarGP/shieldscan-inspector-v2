// ===========================================================
//  Motor de análisis de cabeceras HTTP para auditorías OWASP
// ===========================================================

// ------------------------------------------------------
// 1) Funciones de análisis por cabecera
// ------------------------------------------------------

// HSTS (Strict-Transport-Security (HSTS))
function checkHSTS(headers) {
    const value = headers["strict-transport-security"];
    if (!value) {
        return danger("HSTS", "HSTS header missing.");
    }

    const hasMaxAge = value.includes("max-age");
    const hasSubdomains = value.includes("includeSubDomains");

    if (hasMaxAge && hasSubdomains) {
        return success("HSTS", "HSTS is properly configured.");
    }

    return warning("HSTS", "HSTS is present but incomplete.");
}

// CSP (Content-Security-Policy)
function checkCSP(headers) {
    const value = headers["content-security-policy"];
    if (!value) {
        return danger("CSP", "CSP header missing.");
    }

    if (value.includes("default-src")) {
        return success("CSP", "CSP is properly configured.");
    }

    return warning("CSP", "CSP is present but incomplete.");
}

// XFO (X-Frame-Options)
function checkXFO(headers) {
    const value = headers["x-frame-options"];
    if (!value) {
        return danger("X-Frame-Options", "X-Frame-Options missing.");
    }

    if (value === "DENY" || value === "SAMEORIGIN") {
        return success("X-Frame-Options", "XFO is properly configured.");
    }

    return warning("X-Frame-Options", "XFO value is unusual.");
}

// XCTO (X-Content-Type-Options)
function checkXCTO(headers) {
    const value = headers["x-content-type-options"];
    if (!value) {
        return danger("X-Content-Type-Options", "X-Content-Type-Options missing.");
    }

    if (value === "nosniff") {
        return success("X-Content-Type-Options", "XCTO is properly configured.");
    }

    return warning("X-Content-Type-Options", "XCTO value is unusual.");
}

// Referrer-Policy
function checkReferrerPolicy(headers) {
    const value = headers["referrer-policy"];
    if (!value) {
        return danger("Referrer-Policy", "Referrer-Policy missing.");
    }

    const goodValues = [
        "strict-origin",
        "strict-origin-when-cross-origin",
        "no-referrer"
    ];

    if (goodValues.includes(value)) {
        return success("Referrer-Policy", "Referrer-Policy is properly configured.");
    }

    return warning("Referrer-Policy", "Referrer-Policy is weak or unusual.");
}

// Permissions-Policy
function checkPermissionsPolicy(headers) {
    const value = headers["permissions-policy"];
    if (!value) {
        return danger("Permissions-Policy", "Permissions-Policy missing.");
    }

    if (value.includes("camera=()") || value.includes("microphone=()")) {
        return success("Permissions-Policy", "Permissions-Policy is properly configured.");
    }

    return warning("Permissions-Policy", "Permissions-Policy is present but incomplete.");
}

// CORP (Cross-Origin-Resource-Policy)
function checkCORP(headers) {
    const value = headers["cross-origin-resource-policy"];
    if (!value) {
        return danger("CORP", "CORP header missing.");
    }

    if (value === "same-origin" || value === "same-site") {
        return success("CORP", "CORP is properly configured.");
    }

    return warning("CORP", "CORP value is unusual.");
}

// ------------------------------------------------------
// 2) Cabeceras recomendadas (avanzadas)
// ------------------------------------------------------

// COOP (Cross-Origin-Opener-Policy)
function checkCOOP(headers) {
    const value = headers["cross-origin-opener-policy"];
    if (!value) {
        return warning("COOP", "COOP missing (recommended for isolation).");
    }

    if (value === "same-origin") {
        return success("COOP", "COOP is properly configured.");
    }

    return warning("COOP", "COOP value is weak.");
}

// COEP (Cross-Origin-Embedder-Policy)
function checkCOEP(headers) {
    const value = headers["cross-origin-embedder-policy"];
    if (!value) {
        return warning("COEP", "COEP missing (recommended for isolation).");
    }

    if (value === "require-corp") {
        return success("COEP", "COEP is properly configured.");
    }

    return warning("COEP", "COEP value is weak.");
}

// CORS (Cross-Origin Resource Sharing)
function checkCORS(headers) {
    const value = headers["access-control-allow-origin"];
    if (!value) {
        return warning("CORS", "CORS missing (depends on API usage).");
    }

    if (value === "*" || value.includes("http")) {
        return success("CORS", "CORS is configured.");
    }

    return warning("CORS", "CORS configuration may be restrictive.");
}

// Cache-Control
function checkCacheControl(headers) {
    const value = headers["cache-control"];
    if (!value) {
        return warning("Cache-Control", "Cache-Control missing.");
    }

    if (value.includes("no-store") || value.includes("no-cache")) {
        return success("Cache-Control", "Cache-Control is properly configured.");
    }

    return warning("Cache-Control", "Cache-Control may be too permissive.");
}

// ------------------------------------------------------
// 3) Helpers para estados
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
// 4) Score basado en OWASP
// ------------------------------------------------------

function calculateScore(results) {
    const weights = {
        success: 1,
        warning: 0.5,
        danger: 0
    };

    const total = Object.values(results)
        .map(r => weights[r.status])
        .reduce((a, b) => a + b, 0);

    return Math.round((total / Object.keys(results).length) * 10);
}

// ------------------------------------------------------
// 5) Recomendaciones inteligentes
// ------------------------------------------------------

function generateRecommendations(results) {
    const recs = [];  // recs = recommendations

    for (const key in results) {
        const item = results[key];

        if (item.status === "danger") {
            recs.push({
                title: `Fix ${item.title}`,
                description: item.description,
                icon: "⚠️"
            });
        }

        if (item.status === "warning") {
            recs.push({
                title: `Improve ${item.title}`,
                description: item.description,
                icon: "🔧"
            });
        }
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

        // Recomendadas
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
