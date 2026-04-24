"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";
import { GovIcon } from "@/components/gov/GovIcon";

export default function LoginPage() {
  const { user, login, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    // Carregar o script do Google Identity Services
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google && !window.google_initialized) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
          callback: async (response: any) => {
            try {
              await login(response.credential);
              router.push("/");
            } catch (error) {
              console.error("Falha ao logar:", error);
            }
          },
        });
        window.google_initialized = true;
      }

      if (window.google) {
        window.google.accounts.id.renderButton(
          document.getElementById("google-button"),
          {
            theme: "outline",
            size: "large",
            width: 320,
            text: "signin_with",
            shape: "rectangular"
          }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [login, router]);

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
      {/* Header Estilo GOV.BR */}
      <header className="bg-[#004b82] text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded">
                <GovIcon icon="bi:shield-check" className="text-[#004b82] text-2xl" />
            </div>
            <span className="font-bold text-xl tracking-tight">anti-sludge.gov</span>
          </div>
          <div className="hidden md:block text-sm opacity-80">
            Plataforma de Redução de Carga Administrativa
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden flex flex-col">
          {/* Top Bar do Card */}
          <div className="h-1 bg-[#004b82]"></div>

          <div className="p-8">
            <div className="flex justify-center mb-6 text-[#004b82]">
                <GovIcon icon="ri:government-line" className="text-6xl" />
            </div>

            <h1 className="text-2xl font-bold text-center text-slate-800 mb-2">
              Identifique-se no anti-sludge.gov
            </h1>
            <p className="text-center text-slate-500 mb-8 text-sm">
              Para acessar o dashboard de análise de sludge, utilize sua conta Google autorizada.
            </p>

            <div className="space-y-6 flex flex-col items-center">
              {/* Container para o botão oficial do Google */}
              <div id="google-button" className="w-full flex justify-center"></div>

              <div className="relative w-full py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400">Ambiente Restrito</span>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                 <button disabled className="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded text-slate-400 cursor-not-allowed text-xs transition-colors">
                    <GovIcon icon="simple-icons:icloud" />
                    gov.br
                 </button>
                 <button disabled className="flex items-center justify-center gap-2 p-3 border border-slate-200 rounded text-slate-400 cursor-not-allowed text-xs transition-colors">
                    <GovIcon icon="simple-icons:microsoft" />
                    Outlook
                 </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 border-t border-slate-100">
             <div className="flex items-start gap-3 text-xs text-slate-500 leading-relaxed">
                <GovIcon icon="bi:info-circle" className="text-blue-500 mt-0.5 shrink-0" size={16} />
                <p>
                  Esta é uma ferramenta de pesquisa acadêmica para redução de burocracia.
                  Ao entrar, você concorda com a coleta de métricas de uso anônimas para o TCC.
                </p>
             </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-400 text-xs">
        &copy; 2026 Anti-Sludge Gov — Laboratório de Inovação em Gestão Pública
      </footer>
    </div>
  );
}

declare global {
  interface Window {
    google: any;
    google_initialized: boolean;
  }
}
