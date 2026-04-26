// apps/web/features/rbac/api/rbacService.ts
import { apiFetch } from "@/lib/api-client";

export interface RBACEmail {
  email: string;
  role: "admin" | "researcher" | "supervisor" | "visitor";
  created_at: string;
  updated_at: string;
}

export interface CreateRBACEmailDTO {
  email: string;
  role: string;
}

export const rbacService = {
  async list(): Promise<RBACEmail[]> {
    return apiFetch<RBACEmail[]>("/rbac");
  },

  async create(data: CreateRBACEmailDTO): Promise<RBACEmail> {
    return apiFetch<RBACEmail>("/rbac", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(email: string, role: string): Promise<RBACEmail> {
    return apiFetch<RBACEmail>(`/rbac/${email}`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  },

  async delete(email: string): Promise<void> {
    return apiFetch<void>(`/rbac/${email}`, {
      method: "DELETE",
    });
  },
};
