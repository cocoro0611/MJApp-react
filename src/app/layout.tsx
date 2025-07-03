import "@/src/styles/globals.css";
import Footer from "../components/layout/Footer";
import Sidebar from "../components/layout/Sidebar";
import CognitoProvider from "../lib/providers/CognitoProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ColorThemeProvider } from "../lib/providers/ColorThemeProvider";
import { readSetting } from "../lib/models/setting";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setting = await readSetting();
  const primaryColor = setting?.primaryColor || "blue";
  const secondaryColor = setting?.secondaryColor || "orange";

  return (
    <html lang="ja">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-primary-50 text-gray-800 font-sans">
        <AppRouterCacheProvider>
          <ColorThemeProvider
            initialPrimaryColor={primaryColor}
            initialSecondaryColor={secondaryColor}
          >
            <CognitoProvider>
              {/* アプリ全体のコンテナ */}
              <div className="min-h-screen flex">
                {/* サイドバー - lg以上でのみ表示 */}
                <Sidebar className="hidden lg:block" />

                {/* メインコンテンツ */}
                <div className="flex-1 flex flex-col lg:ml-64">
                  {/* コンテンツラッパー */}
                  <main className="flex-1 bg-white lg:bg-primary-50">
                    {/* lg未満: containerで幅制限 + 影 */}
                    {/* lg以上: 全幅表示 */}
                    <div className="page-container shadow-xl lg:shadow-none">
                      <div className="pb-20 lg:pb-6">{children}</div>
                    </div>
                  </main>

                  {/* フッター - lg未満でのみ表示 */}
                  <div className="center lg:hidden">
                    <Footer />
                  </div>
                </div>
              </div>
            </CognitoProvider>
          </ColorThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
