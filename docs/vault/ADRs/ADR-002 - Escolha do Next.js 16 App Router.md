# ADR-002: Escolha do Next.js 16 App Router

**Status**: 🔵 Aceito
**Data**: 2026-03-20 (Retroativo)
**Decisores**: @GuiRBeira

## Contexto
Para o desenvolvimento da interface web do Anti-Sludge, era necessário escolher um framework que oferecesse excelente performance, suporte nativo a TypeScript, e uma experiência de desenvolvimento moderna. Como o projeto lida com dados que devem ser indexáveis (SEO) e exige uma interface rica e responsiva, a escolha do framework de frontend é crítica.

## Opções Consideradas
- **Opção 1**: React Puro (Vite/SPA).
- **Opção 2**: Next.js (Pages Router).
- **Opção 3**: **Next.js 16 (App Router)**.

## Decisão Escolhida
**Opção 3: Next.js 16 (App Router)**

### Justificativa Racional
O Next.js 16 com o novo paradigmask de **App Router** foi escolhido por diversos fatores técnicos superiores:
1. **Server Components**: Permite que grande parte da lógica da dashboard seja renderizada no servidor, reduzindo o bundle de JavaScript enviado ao cliente e melhorando o tempo de carregamento inicial.
2. **Streaming & Suspense**: Essencial para carregar gráficos pesados e listas de processos do governo de forma assíncrona sem bloquear a renderização da página.
3. **Turbopack**: O uso da versão 16 traz o compilador Turbo por padrão, o que acelera drasticamente os tempos de hot-reload durante o desenvolvimento.
4. **React 19 Native Support**: Garante compatibilidade total com as novas APIs do React, como `useLayoutEffect` otimizado e melhorias no tratamento de formulários.

### Estratégia de Implementação
- Estrutura de pastas baseada em `app/` para roteamento.
- Uso de `layout.tsx` para persistência de componentes globais (Header/Sidebar).
- Integração nativa com o sistema de design DSGOV.
- Implementação de Server Actions para interações com a API backend (FastAPI).

### Consequências
- **Positivas**: SEO superior, carregamentos extremamente rápidos, tipagem de rotas integrada e facilidade em lidar com estados de carregamento (loading.tsx).
- **Negativas**: Curva de aprendizado maior em relação ao paradigma tradicional de SPAs; necessidade de maior atenção ao separar Client Components (`'use client'`) de Server Components.

## Referências
- [Next.js Documentation - App Router](https://nextjs.org/docs/app)
- [React 19 Beta Release Notes](https://react.dev/blog/2024/04/25/react-19)
- [Next.js 16 Features and Performance](https://nextjs.org/blog/next-15) (Nota: Referência à versão estável mais recente na época da decisão).
