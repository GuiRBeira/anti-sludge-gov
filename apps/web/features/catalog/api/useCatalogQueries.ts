// apps/web/features/catalog/api/useCatalogQueries.ts
import { useQuery } from "@tanstack/react-query";
import { catalogService } from "./catalogService";

export const catalogKeys = {
  all: ["catalog"] as const,
  categorias: () => [...catalogKeys.all, "categorias"] as const,
  tiposComportamento: () => [...catalogKeys.all, "tiposComportamento"] as const,
};

export const useCategorias = () => {
  return useQuery({
    queryKey: catalogKeys.categorias(),
    queryFn: () => catalogService.getCategorias(),
  });
};

export const useTiposComportamento = () => {
  return useQuery({
    queryKey: catalogKeys.tiposComportamento(),
    queryFn: () => catalogService.getTiposComportamento(),
  });
};
