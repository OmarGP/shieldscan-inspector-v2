import { useState } from "react";
import ServerSelector from "./ServerSelector";
import CodeBlock from "./CodeBlock";
import CopyButton from "./CopyButton";

export default function CodeGeneratorSidebar({ rawHeaders }) {
  const [server, setServer] = useState("apache");
  const hasHeaders = typeof rawHeaders === "string" && rawHeaders.trim() !== "";

  const generateCode = () => {
    switch (server) {
      case "apache":
        return `
# Apache Security Headers
Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self'"
Header always set X-Frame-Options "DENY"
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
Header always set Cross-Origin-Resource-Policy "same-origin"
Header always set Cross-Origin-Opener-Policy "same-origin"
Header always set Cross-Origin-Embedder-Policy "require-corp"
Header always set Cache-Control "no-store"
Header always set Access-Control-Allow-Origin "*"
                `;
      case "nginx":
        return `
# NGINX Security Headers
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self'" always;
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
add_header Cross-Origin-Resource-Policy "same-origin" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
add_header Cross-Origin-Embedder-Policy "require-corp" always;
add_header Cache-Control "no-store" always;
add_header Access-Control-Allow-Origin "*" always;
                `;
      case "express":
        return `
/* Express.js Security Headers */
app.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
                `;
      case "iis":
        return `
<!-- IIS Security Headers -->
<system.webServer>
  <httpProtocol>
    <customHeaders>
      <add name="Strict-Transport-Security" value="max-age=63072000; includeSubDomains" />
      <add name="Content-Security-Policy" value="default-src 'self'; script-src 'self'" />
      <add name="X-Frame-Options" value="DENY" />
      <add name="X-Content-Type-Options" value="nosniff" />
      <add name="Referrer-Policy" value="strict-origin" />
      <add name="Permissions-Policy" value="camera=(), microphone=(), geolocation=()" />
      <add name="Cross-Origin-Resource-Policy" value="same-origin" />
      <add name="Cross-Origin-Opener-Policy" value="same-origin" />
      <add name="Cross-Origin-Embedder-Policy" value="require-corp" />
      <add name="Cache-Control" value="no-store" />
      <add name="Access-Control-Allow-Origin" value="*" />
    </customHeaders>
  </httpProtocol>
</system.webServer>
                `;
      default:
        return "";
    }
  };

  return (
    <aside className="bg-[--bg-panel] border border-[--border-soft] rounded-lg p-6 w-full flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-[--text-main]">
        Generador de código
      </h2>

      <ServerSelector value={server} onChange={setServer} />

      <CodeBlock
        title="Respuesta HTTP actual"
        code={hasHeaders ? rawHeaders : ""}
      />

      <CodeBlock
        title="Configuración generada"
        code={hasHeaders ? generateCode() : ""}
      />

      <div className="flex justify-center">
        <CopyButton
          text={hasHeaders ? generateCode() : ""}
          disabled={!hasHeaders}
        />
      </div>
    </aside>
  );
}
