# ADR-005: Salvaguardas de Build e Qualidade

## Status
Aceito

## Contexto
Durante o desenvolvimento das funcionalidades do Dashboard no pacote `web`, ocorreram múltiplos erros de build (tipagem TypeScript e inconsistências de propriedades de componentes) que só foram detectados durante a tentativa de gerar o pacote de produção (`pnpm build`). 

O pipeline de CI existente focava apenas em `lint` e `test`, que não são suficientes para capturar erros de integração e compilação do Next.js/TypeScript. Além disso, não havia travas locais para impedir que código "quebrado" fosse enviado ao repositório remoto.

## Decisão
Implementar uma arquitetura de defesa em múltiplas camadas:

1.  **Local (Git Hook):** Adição de um hook de `pre-push` utilizando Husky que executa `pnpm build:web`. Isso impede que o desenvolvedor envie código com erros de build para o servidor.
2.  **CI (GitHub Actions):** Inclusão do passo de `build` nos workflows de qualidade.
3.  **PR Validation:** Criação de um workflow específico para Pull Requests que executa lint, testes e build de todos os pacotes antes da integração na branch `main`.

## Consequências
- **Positivas:** Redução drástica de falhas de build em ambiente de produção/staging, maior confiança no código integrado, e feedback imediato para o desenvolvedor.
- **Negativas:** O tempo de `git push` pode aumentar ligeiramente (mitigado pelo cache do Turborepo), e o tempo de execução do CI será maior devido ao passo de build.

## Motivação Técnica (Caso Real)
A decisão foi tomada após a detecção de erros onde propriedades como `icon` em `GovCard` ou `type` em `GovTag` estavam sendo usadas de forma incorreta mas passavam no linter simples, quebrando apenas no passo de otimização e checagem de tipos rigorosa do Next.js.
