# 06 — Setup do Supabase Cloud

Passo a passo para conectar o app a um projeto Supabase Cloud.

## 1. Criar conta e projeto

1. Acessar https://supabase.com e criar conta (GitHub é mais rápido).
2. Em "New project":
   - **Name:** `antisludge-gov` (ou `antisludge-gov-dev` se quiser separar
     dev e prod).
   - **Database Password:** gerar e **guardar** num gerenciador de senhas.
     Necessário para `psql` direto.
   - **Region:** `South America (São Paulo)` para latência.
   - **Pricing plan:** Free é suficiente para desenvolvimento.
3. Aguardar provisioning (~2 min).

## 2. Pegar credenciais

Em **Project Settings → API**:

| Variável | Onde achar |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | "Project URL" |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | "Project API keys → publishable" (também chamada `anon` em projetos antigos) |
| `SUPABASE_SERVICE_ROLE_KEY` | "Project API keys → service_role" (só para scripts admin no servidor — **nunca** expor ao cliente) |

## 3. Criar `web/.env.local`

Na raiz de `web/`:

```bash
cp .env.example .env.local
```

(O template oficial cria `.env.example`. Se não existir, copiar de
`.env.local.example` neste repositório.)

Preencher:

```
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<chave-publishable>
SUPABASE_SERVICE_ROLE_KEY=<chave-service-role>   # opcional nesta fase
```

## 4. Configurar Auth no painel

Em **Authentication → Providers**:
- **Email**: enabled.
- **Confirm email**: deixar **off** durante desenvolvimento e no deploy MVP v1
  se o objetivo for testar criação de contas sem verificação de email. Para
  piloto real, religar e validar os redirects.

Em **Authentication → URL Configuration**:
- **Site URL**: `http://localhost:3000`
- **Redirect URLs**: `http://localhost:3000/**` (e domínio de produção
  quando houver).

Para Vercel:
- **Site URL:** `https://<seu-app>.vercel.app` ou domínio customizado.
- **Redirect URLs:** `https://<seu-app>.vercel.app/**`.
- No Vercel, definir as mesmas variáveis públicas:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<seu-projeto>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<publishable-ou-anon-key>
```

O endpoint do Supabase continua sendo o Project URL do Supabase Cloud. O que
muda no deploy é o domínio autorizado para redirect/autenticação.

## 5. Aplicar primeira migration

(Quando a Fase 1 começar.)

Opção A — colando SQL no SQL Editor do painel:
1. Abrir **SQL Editor → New query**.
2. Copiar conteúdo de `supabase/migrations/0001_init.sql`.
3. Run.

Opção B — Supabase CLI (recomendado quando equipe crescer):
1. Instalar: `npm i -g supabase`.
2. `supabase login`.
3. `supabase link --project-ref <ref>` (ref aparece na URL do projeto).
4. `supabase db push` para aplicar todas as migrations de
   `supabase/migrations/`.

A partir da Fase 1, este repositório usa a Opção B como fonte da verdade.

## 6. Gerar types TypeScript

Quando houver schema:

```bash
supabase gen types typescript --project-id <ref> > web/types/database.ts
```

Isso cria os types `Database['public']['Tables']` que o cliente Supabase
usa para autocomplete e validação.

## 7. Rodar o app

```bash
cd web
pnpm install   # se primeira vez
pnpm dev
```

Abrir http://localhost:3000. Criar usuário em "Sign up". Ele aparece
em **Authentication → Users** no painel do Supabase.

## 8. Promover primeiro admin

No MVP v1 existe a tela `/admin/usuarios`, mas o primeiro admin ainda precisa
ser promovido uma vez pelo SQL Editor:

```sql
-- Após o primeiro signup, pegar o id em auth.users e:
insert into profile (id, nome_completo, papel_global)
values ('<auth-user-id>', 'Seu Nome', 'admin')
on conflict (id) do update set papel_global = 'admin';
```

Depois disso, acesse `/admin/usuarios` para gerenciar papéis globais, vínculos
com órgãos e processos visíveis para visitantes. Gestores também acessam essa
tela em modo limitado para vincular/remover analistas dos próprios órgãos.

## Observação sobre emails fictícios

Se a equipe quiser criar usuários com emails que não existem (ex:
`analista1@teste.local`), funciona desde que **Confirm email** esteja off.
Para piloto real, usar emails institucionais — caso contrário recuperação
de senha e convites não vão funcionar.
