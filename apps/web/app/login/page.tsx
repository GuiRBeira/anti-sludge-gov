// apps/web/app/login/page.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  TrendingUp,
  Lock,
  Mail,
  Landmark,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    google: any;
  }
}

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const returnUrl = searchParams.get("returnUrl") || "/";
      router.push(returnUrl);
    }
  }, [user, router, searchParams]);

  const handleGoogleResponse = useCallback(
    async (response: any) => {
      try {
        await login(response.credential);
      } catch (err: any) {
        setError(
          err.response?.data?.detail || "Falha na autenticação com Google.",
        );
      }
    },
    [login],
  );

  useEffect(() => {
    // Inicia o script do Google One Tap / Login
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
          callback: handleGoogleResponse,
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-button"),
          {
            theme: "outline",
            size: "large",
            width: 320,
            text: "signin_with",
            shape: "pill",
            logo_alignment: "left",
          },
        );
      }
    };
  }, [handleGoogleResponse]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="rounded-[2.5rem] border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden bg-white/80 backdrop-blur-xl">
          <CardContent className="p-10">
            <div className="flex flex-col items-center text-center space-y-6 mb-10">
              <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.2em]">
                <TrendingUp size={14} />
                Analytics Framework
              </div>

              <div className="p-4 bg-slate-900 rounded-[2rem] text-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <Landmark size={48} strokeWidth={2.5} />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                  Anti-Sludge Gov
                </h1>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                  Gestão da Burocracia Invisível
                </p>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-start gap-3"
                >
                  <AlertCircle
                    className="text-destructive shrink-0 mt-0.5"
                    size={18}
                  />
                  <p className="text-xs font-bold text-destructive leading-relaxed uppercase tracking-tight">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-slate-500 text-sm font-medium leading-relaxed mb-8">
              Utilize sua conta institucional para acessar o painel de auditoria
              e monitoramento.
            </p>

            <div className="space-y-8 flex flex-col items-center">
              {/* Container para o botão oficial do Google */}
              <div
                id="google-button"
                className="w-full flex justify-center scale-110"
              ></div>

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase font-black tracking-widest">
                  <span className="bg-white px-4 text-slate-300">
                    Outros Acessos
                  </span>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  disabled
                  className="h-14 rounded-2xl gap-2 border-slate-100 grayscale opacity-40"
                >
                  <ShieldCheck size={16} className="text-slate-400" />
                  gov.br
                </Button>
                <Button
                  variant="outline"
                  disabled
                  className="h-14 rounded-2xl gap-2 border-slate-100 grayscale opacity-40"
                >
                  <Mail size={16} className="text-slate-400" />
                  Outlook
                </Button>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-300 uppercase tracking-widest">
                <Lock size={10} />
                Ambiente Seguro & Auditado
              </div>
              <div className="flex gap-3">
                <Badge
                  variant="outline"
                  className="border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-tighter h-5"
                >
                  MGI
                </Badge>
                <Badge
                  variant="outline"
                  className="border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-tighter h-5"
                >
                  UTFPR
                </Badge>
                <Badge
                  variant="outline"
                  className="border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-tighter h-5"
                >
                  MCTI
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center items-center gap-2">
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
            Não possui acesso?
          </p>
          <Button
            variant="link"
            className="text-xs font-black text-primary p-0 h-auto uppercase tracking-widest group"
          >
            Solicitar Credenciais
            <ArrowRight
              size={10}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
