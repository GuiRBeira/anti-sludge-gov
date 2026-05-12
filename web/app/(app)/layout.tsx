import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionOrNull } from "@/lib/auth/session";
import { LogoutButton } from "@/components/logout-button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionOrNull();
  if (!session) redirect("/auth/login");

  const isAdmin = session.profile.papel_global === "admin";

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b">
          <Link href="/processos" className="font-semibold">
            Anti-Sludge Gov
          </Link>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1 text-sm">
          <NavLink href="/processos" label="Processos" />
          <NavLink href="/catalogo" label="Catálogo F5" />
          {isAdmin && (
            <>
              <div className="mt-4 mb-1 text-xs uppercase text-muted-foreground px-3">
                Administração
              </div>
              <NavLink href="/admin/orgaos" label="Órgãos" />
            </>
          )}
        </nav>
        <div className="p-3 border-t flex flex-col gap-2 text-xs">
          <div className="px-1">
            <div className="font-medium truncate">{session.profile.nome_completo ?? session.email}</div>
            <div className="text-muted-foreground">{session.profile.papel_global}</div>
          </div>
          <div className="flex items-center justify-between">
            <ThemeSwitcher />
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-6">{children}</div>
      </main>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-md hover:bg-muted transition-colors"
    >
      {label}
    </Link>
  );
}
