// src/app/manifest.json/route.ts
import { NextResponse } from "next/server";
import { readSetting } from "@/src/lib/models/setting";
import {
  COLOR_PALETTES,
  getValidColor,
  DEFAULT_PRIMARY_COLOR,
} from "@/src/constants/colorTheme";

export async function GET() {
  try {
    // 設定からプライマリカラーを取得
    const setting = await readSetting();
    const primaryColor = getValidColor(
      setting?.primaryColor || undefined,
      DEFAULT_PRIMARY_COLOR
    );

    // プライマリカラーの800番を取得
    const themeColor = COLOR_PALETTES[primaryColor][800];

    const manifest = {
      theme_color: themeColor,
      background_color: themeColor,
      display: "standalone",
      scope: "/",
      start_url: "/",
      name: "麻雀計算",
      description: "これは麻雀で点数を計算するアプリケーションです",
      icons: [
        {
          src: "/apple-icon.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    };

    return NextResponse.json(manifest, {
      headers: {
        "Content-Type": "application/json",
        // ブラウザキャッシュを制御（開発時は短く、本番では長く）
        "Cache-Control": "public, max-age=3600, must-revalidate",
      },
    });
  } catch (error) {
    // エラー時はデフォルトのmanifestを返す
    const defaultManifest = {
      theme_color: COLOR_PALETTES[DEFAULT_PRIMARY_COLOR][800],
      background_color: COLOR_PALETTES[DEFAULT_PRIMARY_COLOR][800],
      display: "standalone",
      scope: "/",
      start_url: "/",
      name: "麻雀計算",
      description: "これは麻雀で点数を計算するアプリケーションです",
      icons: [
        {
          src: "/apple-icon.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    };

    return NextResponse.json(defaultManifest, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, must-revalidate",
      },
    });
  }
}
