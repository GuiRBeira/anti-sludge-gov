import React, { useState } from "react";
import { UserPlus, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RoleSelect } from "./RoleSelect";
import { useCreateRBACMutation } from "../api/useRBACQueries";

export function AddUserDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("researcher");
  const createMutation = useCreateRBACMutation();

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMutation.mutateAsync({ email: newEmail, role: newRole });
      setIsOpen(false);
      setNewEmail("");
    } catch (err) {
      // Erro tratado no mutation/toast
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            Adicione um e-mail do Google para autorizar o acesso à plataforma.
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
            <RoleSelect value={newRole} onValueChange={setNewRole} />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 rounded-xl font-bold"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Processando..." : "Confirmar Acesso"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
