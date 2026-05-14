# features/observations

Participantes observados, consentimento LGPD, protocolos e entrevistas.

## Estado atual

Implementado para participantes, protocolos de observação e entrevista
pós-observação.

## Cobre da metodologia

- `JU.Planejamento` — participantes + protocolo da sessão.
- `JU.Protocolo 01..05` — protocolo por participante.
- Entrevista pós-observação — respostas estruturadas em JSON.

## Tabelas principais

- `participante`
- `protocolo_observacao`
- `entrevista_pos_observacao`

## Privacidade (LGPD)

- Participante usa `codigo` (`P01`, `P02`, ...) como identificador visível.
- Não armazenar nome real, CPF, e-mail ou telefone do participante.
- `consentimento_lgpd` é obrigatório para iniciar uma jornada individual ligada
  ao participante.

## Server Actions implementadas

- `criarParticipante(input)` — gera código sequencial por processo.
- `removerParticipante(participante_id)`.
- `upsertProtocoloObservacao(input)`.
- `salvarEntrevistaPosObservacao(input)`.

## Query implementada

- `listParticipantes(processo_id)`.
- `listProtocolosObservacao(processo_id)`.

## Tela

- `/processos/[id]/participantes`
- `/processos/[id]/observacoes`

## Pendências

- Resolver geração de código em função SQL caso haja concorrência real.
- Refinar perguntas da entrevista pós-observação com validação da equipe.
