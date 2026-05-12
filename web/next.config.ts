import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components (Next 16) está desligado: praticamente todas as
  // páginas autenticadas dependem da sessão do usuário e do RLS do Supabase,
  // então renderizamos sob demanda. Voltar a ligar quando tivermos páginas
  // públicas estáticas e quisermos otimizá-las.
  cacheComponents: false,
};

export default nextConfig;
