import ffmpeg from "fluent-ffmpeg";
import fs from "node:fs";
import path from "node:path";
export async function encodePngSequenceToMp4(framesDir, fps, outFile, audioPath) {
    await fs.promises.mkdir(path.dirname(outFile), { recursive: true });
    return new Promise((resolve, reject) => {
        let cmd = ffmpeg()
            .addInput(path.join(framesDir, "%06d.png"))
            .inputFPS(fps)
            .videoCodec("libx264")
            .outputOptions(["-pix_fmt yuv420p", "-movflags +faststart"])
            .format("mp4");
        if (audioPath) {
            cmd = cmd.addInput(audioPath).complexFilter(["[1:a]aformat=sample_fmts=fltp:channel_layouts=stereo,volume=1.0[a1]", "[0:v][a1]concat=n=1:v=1:a=1[v][a]"]).outputOptions(["-map [v]", "-map [a]"]);
        }
        cmd.on("end", () => resolve()).on("error", reject).save(outFile);
    });
}
