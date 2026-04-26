// apps/web/features/rbac/api/useRBACQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rbacService, CreateRBACEmailDTO } from "./rbacService";
import { toast } from "sonner";

export const rbacKeys = {
  all: ["rbac"] as const,
  lists: () => [...rbacKeys.all, "list"] as const,
};

export const useRBACEmails = () => {
  return useQuery({
    queryKey: rbacKeys.lists(),
    queryFn: () => rbacService.list(),
  });
};

export const useCreateRBACMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateRBACEmailDTO) => rbacService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rbacKeys.all });
      toast.success("Acesso concedido com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao conceder acesso.");
    },
  });
};

export const useUpdateRBACMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, role }: { email: string; role: string }) =>
      rbacService.update(email, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rbacKeys.all });
      toast.success("Papel atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao atualizar papel.");
    },
  });
};

export const useDeleteRBACMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email: string) => rbacService.delete(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: rbacKeys.all });
      toast.success("Acesso removido com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao remover acesso.");
    },
  });
};
