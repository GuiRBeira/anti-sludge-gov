// apps/web/features/processes/api/extensionService.ts
import { apiFetch } from "@/lib/api-client";
import { SessaoExtensao } from "./extensionSchemas";

export const extensionService = {
  listByProcess: async (processId: number): Promise<SessaoExtensao[]> => {
    return apiFetch<SessaoExtensao[]>(`/sessoes-extensao?processo_id=${processId}`);
  },

  getDetail: async (sessionId: number): Promise<any> => {
    return apiFetch<any>(`/sessoes-extensao/${sessionId}`);
  }
};
