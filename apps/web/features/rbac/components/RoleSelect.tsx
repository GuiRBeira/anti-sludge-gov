import React from "react";
import { ShieldCheck, Shield, User as UserIcon, ShieldAlert } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const roleConfig = {
  admin: {
    label: "Administrador",
    color: "text-red-600",
    bg: "bg-red-500/10",
    icon: ShieldCheck,
  },
  researcher: {
    label: "Pesquisador",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    icon: Shield,
  },
  supervisor: {
    label: "Supervisor",
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    icon: UserIcon,
  },
  visitor: {
    label: "Visitante",
    color: "text-slate-500",
    bg: "bg-slate-500/10",
    icon: ShieldAlert,
  },
};

interface RoleSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
}

export function RoleSelect({ value, onValueChange, disabled }: RoleSelectProps) {
  const config = roleConfig[value as keyof typeof roleConfig] || roleConfig.visitor;

  return (
    <Select 
      value={value} 
      onValueChange={(val) => val && onValueChange(val)} 
      disabled={disabled}
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
        <SelectItem value="admin" className="text-xs font-bold text-red-600">
          Administrador
        </SelectItem>
        <SelectItem value="researcher" className="text-xs font-bold text-blue-600">
          Pesquisador
        </SelectItem>
        <SelectItem value="supervisor" className="text-xs font-bold text-amber-600">
          Supervisor
        </SelectItem>
        <SelectItem value="visitor" className="text-xs font-bold text-slate-500">
          Visitante
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
