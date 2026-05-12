"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SketchFrame } from "@/components/fcinco/sketch-frame";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      // The url which will be included in the email. This URL needs to be configured in your redirect URLs in the Supabase dashboard at https://supabase.com/dashboard/project/_/auth/url-configuration
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {success ? (
        <Card className="relative overflow-hidden rounded-lg">
          <WatercolorSplatter
            className="absolute -right-16 -top-24"
            size={180}
            opacity={0.3}
            seed={93}
          />
          <CardHeader className="relative">
            <CardTitle className="text-2xl">Verifique seu email</CardTitle>
            <CardDescription>Instruções de redefinição enviadas</CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <p className="text-sm text-muted-foreground">
              Se este email estiver cadastrado, você receberá um link para
              redefinir sua senha.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="relative overflow-hidden rounded-lg">
          <WatercolorSplatter
            className="absolute -right-16 -top-24"
            size={180}
            opacity={0.3}
            seed={94}
          />
          <CardHeader className="relative">
            <CardTitle>
              <SketchFrame seed={94} padX={18} padY={8}>
                <span className="font-hand text-4xl leading-tight">Recuperar</span>
              </SketchFrame>
            </CardTitle>
            <CardDescription>
              Informe seu email para receber um link de redefinição de senha.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <form onSubmit={handleForgotPassword}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar link"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Lembrou sua senha?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Entrar
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
