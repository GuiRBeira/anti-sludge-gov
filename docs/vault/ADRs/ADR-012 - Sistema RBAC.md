# ADR 001: Implementação de Role-Based Access Control (RBAC)

## Status
Aceito (Abril 2026)

## Contexto
O Anti-Sludge Gov precisava de uma forma segura de restringir ações administrativas (Criar/Editar/Excluir processos e etapas) de acordo com o nível de privilégio do usuário. A audiência do sistema inclui desde pesquisadores (que preenchem dados) até supervisores (que apenas visualizam métricas).

## Decisão
Implementamos um sistema de RBAC baseado em listas brancas (Whitelists) de e-mails, gerenciadas por variáveis de ambiente no Backend.

### Níveis de Acesso:
1.  **ADMIN**: Poder total sobre o sistema e gerenciamento de configurações.
2.  **RESEARCHER**: Pode criar e editar processos, etapas e avaliações.
3.  **SUPERVISOR**: Pode visualizar dashboards e detalhes de processos, mas não pode realizar mutações.
4.  **VISITOR/VISITANTE**: Acesso básico ou redirecionamento para página pública.

### Fluxo Técnico:
- **Backend**: O `core/auth.py` injeta o campo `role` no token JWT e na sessão do usuário.
- **Frontend**: O `AuthContext` expõe helpers como `canEdit` e `isAdmin` para renderização condicional de componentes UI (botões, menus).

## Consequências
- **Positivas**: Segurança granular, facilidade de auditoria e UX personalizada para cada cargo.
- **Negativas**: A gestão via variáveis de ambiente é manual; no futuro, precisaremos de um CRUD de usuários para o Admin.
