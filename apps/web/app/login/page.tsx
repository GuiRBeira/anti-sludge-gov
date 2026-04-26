// apps/web/app/login/page.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";
import { GovIcon } from "@/components/gov/GovIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Info } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header Estilo GOV.BR */}
      <header className="bg-primary text-primary-foreground py-6 px-8 shadow-xl shadow-primary/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-1.5 rounded-xl">
                <ShieldCheck className="text-primary w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase">anti-sludge.gov</span>
          </div>
          <Badge variant="secondary" className="hidden md:flex font-black uppercase tracking-widest text-[10px] px-3 py-1">
            Plataforma de Auditoria v1.0
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 w-full max-w-md overflow-hidden flex flex-col border border-slate-100">
          <div className="p-10">
            <div className="flex justify-center mb-8">
                <div className="p-5 bg-slate-50 rounded-[2rem] text-primary">
                    <GovIcon icon="ri:government-line" className="text-5xl" />
                </div>
            </div>

            <h1 className="text-3xl font-black text-center text-slate-900 mb-2 tracking-tighter uppercase">
              Identificação
            </h1>
            <p className="text-center text-slate-500 mb-10 font-medium">
              Acesse o dashboard utilizando sua conta Google autorizada pelo MGI.
            </p>

            <div className="space-y-8 flex flex-col items-center">
              {/* Container para o botão oficial do Google */}
              <div id="google-button" className="w-full flex justify-center"></div>

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100"></span>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                  <span className="bg-white px-4 text-slate-300">Outros Acessos</span>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                 <Button variant="outline" disabled className="h-14 rounded-2xl gap-2 border-slate-100 grayscale opacity-40">
                    <GovIcon icon="simple-icons:icloud" className="w-4 h-4" />
                    gov.br
                 </Button>
                 <Button variant="outline" disabled className="h-14 rounded-2xl gap-2 border-slate-100 grayscale opacity-40">
                    <GovIcon icon="simple-icons:microsoft" className="w-4 h-4" />
                    Outlook
                 </Button>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/50 p-8 border-t border-slate-50">
             <div className="flex items-start gap-4">
                <div className="mt-1 p-1 bg-blue-100 rounded-lg text-blue-600">
                    <Info className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Esta ferramenta faz parte de uma pesquisa acadêmica para redução de burocracia governamental.
                  O acesso é restrito a pesquisadores e servidores autorizados.
                </p>
             </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
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
