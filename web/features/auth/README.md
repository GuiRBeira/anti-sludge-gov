# features/auth

Sessão, perfil de usuário (`profile`) e papel global.

## Estado atual

Implementado fora desta pasta, principalmente em:

- `web/app/auth/*`: telas de login, cadastro, recuperação e atualização de senha.
- `web/lib/auth/session.ts`: carrega usuário Supabase, `profile` e papel global.
- `web/lib/auth/processo-permissions.ts`: resolve leitura/edição/administração por processo.
- `supabase/migrations/0002_orgs_profiles_rbac.sql`: trigger `handle_new_user`
  cria `profile` automaticamente no signup.

## Cobre da metodologia

- Login de `admin`, `gestor`, `analista` e `visitante`.
- Carregamento do papel global e dos vínculos de órgão.
- Modo desenvolvimento sem verificação de e-mail quando o Supabase Auth estiver
  configurado com confirmação desligada.

## Tabelas principais

- `auth.users` (gerenciado pelo Supabase Auth).
- `profile`.
- `membro_orgao` e `processo_permissao` entram no cálculo de escopo.

## Pendências

- SSO institucional/gov.br está fora do MVP v1.
- Convite formal por e-mail ainda não existe; o admin promove/atribui usuários
  depois do signup.
