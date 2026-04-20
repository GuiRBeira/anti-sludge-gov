# 🛠️ Referência de Endpoints (Backend)

Este documento detalha os principais grupos de endpoints da API e como as decisões de arquitetura moldaram sua implementação.

## Grupos de Endpoints

### 1. Autenticação (`/auth`)
Gerencia o ciclo de vida da sessão do Dashboard.
- `POST /google`: Recebe ID Token e emite JWT.
- **Impacto ADR**: [[ADR-007]] - Decisão de ser Stateless e usar OIDC do Google.

### 2. Gestão de Processos (`/processos`)
CRUD e lógica de negócio dos serviços públicos analisados.
- `GET /`: Lista processos com filtros.
- `POST /`: Cria novo processo (Admin only).
- **Impacto ADR**: [[ADR-009]] - Restrição de acesso baseada nos grupos de e-mail.

### 3. Coleta da Extensão (`/sessoes-extensao`)
O "Inbound" de dados de telemetria das cobaias.
- `POST /`: Recebe eventos de clique e tempo.
- **Impacto ADR**: [[ADR-008]] (Identificação por Device ID) e [[ADR-009]] (Autenticação por `X-API-KEY` para evitar login na extensão).

### 4. Dashboards e Métricas (`/dashboard`)
Endpoints de agregação de dados para o Frontend.
- `GET /summary`: Consolida métricas de atrito.
- **Impacto ADR**: Baseia-se no cruzamento de dados da [[ADR-004]] (Etapas oficiais) com a telemetria.

---

## Padrões de Implementação

### Segurança (Middleware)
- **JWT Middleware**: Protege rotas administrativas verificando o token emitido na [[ADR-007]].
- **Role Guard**: Verifica se o e-mail do usuário logado pertence aos grupos definidos na [[ADR-009]].

### Serialização
- Os dados são transmitidos em **JSON**.
- Conversão automática entre `snake_case` (Backend) e `camelCase` (Frontend).
