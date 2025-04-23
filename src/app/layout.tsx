import "@/src/styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <link rel="manifest" href="/manifest.json" />
      <AppRouterCacheProvider>
        <body>{children}</body>
      </AppRouterCacheProvider>
    </html>
  );
}
