import "../styles/globals.css";
import { Metadata, Viewport } from "next";

import { Providers } from "../lib/providers";

export const metadata: Metadata = {
  title: "Fork & Flavor || A Recipe sharing platform",
  description: "Recipe sharing platform",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" >
      <head>
        <link
          href="https://raw.githubusercontent.com/kazirauf/Fork-Flavor-Client-Side/refs/heads/main/src/public/logo-nav.png"
          rel="icon"
        />
      </head>
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
