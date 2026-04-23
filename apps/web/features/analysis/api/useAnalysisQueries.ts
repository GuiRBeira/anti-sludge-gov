// apps/web/features/analysis/api/useAnalysisQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { analysisService } from "./analysisService";
import { toast } from "sonner";

export const analysisKeys = {
  all: ["analysis"] as const,
  process: (id: number) => [...analysisKeys.all, "process", id] as const,
};

export const useProcessAnalysis = (processoId: number) => {
  return useQuery({
    queryKey: analysisKeys.process(processoId),
    queryFn: () => analysisService.getProcessChartData(processoId),
    enabled: !!processoId,
  });
};

export const useCalculateSludgeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (processoId: number) => analysisService.calculateSludge(processoId),
    onSuccess: (_, processoId) => {
      queryClient.invalidateQueries({ queryKey: analysisKeys.process(processoId) });
      toast.success("Análise recalculada com sucesso!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Erro ao calcular sludge.");
    },
  });
};
