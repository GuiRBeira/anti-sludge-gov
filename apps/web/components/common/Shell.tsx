// apps/web/components/common/Shell.tsx
"use client";

import React, { useEffect } from "react";
import { Header } from "./Header";
import { AppSidebar } from "../app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Footer } from "./Footer";

import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user && pathname !== "/login") {
      router.push("/login");
    }

    if (user?.role === "visitor" && pathname !== "/unauthorized") {
      router.push("/unauthorized");
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading || (!user && pathname !== "/login")) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (pathname === "/login" || pathname === "/unauthorized") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-slate-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
          <Footer />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
