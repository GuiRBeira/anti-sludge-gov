import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { type ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anti-Sludge Gov",
  description: "Análise e redução de carga administrativa",
};

import { Shell } from "@/components/common/Shell";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { FeedbackButton } from "@/features/feedback/components/FeedbackButton";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">
        <QueryProvider>
          <AuthProvider>
            <Shell>{children}</Shell>
            <FeedbackButton />
            <Toaster position="top-right" expand={false} richColors />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
