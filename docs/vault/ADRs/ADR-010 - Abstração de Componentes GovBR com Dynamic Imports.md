# ADR-010: Abstração de Componentes GovBR com Dynamic Imports

**Status**: 🔵 Aceito
**Data**: 2026-04-19
**Decisores**: @GuiRBeira

## Contexto
A biblioteca oficial de componentes do governo brasileiro (`@govbr-ds/react-components`) possui dependências internas que acessam objetos globais do navegador (como `window` ou `document`) no momento da importação ou inicialização. Isso causa erros de "Hydration Mismatch" e falhas de compilação no Next.js (App Router), que tenta renderizar os componentes no lado do servidor (SSR).

## Opções Consideradas
- **Opção 1**: Modificar o código-fonte da biblioteca oficial (inviável por ser dependência externa).
- **Opção 2**: Usar apenas componentes HTML puros com CSS do GovBR (perda de funcionalidade dos componentes React).
- **Opção 3**: Criar uma camada de abstração usando `next/dynamic` com a opção `ssr: false`.

## Decisão Escolhida
**Opção 3**

### Justificativa Racional
1. **Compatibilidade SSR**: Ao desativar o SSR para os componentes do GovBR, garantimos que eles sejam carregados e renderizados apenas no lado do cliente, onde as APIs do navegador estão disponíveis.
2. **Encapsulamento**: A criação de componentes locais (ex: `GovButton.tsx`, `GovInput.tsx`) que envelopam os componentes dinâmicos permite que o restante da aplicação utilize os componentes de forma transparente, sem precisar lidar com a sintaxe de importação dinâmica em cada página.
3. **Estabilidade**: Evita erros de referência de objetos globais durante o build estático e a hidratação inicial do Next.js.

### Consequências
- **Positivas**: Interface 100% fiel ao padrão GOV.BR sem quebrar a arquitetura do Next.js; facilidade de manutenção centralizada dos componentes.
- **Negativas**: Pequeno atraso na renderização inicial dos componentes (visível apenas em conexões muito lentas), pois eles não fazem parte do HTML inicial enviado pelo servidor.

## Referências
- [Next.js Dynamic Imports with No SSR](https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#with-no-ssr)
- [Documentação Oficial do Padrão Digital de Governo (GovBR)](https://www.gov.br/ds)
