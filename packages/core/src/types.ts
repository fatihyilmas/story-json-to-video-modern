
export type RGBA = string; // #rrggbb[aa]
export type Easing = "linear"|"inCubic"|"outCubic"|"inOutCubic";

export interface Meta { fps: number; width: number; height: number; duration: number; background?: RGBA }
export interface Asset { id: string; type: "image"|"audio"|"font"|"video"|"lottie"; src: string; name?: string }
export interface Keyframe { time: number; [prop: string]: unknown }
export interface ClipBase { start: number; duration: number }
export interface ImageClip extends ClipBase { type: "image"; ref: string; fit?: "cover"|"contain"; transform?: { x?: number; y?: number; scale?: number; rotate?: number } }
export interface TextClip extends ClipBase { type: "text"; text: string; position?: {x:number;y:number}; style?: Record<string, unknown>; animate?: Keyframe[] }
export type Clip = ImageClip | TextClip;
export interface Track { id: string; clips: Clip[] }
export interface AudioItem { ref: string; start: number; gain?: number }
export interface Story { meta: Meta; assets: Asset[]; tracks: Track[]; audio?: AudioItem[] }
