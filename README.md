# anti-sludge-gov

![Release](https://github.com/GuiRBeira/anti-sludge-gov/actions/workflows/release.yml/badge.svg)
![API Version](https://img.shields.io/github/v/tag/GuiRBeira/anti-sludge-gov?filter=api-*&label=API&color=blue)
![Web Version](https://img.shields.io/github/v/tag/GuiRBeira/anti-sludge-gov?filter=web-*&label=Web&color=green)
![Extension Version](https://img.shields.io/github/v/tag/GuiRBeira/anti-sludge-gov?filter=extension-*&label=Extension&color=orange)
![License](https://img.shields.io/github/license/GuiRBeira/anti-sludge-gov)

Ferramenta digital **anti-sludge** para identificação e mensuração de barreiras em serviços públicos digitais. Projeto de extensão (**UTFPR** + **CINCO/MGI**) e base tecnológica de TCC, integrando ciência comportamental, acessibilidade e auditoria automatizada de fricção digital.

---

## 🚀 Visão Geral

O projeto visa combater o **"sludge digital"** — fricções desnecessárias (burocracia cognitiva) que dificultam o acesso do cidadão aos serviços públicos. Através de uma abordagem baseada em evidências, identificamos, mensuramos e eliminamos barreiras em jornadas governamentais.

### 🎯 Objetivos Principais
- **Identificar barreiras**: Detecção proativa de pontos de fricção.
- **Mensurar impacto**: Quantificação do esforço cognitivo (Metodologia F5).
- **Auditoria automatizada**: Uso de heurísticas e IA para análise de jornadas.
- **Suporte à decisão**: Dashboard para priorização de melhorias baseadas em dados.

---

## 🛠️ Stack Tecnológica

O projeto utiliza uma arquitetura de **monorepo** moderna gerenciada pelo [Turborepo](https://turbo.build/) e [pnpm](https://pnpm.io/).

### Backend (`apps/api`)
- **Framework**: FastAPI (Python 3.12+)
- **Banco de Dados**: PostgreSQL 16
- **Versionamento de Banco**: Alembic (Migrações automatizadas)
- **ORM**: SQLAlchemy 2.0+

### Frontend (`apps/web`)
- **Framework**: Next.js 16 (App Router)
- **Engine**: React 19 + Turbopack
- **Estilização**: Tailwind CSS v4 + DSGOV (Governo Federal)
- **Visualização**: Recharts + Framer Motion

### Extensão (`apps/extension`)
- **Framework**: Plasmo
- **Tecnologia**: WebExtension API (Chrome/Edge/Firefox)

### Infraestrutura & Ferramental
- **Containers**: Podman + Podman Compose (Daemonless/Rootless)
- **Qualidade**: Husky + Lint-staged + Ruff (Python) + ESLint (JS/TS)
- **Release**: Semantic Release (Conventional Commits)

---

## 📂 Estrutura do Projeto

```bash
anti-sludge-gov/
├── apps/
│   ├── api/           # FastAPI Backend + Alembic Migrations
│   ├── extension/     # Browser Extension (Plasmo)
│   └── web/           # Next.js 16 Dashboard
├── docs/              # Documentação técnica e ADRs
│   └── vault/ADRs/    # Architectural Decision Records
├── scripts/           # Scripts de release e automação
├── turbo.json         # Configuração do Turborepo
├── pnpm-workspace.yaml# Definição do workspace pnpm
└── docker-compose.yml # Orquestração local (Podman)
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Podman** & **Podman Compose** (Recomendado) ou Docker.
- **Node.js 24+** & **pnpm 10+**.
- **Python 3.12+**.

### 1. Ambiente Monorepo
Na raiz do projeto, instale todas as dependências:
```bash
pnpm install
```

### 2. Infraestrutura (Banco de Dados)
Inicie o PostgreSQL via Podman:
```bash
podman-compose up -d
```
> [!NOTE]
> O banco será exposto na porta `5433` para evitar conflitos. O seeding inicial de metadados ocorre automaticamente via scripts em `apps/api/database/`.

### 3. Migrações do Banco
Com o banco rodando, aplique as migrações do Alembic:
```bash
cd apps/api
# Certifique-se de configurar o .env.local primeiro
alembic upgrade head
```

### 4. Desenvolvimento em Paralelo
Você pode rodar todos os serviços simultaneamente usando o Turbo:
```bash
pnpm dev
```
- **Dashboard**: `http://localhost:3000`
- **API (Swagger)**: `http://localhost:8000/docs`

---

## 🧪 Qualidade e Build

O projeto possui salvaguardas rigorosas de build para evitar regressões (ver [ADR-005](docs/vault/ADRs/ADR-005%20-%20Salvaguardas%20de%20Build%20e%20Qualidade.md)):

- **Linting**: `pnpm lint`
- **Tests**: `pnpm test`
- **Build Check**: `pnpm build` (Executado via pre-push hook)

---

## 📄 Documentação Relacionada

Para detalhes técnicos profundos, consulte nossos **ADRs (Architectural Decision Records)**:
- [ADR-001: Uso de Podman](docs/vault/ADRs/ADR-001%20-%20Uso%20de%20Podman%20e%20Podman%20Compose.md)
- [ADR-002: Next.js 16 App Router](docs/vault/ADRs/ADR-002%20-%20Escolha%20do%20Next.js%2016%20App%20Router.md)
- [ADR-004: Alembic Migrations](docs/vault/ADRs/ADR-004%20-%20Controle%20de%20Versão%20do%20Banco%20com%20Alembic.md)

---

## 📝 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
