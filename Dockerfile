FROM node:20-bullseye

# FFmpeg ve native bağımlılıklar
RUN apt-get update && apt-get install -y \
  ffmpeg libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev \
  python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

# pnpm 8
RUN corepack enable && corepack prepare pnpm@8 --activate

# --- Install ---
# devDependencies dahil (turbo burada)
ENV NODE_ENV=development
RUN pnpm install -r --frozen-lockfile --prod=false --shamefully-hoist

# Bazı ortamlarda pnpm'in yarattığı bin dosyaları exec biti olmadan gelebiliyor; garanti verelim
RUN chmod -R +x node_modules/.bin || true \
  && find node_modules -type f -path "*/.pnpm/*/node_modules/*/bin/*" -exec chmod +x {} \; || true

# --- Build ---
# Yerel bin'e bağlı kalmamak için dlx ile turbo'yu çalıştır
RUN pnpm dlx turbo@2 build

# --- Runtime ---
ENV NODE_ENV=production
ENV PORT=10000
EXPOSE 10000

CMD ["node", "packages/server/dist/index.js"]
