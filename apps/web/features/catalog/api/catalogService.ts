// apps/web/features/catalog/api/catalogService.ts
import { apiFetch } from "@/lib/api-client";

export interface Categoria {
  id: number;
  nome: string;
  descricao?: string;
}

export interface TipoComportamento {
  id: number;
  categoria_id: number;
  nome: string;
  codigo_referencia: string;
}

export const catalogService = {
  async getCategorias(): Promise<Categoria[]> {
    return apiFetch<Categoria[]>("/categorias");
  },
  async getTiposComportamento(): Promise<TipoComportamento[]> {
    return apiFetch<TipoComportamento[]>("/tipos-comportamento");
  },
};
