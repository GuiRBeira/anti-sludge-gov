// apps/web/features/auth/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { User } from "../api/authService";
import { useUser, useLoginMutation, useLogoutMutation } from "../api/useAuthQueries";

interface AuthContextType {
  user: User | null;
  login: (googleToken: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApprove: boolean;
  isReadOnly: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useUser();
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const login = async (googleToken: string) => {
    await loginMutation.mutateAsync(googleToken);
  };

  const logout = () => {
    logoutMutation.mutate();
    localStorage.removeItem("auth_user");
  };

  const isAdmin = user?.role === "admin";
  const canEdit = user?.role === "admin" || user?.role === "researcher";
  const canDelete = user?.role === "admin";
  const canApprove = user?.role === "admin" || user?.role === "supervisor";
  const isReadOnly = user?.role === "supervisor" || user?.role === "visitor";

  return (
    <AuthContext.Provider value={{
      user: user ?? null,
      login,
      logout,
      isLoading,
      isAdmin,
      canEdit,
      canDelete,
      canApprove,
      isReadOnly
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
