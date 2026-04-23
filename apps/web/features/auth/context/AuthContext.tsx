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

  return (
    <AuthContext.Provider value={{ 
      user: user ?? null, 
      login, 
      logout, 
      isLoading 
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
