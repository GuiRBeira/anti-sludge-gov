# features/feedback

Canal beta para testers reportarem bugs, inconsistências, sugestões e falta de
recursos durante o piloto do MVP v1.

## Estado atual

Implementado.

## Cobre da operação do MVP

- Botão flutuante global para usuários autenticados.
- Formulário de relato com tipo, prioridade percebida, título e descrição.
- Captura automática de página atual e navegador para facilitar reprodução.
- Painel privado de triagem para o admin do piloto.

## Tabela principal

- `beta_feedback`

## Server Actions

- `criarBetaFeedback(formData)`
- `atualizarBetaFeedbackStatus(formData)`

## Telas/componentes

- `web/components/beta-feedback-widget.tsx`
- `/admin/feedback-beta`

## Permissão

- Qualquer usuário autenticado pode inserir feedback.
- Apenas o email `pedrolucas@alunos.utfpr.edu.br` consegue ler, atualizar ou
  remover feedback pela policy RLS `app_is_beta_feedback_owner()`.

## Pendências

- Converter relatos em issues/backlog quando o piloto começar a gerar volume.
- Notificação ativa para novo feedback ainda não existe.
