# ビルドステージ
FROM node:18-alpine AS build

WORKDIR /app

# pnpm有効化
RUN corepack enable pnpm

# 依存関係のコピーとインストール
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ソースコードをコピー
COPY . .

# Prismaクライアント生成
RUN npx prisma migrate dev 
RUN npx prisma generate

# Next.jsビルド
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build

# 本番ステージ
FROM node:18-alpine

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# ユーザー作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

# 必要なファイルをコピー
COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

# 非rootユーザーに切り替え
USER nextjs

# ポート設定
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["node", "server.js"]