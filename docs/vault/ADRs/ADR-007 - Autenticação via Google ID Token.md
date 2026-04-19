# ADR-007: Autenticação Stateless via Google ID Token e JWT Próprio

**Status**: 🔵 Aceito
**Data**: 2026-04-19
**Decisores**: @GuiRBeira

## Contexto
O projeto necessita de autenticação para o Dashboard Web, mas deve evitar o acoplamento excessivo com provedores externos e o gerenciamento complexo de sessões em banco de dados. Além disso, a arquitetura deve permitir a transição futura para o provedor GOV.BR sem reescrever a lógica de autorização.

## Opções Consideradas
- **Opção 1**: Sessões tradicionais em banco de dados (Redis/Postgres).
- **Opção 2**: Auth.js (NextAuth) gerenciando tudo via cookies.
- **Opção 3**: Validação de ID Token no Backend com emissão de JWT próprio.

## Decisão Escolhida
**Opção 3**

### Justificativa Racional
1. **Soberania**: O Backend valida a identidade e emite sua própria "moeda de troca" (JWT), não dependendo da validade contínua do token do Google.
2. **Interoperabilidade**: O padrão JWT Bearer é aceito por qualquer cliente (Web, Extensão, Mobile).
3. **Migração GOV.BR**: No futuro, basta adicionar um novo endpoint de troca de token para o OIDC do governo.

### Consequências
- **Positivas**: API Stateless, fácil integração entre diferentes apps do monorepo.
- **Negativas**: Exige gerenciamento de chaves secretas no backend e lógica de refresh token.

## Referências
- [Google Identity Services](https://developers.google.com/identity/gsi/web/guides/overview)
- [OpenID Connect ID Token Validation](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation)
