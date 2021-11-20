export const globalDocument = typeof document === "undefined" ? (await import("dom-lite")).document : document;
