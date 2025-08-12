import fs from "node:fs";
export function registerFont(name, path) {
    const data = fs.readFileSync(path);
    // skia-canvas auto-registers fonts when used; return family name for now.
    return `${name}`;
}
