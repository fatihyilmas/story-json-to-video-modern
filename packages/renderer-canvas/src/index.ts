
import { Canvas } from "skia-canvas";
import { Story } from "@sjtv/core";
import { loadImage, drawCenteredText } from "./draw";

export async function renderFrame(story: Story, t: number): Promise<Buffer> {
  const { width, height, background } = story.meta;
  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = background ?? "#000";
  ctx.fillRect(0,0,width,height);

  for (const track of story.tracks) {
    for (const clip of track.clips) {
      const inTime = t >= clip.start && t < clip.start + clip.duration;
      if (!inTime) continue;
      if (clip.type === "image") {
        const img = await loadImage(clip.ref);
        ctx.drawImage(img, 0, 0, width, height);
      }
      if (clip.type === "text") {
        ctx.font = `${clip.style?.fontSize ?? 48}px ${clip.style?.fontFamily ?? "sans-serif"}`;
        ctx.fillStyle = (clip.style?.fill as string) ?? "#fff";
        drawCenteredText(ctx, clip.text, clip.position?.x ?? width/2, clip.position?.y ?? height/2);
      }
    }
  }

  return canvas.toBuffer("png");
}
