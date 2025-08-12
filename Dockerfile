FROM node:20-bullseye

# Install ffmpeg and build deps
RUN apt-get update && apt-get install -y ffmpeg libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . ./

# Use a pinned pnpm version 8 via corepack
# PNPM sürümü, uyumluluk için 8 olarak değiştirildi
RUN corepack enable && corepack prepare pnpm@8 --activate

# Install and build
RUN pnpm i --frozen-lockfile=false
RUN chmod -R +x node_modules/.bin/
RUN pnpm build

# Default to starting the server (for Render Web Service)
ENV PORT=10000
EXPOSE 10000
CMD [ "node", "packages/server/dist/index.js" ]
