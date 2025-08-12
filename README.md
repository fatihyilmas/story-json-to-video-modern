
# story-json-to-video (modern TS)

Deploy notes for Render:
- This repo now includes a tiny HTTP server so a **Web Service** on Render can pass health checks.
- If you don't need HTTP, you can deploy as a **Background Worker** instead.

## Build locally
```bash
pnpm i
pnpm -C packages/cli dev
npx tsx packages/cli/src/index.ts examples/story.sample.json --out out.mp4
```
