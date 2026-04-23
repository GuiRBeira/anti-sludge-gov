// apps/web/features/processes/api/useProcessQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { processService, CreateProcessoDTO } from "./processService";
import { toast } from "sonner";

export const processKeys = {
  all: ["processes"] as const,
  lists: () => [...processKeys.all, "list"] as const,
  details: () => [...processKeys.all, "detail"] as const,
  detail: (id: number) => [...processKeys.details(), id] as const,
  summary: () => [...processKeys.all, "summary"] as const,
};

export const useProcesses = () => {
  return useQuery({
    queryKey: processKeys.lists(),
    queryFn: () => processService.list(),
  });
};

export const useProcessSummary = () => {
  return useQuery({
    queryKey: processKeys.summary(),
    queryFn: () => processService.getDashboardSummary(),
  });
};

export const useProcessDetail = (id: number) => {
  return useQuery({
    queryKey: processKeys.detail(id),
    queryFn: () => processService.getById(id),
    enabled: !!id,
  });
};

export const useCreateProcessMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProcessoDTO) => processService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: processKeys.all });
      toast.success("Processo criado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao criar processo.");
    },
  });
};

export const useUpdateProcessMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateProcessoDTO> }) =>
      processService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: processKeys.all });
      queryClient.invalidateQueries({ queryKey: processKeys.detail(id) });
      toast.success("Processo atualizado com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao atualizar processo.");
    },
  });
};

export const useDeleteProcessMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => processService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: processKeys.all });
      toast.success("Processo excluído com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao excluir processo.");
    },
  });
};
