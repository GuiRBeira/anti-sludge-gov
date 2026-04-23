"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name?: string;
  picture?: string;
  role: "admin" | "analyst" | "visitor";
}

interface AuthContextType {
  user: User | null;
  login: (googleToken: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restaurar sessão verificando o cookie via /me
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Se falhar, limpa o estado (o cookie pode ter expirado)
          setUser(null);
          localStorage.removeItem("auth_user");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (googleToken: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: googleToken }),
        credentials: "include", // Importante para receber o cookie
      });

      if (!response.ok) throw new Error("Falha na autenticação");

      const data = await response.json();
      // O token agora está no cookie HttpOnly, não salvamos no localStorage
      setUser(data.user);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("auth_user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
