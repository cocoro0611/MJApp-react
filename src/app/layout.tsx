import "@/src/styles/globals.css";
import Footer from "../components/layout/Footer";
import CognitoProvider from "../lib/providers/CognitoProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ColorThemeProvider } from "../lib/providers/ColorThemeProvider";
import { readColor } from "../lib/models/setting";

type Color =
  | "blue"
  | "green"
  | "red"
  | "orange"
  | "purple"
  | "pink"
  | "cyan"
  | "teal";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setting = await readColor();
  const primaryColor = (setting?.primaryColor as Color) || "blue";
  const secondaryColor = (setting?.secondaryColor as Color) || "orange";

  return (
    <html lang="ja">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-gray-50 text-gray-800 min-h-screen">
        <AppRouterCacheProvider>
          <ColorThemeProvider
            initialPrimaryColor={primaryColor}
            initialSecondaryColor={secondaryColor}
            initialCustomMode={true}
          >
            <CognitoProvider>
              <div className="container mx-auto bg-white min-h-screen shadow-xl">
                <div className="pb-20">{children}</div>
                <Footer />
              </div>
            </CognitoProvider>
          </ColorThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
