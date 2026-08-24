import { normalizeHeaderName } from "./normalizeHeaderName"

export function parseHeadersText(inputText) {

  const headersObj = {};

  if (!inputText || inputText.trim() === "") return {};

  inputText
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.includes(":"))
    .forEach(line => {
      const [rawKey, ...rest] = line.split(":");
      const key = normalizeHeaderName(rawKey);
      const value = rest.join(":").trim();
      if (!key || !value) return;
      headersObj[key] = value;
    });

  return headersObj;
}