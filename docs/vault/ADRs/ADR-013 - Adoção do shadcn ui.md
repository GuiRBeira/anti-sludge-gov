# ADR 013: Adoção do shadcn/ui para Componentes de Interface

## Status
Aceito

## Data
2026-04-26

## Contexto
O Frontend do projeto (Next.js) utiliza Tailwind CSS para estilização e Framer Motion para animações. Atualmente, componentes complexos (como tabelas, modais e seletores) são construídos manualmente ou utilizando componentes atômicos do governo que possuem limitações de interatividade e acessibilidade. 

A necessidade de entregar uma interface "Premium" e altamente funcional para a auditoria de sludge exige componentes que sigam as melhores práticas de acessibilidade (WAI-ARIA) e que sejam facilmente customizáveis.

## Decisão
Decidimos adotar o **shadcn/ui** como a biblioteca base de componentes de interface.

O shadcn/ui não é uma biblioteca de dependências tradicional, mas sim uma coleção de componentes reutilizáveis construídos sobre o **Radix UI** (headless) e estilizados com **Tailwind CSS**. Os componentes são adicionados diretamente ao código-fonte do projeto via CLI.

## Consequências
- **Positivas**:
  - Aceleração drástica no desenvolvimento de telas complexas.
  - Garantia de acessibilidade nativa em componentes críticos (Modais, Dropdowns, Tabs).
  - Controle total sobre o código-fonte dos componentes, permitindo ajustes finos para a identidade visual "Gov Premium".
  - Padronização estética em toda a aplicação.
- **Negativas/Riscos**:
  - Introduz uma leve curva de aprendizado sobre o funcionamento dos componentes baseados em Radix.
  - Necessidade de refatoração de componentes legados para manter a consistência visual.

## Plano de Refatoração Gradual (Frontend)
Como o projeto já possui várias telas funcionais, a migração não será feita de uma só vez. Segue a ordem de prioridade para os refactors:

1.  **Fundação (Tokens)**: Configurar as cores e variáveis do shadcn para darem match com o nosso tema Azul GOV/Slate.
2.  **Overlays**: Substituir os Modais manuais e animações de diálogo pelo componente `Dialog` e `Sheet` do shadcn (ex: modal de RBAC).
3.  **Inputs & Forms**: Migrar botões, inputs de texto e seletores para os componentes padronizados do shadcn.
4.  **Data Display**: Refatorar as tabelas de Processos e Gestão de RBAC usando o componente `Table` (e futuramente `DataTable`).
5.  **Navegação**: Integrar `DropdownMenu` para o perfil do usuário e menus contextuais.
6.  **Feedback**: Padronizar Toasts e Alertas.

## Referências
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
