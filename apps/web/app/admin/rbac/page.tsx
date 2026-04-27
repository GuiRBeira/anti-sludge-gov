// apps/web/app/admin/rbac/page.tsx
"use client";

import React, { useState } from "react";
import {
  useRBACEmails,
  useCreateRBACMutation,
  useUpdateRBACMutation,
  useDeleteRBACMutation,
} from "@/features/rbac/api/useRBACQueries";

import {
  UserPlus,
  ShieldCheck,
  Search,
  Mail,
  Calendar,
  Trash2,
  Shield,
  ShieldAlert,
  User as UserIcon,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

// Componentes shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const roleConfig = {
  admin: {
    label: "Administrador",
    color: "destructive",
    bg: "bg-red-500/10",
    icon: ShieldCheck,
  },
  researcher: {
    label: "Pesquisador",
    color: "default",
    bg: "bg-blue-500/10",
    icon: Shield,
  },
  supervisor: {
    label: "Supervisor",
    color: "outline",
    bg: "bg-amber-500/10",
    icon: UserIcon,
  },
  visitor: {
    label: "Visitante",
    color: "secondary",
    bg: "bg-slate-500/10",
    icon: ShieldAlert,
  },
};

export default function RBACPage() {
  const { data: emails, isLoading } = useRBACEmails();
  const createMutation = useCreateRBACMutation();
  const updateMutation = useUpdateRBACMutation();
  const deleteMutation = useDeleteRBACMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("researcher");

  const filteredEmails = emails?.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync({ email: newEmail, role: newRole });
    setIsModalOpen(false);
    setNewEmail("");
  };

  const handleRoleChange = async (email: string, role: string) => {
    await updateMutation.mutateAsync({ email, role });
  };

  const handleDelete = async (email: string) => {
    if (confirm(`Tem certeza que deseja remover o acesso de ${email}?`)) {
      await deleteMutation.mutateAsync(email);
    }
  };

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

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger
            render={
              <Button
                size="lg"
                className="h-12 px-6 rounded-2xl font-bold gap-2 shadow-lg shadow-blue-500/20"
              >
                <UserPlus className="w-5 h-5" />
                Conceder Acesso
              </Button>
            }
          />
          <DialogContent className="sm:max-w-[425px] rounded-4xl p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black tracking-tighter uppercase">
                Conceder Acesso
              </DialogTitle>
              <DialogDescription className="text-slate-500 font-medium">
                Adicione um e-mail do Google para autorizar o acesso à
                plataforma.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  E-mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    required
                    type="email"
                    placeholder="exemplo@gmail.com"
                    className="pl-10 h-12 rounded-xl bg-slate-50 border-none font-medium focus-visible:ring-blue-500"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                  Papel / Nível
                </label>
                <Select
                  value={newRole}
                  onValueChange={(val) => val && setNewRole(val)}
                >
                  <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-none font-medium focus:ring-blue-500">
                    <SelectValue placeholder="Selecione um papel" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="researcher">Pesquisador</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                    <SelectItem value="visitor">Visitante</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl font-bold"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending
                    ? "Processando..."
                    : "Confirmar Acesso"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar por e-mail..."
              className="pl-11 h-12 rounded-2xl bg-slate-50 border-none font-medium focus-visible:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-8 h-14 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Usuário
                </TableHead>
                <TableHead className="px-8 h-14 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Nível de Acesso
                </TableHead>
                <TableHead className="px-8 h-14 text-xs font-black text-slate-400 uppercase tracking-widest">
                  Cadastro
                </TableHead>
                <TableHead className="px-8 h-14 text-xs font-black text-slate-400 uppercase tracking-widest text-right">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <TableRow key={i} className="animate-pulse">
                        <TableCell
                          colSpan={4}
                          className="h-24 px-8 bg-slate-50/20"
                        ></TableCell>
                      </TableRow>
                    ))
                  : filteredEmails?.map((item) => {
                      const config = roleConfig[item.role];
                      return (
                        <motion.tr
                          key={item.email}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="group border-b border-slate-50 hover:bg-slate-50/30 transition-colors"
                        >
                          <TableCell className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-black text-sm">
                                {item.email.charAt(0).toUpperCase()}
                              </div>
                              <div className="space-y-0.5">
                                <p className="font-bold text-slate-900 tracking-tight">
                                  {item.email}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="text-xs h-4 font-black uppercase tracking-widest border-slate-200 text-slate-400"
                                >
                                  Google OAuth 2.0
                                </Badge>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-8 py-6">
                            <Select
                              value={item.role}
                              onValueChange={(val) =>
                                val && handleRoleChange(item.email, val)
                              }
                            >
                              <SelectTrigger
                                className={`
                            h-10 w-[160px] rounded-xl text-xs font-black uppercase tracking-tighter
                            border-2 border-transparent transition-all
                            ${config.bg} ${config.color} hover:brightness-95 focus:ring-0
                          `}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                <SelectItem
                                  value="admin"
                                  className="text-xs font-bold text-red-600"
                                >
                                  Administrador
                                </SelectItem>
                                <SelectItem
                                  value="researcher"
                                  className="text-xs font-bold text-blue-600"
                                >
                                  Pesquisador
                                </SelectItem>
                                <SelectItem
                                  value="supervisor"
                                  className="text-xs font-bold text-amber-600"
                                >
                                  Supervisor
                                </SelectItem>
                                <SelectItem
                                  value="visitor"
                                  className="text-xs font-bold text-slate-500"
                                >
                                  Visitante
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="px-8 py-6">
                            <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {new Intl.DateTimeFormat("pt-BR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }).format(new Date(item.created_at))}
                            </div>
                          </TableCell>
                          <TableCell className="px-8 py-6 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(item.email)}
                              className="rounded-xl hover:bg-red-50 hover:text-red-600 text-slate-300 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      );
                    })}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
