"use client";

import React from "react";
import { useRBACEmails } from "@/features/rbac/api/useRBACQueries";
import { AddUserDialog } from "@/features/rbac/components/AddUserDialog";
import { UserTable } from "@/features/rbac/components/UserTable";

export default function RBACPage() {
  const { data: emails, isLoading } = useRBACEmails();

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
            Gestão de Acessos
          </h1>
          <p className="text-slate-500 font-medium max-w-xl">
            Painel administrativo para controle de permissões e autorização de
            e-mails via Google Auth.
          </p>
        </div>

        <AddUserDialog />
      </div>

      {/* Main Table Card */}
      <UserTable emails={emails || []} isLoading={isLoading} />
    </div>
  );
}
