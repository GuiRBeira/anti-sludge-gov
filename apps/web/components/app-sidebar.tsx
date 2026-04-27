"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  History,
  Settings,
  HelpCircle,
  ShieldAlert,
  Users,
  LogOut,
  ChevronUp,
} from "lucide-react";

import icon from "@/assets/icon.png";
import { useAuth } from "@/features/auth/context/AuthContext";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Processos", href: "/processos", icon: FileText },
  { label: "Alertas Críticos", href: "/alertas", icon: ShieldAlert },
  { label: "Análise", href: "/analise", icon: BarChart2 },
  { label: "Histórico", href: "/historico", icon: History },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, isAdmin, logout } = useAuth();

  const secondaryItems = [
    ...(isAdmin
      ? [
          { label: "Gestão de Acessos", href: "/admin/rbac", icon: Users },
          { label: "Configurações", href: "/settings", icon: Settings },
        ]
      : []),
    { label: "Ajuda", href: "/ajuda", icon: HelpCircle },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200">
      <SidebarHeader className="p-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={(props) => <Link href="/" {...props} />}
              className="hover:bg-slate-100 transition-colors data-[state=collapsed]:justify-center px-0"
            >
              <div className="flex items-center gap-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:w-auto py-1">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-slate-900 text-white shrink-0">
                  <Image
                    src={icon}
                    alt="Logo"
                    width={24}
                    height={24}
                    className="object-contain brightness-0 invert"
                  />
                </div>
                <div className="flex flex-col gap-0 leading-none group-data-[collapsible=icon]:hidden">
                  <span className="text-lg font-black text-slate-900 tracking-tight">Anti-Sludge</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">MGI / CINCO</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="pt-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold text-slate-400 uppercase tracking-widest px-4 group-data-[collapsible=icon]:hidden">Plataforma</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pt-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={(props) => <Link href={item.href} {...props} />}
                      isActive={isActive}
                      tooltip={item.label}
                      className={cn(
                        "rounded-md px-0 transition-colors",
                        isActive
                          ? "bg-slate-100 text-slate-900 font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex size-5 items-center justify-center shrink-0">
                        <item.icon className={cn("size-full", isActive ? "text-slate-900" : "text-slate-400")} />
                      </div>
                      <span className="text-sm font-bold group-data-[collapsible=icon]:hidden">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-lg font-bold text-slate-400 uppercase tracking-widest py-6 justify-center group-data-[collapsible=icon]:hidden">Administração</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="p-0">
              {secondaryItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={(props) => <Link href={item.href} {...props} />}
                      isActive={isActive}
                      tooltip={item.label}
                      className={cn(
                        "rounded-md px-0 transition-colors",
                        isActive
                          ? "bg-slate-100 text-slate-900 font-semibold"
                          : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      <div className="flex size-5 items-center justify-center shrink-0">
                        <item.icon className="size-full" />
                      </div>
                      <span className="text-sm font-bold group-data-[collapsible=icon]:hidden">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-0 py-4 border-t border-slate-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={(props) => (
                <SidebarMenuButton
                  {...props}
                  size="lg"
                  className="data-[state=collapsed]:justify-center data-[state=open]:bg-slate-100 rounded-lg transition-colors px-0"
                >
                  <div className="flex items-center gap-3 w-full group-data-[collapsible=icon]:w-auto overflow-hidden group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:justify-center py-1">
                    {user?.picture ? (
                      <Image
                        src={user.picture}
                        alt={user.name}
                        width={36}
                        height={36}
                        className="size-9 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="size-9 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-sm shrink-0">
                        {user?.name?.charAt(0)}
                      </div>
                    )}
                    <div className="flex flex-col items-start gap-0 leading-none min-w-0 overflow-hidden text-left group-data-[collapsible=icon]:hidden">
                      <span className="text-sm font-bold text-slate-900 truncate w-full">
                        {user?.name}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate w-full font-bold">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                  <ChevronUp className="ml-auto size-4 text-slate-400 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              )} />
              <DropdownMenuContent
                side="top"
                align="start"
                className="w-(--radix-dropdown-menu-trigger-width) rounded-xl p-1 shadow-lg border-slate-100"
              >
                <DropdownMenuItem className="rounded-lg focus:bg-slate-50 cursor-pointer">
                  <Settings className="mr-2 size-4" />
                  <span className="text-xs font-medium">Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="rounded-lg focus:bg-red-50 focus:text-red-600 text-slate-600 cursor-pointer"
                >
                  <LogOut className="mr-2 size-4" />
                  <span className="text-xs font-medium">Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
