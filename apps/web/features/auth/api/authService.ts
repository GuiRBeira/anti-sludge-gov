// apps/web/features/auth/api/authService.ts
import { apiFetch } from "@/lib/api-client";

export interface User {
  email: string;
  name: string;
  picture?: string;
  role: "admin" | "researcher" | "supervisor" | "visitor";
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export const authService = {
  async loginWithGoogle(token: string): Promise<AuthResponse> {
    return apiFetch<AuthResponse>("/auth/google", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  },

  async getMe(): Promise<User> {
    return apiFetch<User>("/auth/me");
  },

  async logout(): Promise<void> {
    return apiFetch<void>("/auth/logout", {
      method: "POST",
    });
  },
};
