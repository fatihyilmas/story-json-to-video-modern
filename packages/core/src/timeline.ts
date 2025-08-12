
import { Story } from "./schema";

export function timeToFrame(t: number, fps: number) { return Math.round(t * fps); }
export function durationInFrames({ meta }: Story) { return timeToFrame(meta.duration, meta.fps); }
