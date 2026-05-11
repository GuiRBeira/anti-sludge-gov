import React, { useState } from "react";
import { Search, Calendar, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RoleSelect } from "./RoleSelect";
import {
  useUpdateRBACMutation,
  useDeleteRBACMutation,
} from "../api/useRBACQueries";

interface UserTableProps {
  emails: any[];
  isLoading: boolean;
}

export function UserTable({ emails, isLoading }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const updateMutation = useUpdateRBACMutation();
  const deleteMutation = useDeleteRBACMutation();

  const filteredEmails = emails?.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoleChange = async (email: string, role: string) => {
    await updateMutation.mutateAsync({ email, role });
  };

  const handleDelete = async (email: string) => {
    if (confirm(`Tem certeza que deseja remover o acesso de ${email}?`)) {
      await deleteMutation.mutateAsync(email);
    }
  };

  return (
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
                : filteredEmails?.map((item) => (
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
                        <RoleSelect
                          value={item.role}
                          onValueChange={(val) => handleRoleChange(item.email, val)}
                        />
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
                  ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
