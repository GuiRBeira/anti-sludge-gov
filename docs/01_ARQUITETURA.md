# 01 — Arquitetura

## Stack escolhida

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Frontend + Backend | Next.js 16 (App Router) | Um único app full-stack, Server Actions para escrita, RSC para leitura |
| Auth | Supabase Auth (email/senha) | Email/senha já pronto, integra com RLS |
| Banco | Supabase Postgres | Postgres real, schema versionado em SQL |
| Autorização | Postgres Row Level Security | Regra de acesso vive no banco, não pode ser burlada pelo cliente |
| UI | Tailwind + shadcn/ui | Componentes copy-paste, controle total |
| Gráficos | Recharts | Suficiente para todos os gráficos da planilha |
| Validação | Zod + react-hook-form | Schemas reutilizados client + server |
| Notificações | Sonner | Toasts simples |
| Datas | date-fns | Operações de data sem moment |
| Package manager | pnpm | Mais rápido e eficiente em disco |

## Por que essa stack e não a antiga (Next + FastAPI separados + extensão)

Veja §13 da auditoria. Resumo: para o escopo "digitalizar a planilha F5",
manter dois backends (Next + FastAPI) era complexidade sem retorno. A extensão
foi decidida fora do MVP. A stack atual concentra tudo em um app web e usa o
banco como ponto único de regras de acesso.

## Fluxo de uma requisição de escrita

```
Browser
   │ form submit
   ▼
Server Action (Next.js)
   │ valida com Zod
   ▼
Supabase client (server) com cookie do usuário
   │ INSERT/UPDATE/DELETE
   ▼
Postgres
   │ RLS aplica policy do papel + escopo
   ▼
revalidatePath() → UI atualiza
```

## Fluxo de uma requisição de leitura

```
Server Component (Next.js)
   │
   ▼
Supabase client (server) com cookie do usuário
   │ SELECT
   ▼
Postgres
   │ RLS filtra automaticamente o que o usuário pode ver
   ▼
HTML renderizado e enviado ao browser
```

## Organização do código

```
web/
├── app/                      # Rotas (App Router)
│   ├── (auth)/               # Login, signup (públicas) — futuro
│   ├── (app)/                # Rotas autenticadas — futuro
│   │   ├── processos/
│   │   ├── orgaos/
│   │   ├── catalogo/
│   │   └── admin/
│   ├── auth/                 # Endpoints de confirmação Supabase
│   └── protected/            # Página de exemplo do template (será removida)
├── components/
│   ├── ui/                   # shadcn (button, card, …)
│   └── …                     # Compartilhados (auth-button, theme-switcher)
├── features/
│   ├── auth/                 # Sessão, perfil, hooks
│   ├── orgs/                 # Órgãos e membros
│   ├── catalog/              # Categorias, tipos, critérios, escalas
│   ├── processes/            # Processo + contexto
│   ├── journeys/             # Planejada, individual, padrão, passos
│   ├── questionnaires/       # Templates, perguntas, respostas
│   ├── observations/         # Protocolos, participantes, observações
│   ├── analysis/             # Avaliações, motor de cálculo, agregações
│   └── reporting/            # Relatórios e exportações
├── lib/
│   ├── supabase/             # client.ts, server.ts, proxy.ts (template)
│   ├── auth/                 # Helpers de papel/escopo
│   ├── validators/           # Schemas Zod compartilhados
│   ├── db/                   # Queries reutilizáveis
│   └── utils.ts
└── types/
    ├── database.ts           # Gerado via `supabase gen types typescript`
    └── domain.ts             # Tipos derivados específicos do domínio
```

## Decisões arquiteturais

### A1. Tudo em um único app Next.js

Um só repositório, um só deploy. Simplifica auth, simplifica deploy, evita
contrato HTTP duplicado.

### A2. Server Actions são o "API layer"

Mutações vão por Server Actions/Route Handlers. Nada de cliente fazendo
INSERT direto em tabelas que não sejam read-only por design.

### A3. RLS é regra de acesso, não duplicada no app

Toda tabela tem `enable row level security`. As policies expressam quem pode
ler/escrever o quê. Isso impede que um bug no app exponha dados — o banco
recusa.

### A4. Catálogo F5 é versionado em migrations

Categorias, tipos, critérios, escalas e perguntas vêm da planilha e são
seedados via SQL. Mudanças passam por migration nova, não por edição manual.

### A5. Cálculo nunca em GET com side effect

Resultados são materializados em tabela própria (`resultado_analise` ou
similar) por uma Server Action explícita. Páginas só leem.

### A6. Heurística não substitui resposta real

Quando não houver resposta de questionário, o gráfico mostra "sem dado",
não estima. Heurística pode existir como ferramenta auxiliar, mas precisa
ser visualmente marcada e não pode entrar em resultado oficial.
