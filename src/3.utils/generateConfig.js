export function generateConfig(server, results) {
  if (!results) return "";

  switch (server) {
    case "apache":
      return generateApache(results);
    case "nginx":
      return generateNginx(results);
    case "express":
      return generateExpress(results);
    case "iis":
      return generateIIS(results);
    default:
      return "";
  }
}

/* ---------------------------------------------------------
   APACHE
--------------------------------------------------------- */
function generateApache(results) {
  const lines = [];

  if (needsFix(results.hsts)) {
    lines.push(
      'Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains"'
    );
  }

  if (needsFix(results.csp)) {
    lines.push(
      'Header always set Content-Security-Policy "default-src \'self\'; script-src \'self\'"'
    );
  }

  if (needsFix(results.xfo)) {
    lines.push('Header always set X-Frame-Options "DENY"');
  }

  if (needsFix(results.xcto)) {
    lines.push('Header always set X-Content-Type-Options "nosniff"');
  }

  if (needsFix(results.referrer)) {
    lines.push('Header always set Referrer-Policy "strict-origin"');
  }

  if (needsFix(results.permissions)) {
    lines.push(
      'Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"'
    );
  }

  if (needsFix(results.corp)) {
    lines.push('Header always set Cross-Origin-Resource-Policy "same-origin"');
  }

  if (needsFix(results.coop)) {
    lines.push('Header always set Cross-Origin-Opener-Policy "same-origin"');
  }

  if (needsFix(results.coep)) {
    lines.push('Header always set Cross-Origin-Embedder-Policy "require-corp"');
  }

  if (needsFix(results.cache)) {
    lines.push('Header always set Cache-Control "no-store"');
  }

  if (needsFix(results.cors)) {
    lines.push('Header always set Access-Control-Allow-Origin "*"');
  }

  return lines.join("\n");
}

/* ---------------------------------------------------------
   NGINX
--------------------------------------------------------- */
function generateNginx(results) {
  const lines = [];

  if (needsFix(results.hsts)) {
    lines.push(
      'add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;'
    );
  }

  if (needsFix(results.csp)) {
    lines.push(
      'add_header Content-Security-Policy "default-src \'self\'; script-src \'self\'" always;'
    );
  }

  if (needsFix(results.xfo)) {
    lines.push('add_header X-Frame-Options "DENY" always;');
  }

  if (needsFix(results.xcto)) {
    lines.push('add_header X-Content-Type-Options "nosniff" always;');
  }

  if (needsFix(results.referrer)) {
    lines.push('add_header Referrer-Policy "strict-origin" always;');
  }

  if (needsFix(results.permissions)) {
    lines.push(
      'add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;'
    );
  }

  if (needsFix(results.corp)) {
    lines.push('add_header Cross-Origin-Resource-Policy "same-origin" always;');
  }

  if (needsFix(results.coop)) {
    lines.push('add_header Cross-Origin-Opener-Policy "same-origin" always;');
  }

  if (needsFix(results.coep)) {
    lines.push('add_header Cross-Origin-Embedder-Policy "require-corp" always;');
  }

  if (needsFix(results.cache)) {
    lines.push('add_header Cache-Control "no-store" always;');
  }

  if (needsFix(results.cors)) {
    lines.push('add_header Access-Control-Allow-Origin "*" always;');
  }

  return lines.join("\n");
}

/* ---------------------------------------------------------
   EXPRESS
--------------------------------------------------------- */
function generateExpress(results) {
  const lines = [];

  lines.push("app.use((req, res, next) => {");

  if (needsFix(results.hsts)) {
    lines.push(
      '  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");'
    );
  }

  if (needsFix(results.csp)) {
    lines.push(
      '  res.setHeader("Content-Security-Policy", "default-src \'self\'; script-src \'self\'");'
    );
  }

  if (needsFix(results.xfo)) {
    lines.push('  res.setHeader("X-Frame-Options", "DENY");');
  }

  if (needsFix(results.xcto)) {
    lines.push('  res.setHeader("X-Content-Type-Options", "nosniff");');
  }

  if (needsFix(results.referrer)) {
    lines.push('  res.setHeader("Referrer-Policy", "strict-origin");');
  }

  if (needsFix(results.permissions)) {
    lines.push(
      '  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");'
    );
  }

  if (needsFix(results.corp)) {
    lines.push('  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");');
  }

  if (needsFix(results.coop)) {
    lines.push('  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");');
  }

  if (needsFix(results.coep)) {
    lines.push('  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");');
  }

  if (needsFix(results.cache)) {
    lines.push('  res.setHeader("Cache-Control", "no-store");');
  }

  if (needsFix(results.cors)) {
    lines.push('  res.setHeader("Access-Control-Allow-Origin", "*");');
  }

  lines.push("  next();");
  lines.push("});");

  return lines.join("\n");
}

/* ---------------------------------------------------------
   IIS
--------------------------------------------------------- */
function generateIIS(results) {
  const lines = [];

  lines.push("<system.webServer>");
  lines.push("  <httpProtocol>");
  lines.push("    <customHeaders>");

  if (needsFix(results.hsts)) {
    lines.push(
      '      <add name="Strict-Transport-Security" value="max-age=63072000; includeSubDomains" />'
    );
  }

  if (needsFix(results.csp)) {
    lines.push(
      '      <add name="Content-Security-Policy" value="default-src \'self\'; script-src \'self\'" />'
    );
  }

  if (needsFix(results.xfo)) {
    lines.push('      <add name="X-Frame-Options" value="DENY" />');
  }

  if (needsFix(results.xcto)) {
    lines.push('      <add name="X-Content-Type-Options" value="nosniff" />');
  }

  if (needsFix(results.referrer)) {
    lines.push('      <add name="Referrer-Policy" value="strict-origin" />');
  }

  if (needsFix(results.permissions)) {
    lines.push(
      '      <add name="Permissions-Policy" value="camera=(), microphone=(), geolocation=()" />'
    );
  }

  if (needsFix(results.corp)) {
    lines.push(
      '      <add name="Cross-Origin-Resource-Policy" value="same-origin" />'
    );
  }

  if (needsFix(results.coop)) {
    lines.push(
      '      <add name="Cross-Origin-Opener-Policy" value="same-origin" />'
    );
  }

  if (needsFix(results.coep)) {
    lines.push(
      '      <add name="Cross-Origin-Embedder-Policy" value="require-corp" />'
    );
  }

  if (needsFix(results.cache)) {
    lines.push('      <add name="Cache-Control" value="no-store" />');
  }

  if (needsFix(results.cors)) {
    lines.push('      <add name="Access-Control-Allow-Origin" value="*" />');
  }

  lines.push("    </customHeaders>");
  lines.push("  </httpProtocol>");
  lines.push("</system.webServer>");

  return lines.join("\n");
}

/* ---------------------------------------------------------
   Helper
--------------------------------------------------------- */
function needsFix(item) {
  return item && item.status !== "success";
}
