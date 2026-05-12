import type { Metadata } from "next";
import { Patrick_Hand, Bebas_Neue, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Anti-Sludge Gov · FCINCO/MGI",
  description:
    "Diagnóstico de barreiras em serviços públicos digitais — metodologia F5 Anti-Sludge. Aderente ao Padrão Digital de Governo (gov.br Design System).",
};

// Rawline (fonte sans obrigatória do Padrão Mínimo gov.br) é carregada via
// @import em globals.css a partir de fonts.cdnfonts.com — não dá pra usar
// next/font/google porque Rawline não está no Google Fonts.
//
// Patrick Hand, Bebas Neue e JetBrains Mono são utilizadas em momentos
// específicos (handlettering FCINCO, numeração de etapas, dados tabulares)
// e ficam disponíveis como variáveis CSS opt-in (--font-hand, --font-display,
// --font-mono) via Tailwind. NÃO substituem Rawline no corpo.
const patrickHand = Patrick_Hand({
  variable: "--font-hand",
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${patrickHand.variable} ${bebasNeue.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
