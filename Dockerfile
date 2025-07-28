# Node.js 18のベースイメージを使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpnpm-lock.yamlをコピー
COPY package.json ./

# pnpmをインストール
RUN npm install -g pnpm

# 依存関係をインストール
RUN pnpm install

# アプリケーションのソースコードをコピー
COPY . .

# Next.jsアプリをビルド
RUN pnpm run build

# ポート3000を公開
EXPOSE 3000

# アプリケーションを起動
CMD ["pnpm", "start"]