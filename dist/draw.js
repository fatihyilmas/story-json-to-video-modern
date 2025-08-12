import { Image } from "skia-canvas";
import fs from "node:fs";
export async function loadImage(src) {
    const data = await fs.promises.readFile(src);
    const img = new Image();
    img.src = data;
    return img;
}
export function drawCenteredText(ctx, text, x, y) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
}
