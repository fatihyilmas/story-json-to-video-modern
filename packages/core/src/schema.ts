
import { z } from "zod";

export const metaSchema = z.object({
  fps: z.number().min(1).max(120),
  width: z.number().min(64),
  height: z.number().min(64),
  duration: z.number().positive(),
  background: z.string().optional()
});

export const assetSchema = z.object({
  id: z.string(),
  type: z.enum(["image","audio","font","video","lottie"]),
  src: z.string(),
  name: z.string().optional()
});

export const keyframeSchema = z.object({ time: z.number() }).catchall(z.any());

const clipBase = z.object({ start: z.number().min(0), duration: z.number().positive() });

export const imageClip = clipBase.extend({
  type: z.literal("image"),
  ref: z.string(),
  fit: z.enum(["cover","contain"]).optional(),
  transform: z.object({ x: z.number().optional(), y: z.number().optional(), scale: z.number().optional(), rotate: z.number().optional() }).optional()
});

export const textClip = clipBase.extend({
  type: z.literal("text"),
  text: z.string(),
  position: z.object({x:z.number(), y:z.number()}).optional(),
  style: z.record(z.any()).optional(),
  animate: z.array(keyframeSchema).optional()
});

export const clipSchema = z.discriminatedUnion("type", [imageClip, textClip]);

export const trackSchema = z.object({ id: z.string(), clips: z.array(clipSchema) });

export const audioSchema = z.object({ ref: z.string(), start: z.number().min(0), gain: z.number().optional() });

export const storySchema = z.object({
  meta: metaSchema,
  assets: z.array(assetSchema),
  tracks: z.array(trackSchema),
  audio: z.array(audioSchema).optional()
});

export type Story = z.infer<typeof storySchema>;
