# features/observations

Participantes observados, protocolos de observação e entrevistas
pós-observação.

## Cobre da metodologia
- `JU.Planejamento` — planejamento da observação.
- `JU.Protocolo 01..05` — protocolo aplicado por participante.
- Entrevista pós-observação (modelo conceitual de Wendel).

## Tabelas principais
- `participante` (anonimizado, com perfil sociodemográfico)
- `protocolo_observacao` (uma por participante por processo)
- `entrevista_pos_observacao`

## Privacidade (LGPD)
- Participante usa `codigo` (P01, P02…) como identificador visível.
- Não armazenar nome real, CPF, email, telefone do participante.
- Campo `consentimento_lgpd` é obrigatório antes de criar qualquer
  jornada individual ligada ao participante.

## Server Actions (futuro)
- `criarParticipante(processo_id, perfil)` — gera código sequencial.
- `criarProtocolo(processo_id, participante_id, dados)`.
- `lancarEntrevista(protocolo_id, respostas)`.
