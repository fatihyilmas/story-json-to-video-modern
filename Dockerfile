
FROM node:20-bullseye

# Install ffmpeg and build deps
RUN apt-get update && apt-get install -y ffmpeg libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . ./

# Use a pinned pnpm via corepack to satisfy Render
RUN corepack enable && corepack prepare pnpm@9.6.0 --activate

# Install and build
RUN pnpm i --frozen-lockfile=false
RUN pnpm build

# Default to starting the server (for Render Web Service)
ENV PORT=10000
EXPOSE 10000
CMD [ "node", "packages/server/dist/index.js" ]
