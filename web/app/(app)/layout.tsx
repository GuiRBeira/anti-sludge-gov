import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionOrNull } from "@/lib/auth/session";
import { LogoutButton } from "@/components/logout-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { AppNav } from "@/components/app-nav";
import { ProductTour } from "@/components/onboarding/product-tour";
import { GovBrHeader } from "@/components/govbr/header";
import { GovBrFooter } from "@/components/govbr/footer";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionOrNull();
  if (!session) redirect("/auth/login");

  const isAdmin = session.profile.papel_global === "admin";
  const canManageTeam =
    isAdmin || session.profile.papel_global === "gestor";
  const displayName = session.profile.nome_completo ?? session.email;
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Skip-to-content link (WCAG 2.4.1 — Bypass Blocks).
          Invisível até receber foco por teclado, aí aparece no canto
          superior esquerdo. */}
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Ir direto para o conteúdo
      </a>
      <GovBrHeader
        right={
          <div className="flex items-center gap-2">
            <div
              className="hidden items-center gap-2 rounded-md bg-muted/60 px-2 py-1 sm:flex"
              title={displayName}
            >
              <div className="grid h-6 w-6 place-items-center rounded-full bg-accent font-mono text-[10px] font-semibold text-accent-foreground">
                {initials}
              </div>
              <span className="max-w-[140px] truncate text-[12px]">
                {displayName}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                {session.profile.papel_global}
              </span>
            </div>
            <ThemeSwitcher />
            <LogoutButton />
          </div>
        }
      />

      <div className="paper-grain flex flex-1">
        <aside className="relative z-10 hidden w-64 shrink-0 flex-col border-r bg-card/95 md:flex">
          <AppNav role={session.profile.papel_global} canManageTeam={canManageTeam} />
        </aside>

        <main
          id="conteudo-principal"
          tabIndex={-1}
          className="relative z-10 flex-1 overflow-auto focus:outline-none"
        >
          {/* Mobile sub-header (sidebar é hidden md:flex) */}
          <div className="sticky top-0 z-20 flex items-center gap-3 border-b bg-card/95 px-4 py-3 md:hidden">
            <Link href="/processos" className="text-sm font-medium">
              Processos
            </Link>
            <Link href="/catalogo" className="text-sm text-muted-foreground">
              Catálogo
            </Link>
            {canManageTeam && (
              <Link href="/admin/usuarios" className="text-sm text-muted-foreground">
                Equipe
              </Link>
            )}
          </div>
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      <GovBrFooter />

      <ProductTour
        role={session.profile.papel_global}
        userId={session.userId}
        userName={displayName}
        canManageTeam={canManageTeam}
      />
    </div>
  );
}
