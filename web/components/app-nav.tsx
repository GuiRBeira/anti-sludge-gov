"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Building2, FileStack, LibraryBig, UsersRound } from "lucide-react";

const baseItems = [
  { href: "/processos", label: "Processos", icon: FileStack },
  { href: "/catalogo", label: "Catálogo F5", icon: LibraryBig },
];

const adminItems = [
  { href: "/admin/orgaos", label: "Órgãos", icon: Building2 },
  { href: "/admin/usuarios", label: "Usuários", icon: UsersRound },
];

export function AppNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const items = isAdmin ? [...baseItems, ...adminItems] : baseItems;

  return (
    <nav className="flex flex-1 flex-col gap-1 p-3 text-sm">
      {items.map((item, index) => {
        const Icon = item.icon;
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const showAdminLabel = isAdmin && index === baseItems.length;

        return (
          <div key={item.href}>
            {showAdminLabel && (
              <div className="mb-1 mt-4 px-3 font-mono text-[11px] uppercase text-muted-foreground">
                Administração
              </div>
            )}
            <Link
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-md px-3 py-2 transition-colors ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="app-nav-active"
                  className="absolute inset-0 rounded-md bg-muted"
                  transition={{ type: "spring", stiffness: 420, damping: 32 }}
                />
              )}
              <Icon className="relative h-4 w-4" />
              <span className="relative">{item.label}</span>
              {active && (
                <motion.span
                  className="relative ml-auto h-4 w-1 rounded-full bg-primary"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.18 }}
                />
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
