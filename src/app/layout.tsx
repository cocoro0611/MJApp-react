import "@/src/styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Container } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <link rel="manifest" href="/manifest.json" />
      <AppRouterCacheProvider>
        <body>
          <header className="fixed top-0 w-full z-10 bg-amber-300">
            ヘッダー
          </header>

          <Container maxWidth="lg" className="my-10">
            {children}
          </Container>

          <footer className="fixed bottom-0 w-full z-10 bg-amber-500">
            フッター
          </footer>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
