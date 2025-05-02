import "@/src/styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import Footer from "../components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* FIXME:拡大できないように調整 */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <AppRouterCacheProvider>
        <body className="bg-blue-50 min-h-screen">
          <div className="container mx-auto bg-white min-h-screen shadow-xl">
            <div className="pb-20">{children}</div>
            <Footer />
          </div>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
