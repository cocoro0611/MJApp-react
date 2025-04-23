import "@/src/styles/globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Container } from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <AppRouterCacheProvider>
        <body>
          <Header />
          <Container className="mt-10 mb-10">{children}</Container>
          <Footer />
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
