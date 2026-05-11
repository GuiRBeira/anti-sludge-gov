# 🏗️ Arquitetura do Sistema

Este documento descreve a organização técnica e o fluxo de dados do projeto Anti-Sludge Gov.

## 1. Visão Geral da Arquitetura

O sistema segue uma arquitetura de **Monorepo** com uma API centralizada que serve a dois clientes distintos com propósitos diferentes: coleta de dados (Extensão) e análise/gestão (Web).

```mermaid
graph TD
    subgraph "Frontend Layer"
        Web["<b>Dashboard Web</b><br/>Next.js + GovBR DS"]
        Ext["<b>Extensão Browser</b><br/>Plasmo + React"]
    end

    subgraph "Backend Layer (FastAPI)"
        API["<b>Central API</b>"]
        Auth["<b>Auth Module</b><br/>(Google OIDC + JWT)"]
        Logic["<b>Sludge Engine</b><br/>(F5 Analysis)"]
    end

    subgraph "Persistence Layer"
        DB[(PostgreSQL)]
        Google["Google OAuth2"]
    end

    Web <-->|JWT Auth / REST| API
    Ext --->|API Key / REST| API
    API <--> Auth
    API --> Logic
    Logic <--> DB
    Auth --> Google
```

---

## 2. Fluxos de Autenticação e Dados

### 2.1. Handshake de Autenticação (Dashboard)
O fluxo garante que apenas usuários autorizados (Admins/Analistas) acessem os dados consolidados.

```mermaid
sequenceDiagram
    participant U as Usuário (Admin)
    participant F as Frontend (Next.js)
    participant G as Google OIDC
    participant B as Backend (FastAPI)

    U->>F: Clica em "Entrar com Google"
    F->>G: Solicita ID Token
    G-->>F: Retorna ID Token
    F->>B: POST /auth/google {token}
    B->>B: Valida Token + Verifica Role
    B-->>F: Retorna JWT Próprio + User Profile
    F->>F: Armazena JWT no LocalStorage
```

### 2.2. Coleta de Telemetria (Extensão)
A coleta é otimizada para ser transparente e sem fricção (sem login).

```mermaid
sequenceDiagram
    participant C as Cobaia (Navegador)
    participant E as Extensão
    participant B as Backend (FastAPI)

    C->>E: Interage com site .gov.br
    E->>E: Captura Cliques/Tempo/URL
    E->>B: POST /sessoes-extensao (X-API-KEY)
    B->>B: Valida Chave da Extensão
    B->>B: Persiste Eventos de Fricção
    B-->>E: 201 Created
```

---

## 3. Organização de Níveis de Acesso (RBAC)

A aplicação utiliza um sistema de filtros baseado em e-mails configurados via ambiente:

| Nível         | Identificação              | Permissões                                         |
| :------------ | :------------------------- | :------------------------------------------------- |
| **Admin**     | Lista `ADMIN_EMAILS`       | Gestão completa e acesso a todas as métricas.      |
| **Analista**  | Lista `ANALYST_EMAILS`     | Atribuição de notas de sludge e consulta.          |
| **Visitante** | Qualquer outro Google Auth | Redirecionamento automático para GitHub (Externo). |
| **Extensão**  | `X-API-KEY`                | Apenas escrita de dados de telemetria.             |
