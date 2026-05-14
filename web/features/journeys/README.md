# features/journeys

Jornadas planejada, individual, padrão e passos.

## Estado atual

Implementado para cadastro/edição manual e consolidação automática conservadora
da jornada padrão a partir das individuais.

## Cobre da metodologia

- `2.1 Mapeamento JorPlanejada` — jornada planejada estruturada.
- `JU.Individual 01..05` — jornadas individuais por participante.
- `2.2 Mapeamento JorPadrão` + `# Tabela JorPadrão` — jornada padrão.
- `JP. Cpto.Ord.Dur.Clas` — comportamento, ordem, duração e classificação por
  passo.
- Evidências visuais por passo via `screenshot_path`.

## Tabelas principais

- `jornada` com `tipo_jornada = planejada | individual | padrao`.
- `passo_jornada`.

## Server Actions

- `ensureJornadaPlanejada(processo_id)`
- `ensureJornadaPadrao(processo_id)`
- `iniciarJornadaIndividual(processo_id, participante_id)`
- `clonarPassosDaPlanejada(jornada_destino_id)`
- `adicionarPasso(input)`
- `atualizarPasso(passo_id, input)`
- `setPassoScreenshot(passo_id, screenshot_path)`
- `vincularPassoPlanejado(passo_id, passo_planejado_id)`
- `removerPasso(passo_id)`
- `moverPasso(passo_id, delta)`
- `toggleValidacaoJornada(jornada_id)`
- `consolidarJornadaPadrao(processo_id)`

## Queries

- `getJornadaPlanejada(processo_id)`
- `getJornadaPadrao(processo_id)`
- `getJornadaById(jornada_id)`
- `listJornadasIndividuais(processo_id)`
- `listPassosJornada(jornada_id)`
- `listTiposComportamento()`

## Telas

- `/processos/[id]/jornada-planejada`
- `/processos/[id]/jornadas-individuais`
- `/processos/[id]/jornadas-individuais/[jornadaId]`
- `/processos/[id]/jornada-padrao`

## Pendências

- Testes de reordenação, vínculo com passo planejado e consolidação automática.
- Refinar a regra de consolidação com validação metodológica da equipe.
