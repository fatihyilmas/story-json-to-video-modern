# ---- Base image ----
FROM node:20-bullseye

# FFmpeg ve native bağımlılıklar
RUN apt-get update && apt-get install -y \
  ffmpeg libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev \
  python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# Çalışma dizini
WORKDIR /app
COPY . .

# pnpm 8
RUN corepack enable && corepack prepare pnpm@8 --activate

# ---- Install + Build ----
# ÖNEMLİ: devDependencies de yüklensin ki turbo CLI bulunsun
ENV NODE_ENV=development
RUN pnpm install -r --frozen-lockfile --prod=false --shamefully-hoist

# Build (package.json'daki "build": "turbo build" scriptini çalıştırır)
RUN pnpm build
# (İstersen alternatif olarak: RUN pnpm dlx turbo@2 build)

# ---- Runtime ----
ENV NODE_ENV=production
ENV PORT=10000
EXPOSE 10000

CMD ["node", "packages/server/dist/index.js"]
