import { redirect } from "next/navigation";
import Link from "next/link";
import { hasEnvVars } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { EnvVarWarning } from "@/components/env-var-warning";

export default async function Home() {
  if (!hasEnvVars) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-2xl font-semibold">Anti-Sludge Gov</h1>
        <EnvVarWarning />
      </main>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/processos");

  return (
    <main className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 h-14 text-sm">
          <span className="font-semibold">Anti-Sludge Gov</span>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Link href="/auth/login">
              <Button size="sm" variant="outline">Entrar</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button size="sm">Criar conta</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="flex-1 max-w-3xl mx-auto px-5 py-16 flex flex-col gap-6">
        <h1 className="text-4xl font-bold leading-tight">
          Diagnóstico de barreiras em serviços públicos digitais
        </h1>
        <p className="text-muted-foreground text-lg">
          Ferramenta da equipe FCINCO/MGI para aplicar a metodologia F5
          Anti-Sludge: mapear jornadas, observar usuários, dimensionar
          barreiras e impactos, e gerar gráficos rastreáveis.
        </p>
        <div className="flex gap-3">
          <Link href="/auth/login">
            <Button>Entrar para começar</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
