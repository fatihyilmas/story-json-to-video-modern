export function timeToFrame(t, fps) { return Math.round(t * fps); }
export function durationInFrames({ meta }) { return timeToFrame(meta.duration, meta.fps); }
