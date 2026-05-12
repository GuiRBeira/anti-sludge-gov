import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionOrNull } from "@/lib/auth/session";
import { LogoutButton } from "@/components/logout-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AppNav } from "@/components/app-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionOrNull();
  if (!session) redirect("/auth/login");

  const isAdmin = session.profile.papel_global === "admin";

  return (
    <div className="paper-grain flex min-h-screen bg-background">
      <aside className="relative z-10 hidden w-64 shrink-0 flex-col border-r bg-card/95 md:flex">
        <div className="flex items-center gap-3 border-b p-4">
          <Link
            href="/processos"
            className="grid h-9 w-9 place-items-center rounded-md bg-primary font-display text-xl text-primary-foreground shadow-sm"
            style={{ transform: "rotate(-3deg)" }}
            aria-label="Anti-Sludge Gov"
          >
            F5
          </Link>
          <div className="min-w-0 leading-tight">
            <div className="font-hand text-xl leading-none">Anti-Sludge</div>
            <div className="truncate font-mono text-[10px] uppercase text-muted-foreground">
              FCINCO MGI
            </div>
          </div>
        </div>
        <AppNav isAdmin={isAdmin} />
        <div className="p-3 border-t flex flex-col gap-2 text-xs">
          <div className="flex items-center gap-2 rounded-md bg-muted/60 px-2 py-2">
            <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent font-mono text-xs font-semibold text-accent-foreground">
              {(session.profile.nome_completo ?? session.email).slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium">
                {session.profile.nome_completo ?? session.email}
              </div>
              <div className="text-muted-foreground">{session.profile.papel_global}</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ThemeSwitcher />
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="relative z-10 flex-1 overflow-auto">
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b bg-card/95 px-4 py-3 md:hidden">
          <Link
            href="/processos"
            className="grid h-8 w-8 place-items-center rounded-md bg-primary font-display text-lg text-primary-foreground"
            style={{ transform: "rotate(-3deg)" }}
            aria-label="Anti-Sludge Gov"
          >
            F5
          </Link>
          <Link href="/processos" className="text-sm font-medium">
            Processos
          </Link>
          <Link href="/catalogo" className="text-sm text-muted-foreground">
            Catálogo
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <ThemeSwitcher />
            <LogoutButton />
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
