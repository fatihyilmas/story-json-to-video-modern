
#!/usr/bin/env node
import { Command } from "commander";
import { storySchema } from "@sjtv/core";
import { renderFrame } from "@sjtv/renderer-canvas";
import { encodePngSequenceToMp4 } from "@sjtv/encoder";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const program = new Command();
program
  .name("story-json-to-video")
  .description("Compile Story JSON into a video")
  .argument("<story>", "Path to story JSON")
  .option("-o, --out <file>", "Output mp4 file", "story.mp4")
  .action(async (storyPath, opts) => {
    const raw = await fs.promises.readFile(storyPath, "utf8");
    const story = storySchema.parse(JSON.parse(raw));

    const framesDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "sjtv-"));

    const totalFrames = Math.round(story.meta.duration * story.meta.fps);
    for (let i = 0; i < totalFrames; i++) {
      const t = i / story.meta.fps;
      const png = await renderFrame(story, t);
      const p = path.join(framesDir, `${String(i).padStart(6, "0")}.png`);
      await fs.promises.writeFile(p, png);
      if (i % Math.max(1, Math.floor(story.meta.fps)) === 0) {
        process.stdout.write(`\rRendering ${i+1}/${totalFrames} frames...`);
      }
    }
    process.stdout.write("\nEncoding...\n");

    await encodePngSequenceToMp4(framesDir, story.meta.fps, opts.out);

    console.log(`Done → ${opts.out}`);
  });

program.parse();
