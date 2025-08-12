
import { Canvas, Image } from "skia-canvas";
import fs from "node:fs";

export type DrawContext = { canvas: Canvas; ctx: CanvasRenderingContext2D };

export async function loadImage(src: string) {
  const data = await fs.promises.readFile(src);
  const img = new Image();
  img.src = data;
  return img;
}

export function drawCenteredText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}
