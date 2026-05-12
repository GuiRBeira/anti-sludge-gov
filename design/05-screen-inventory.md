# 05 — Inventário de Telas

Todas as rotas do app, com objetivo, conteúdo principal, estados e
prioridade de design.

Prioridade: **A** = uso diário pela equipe; **B** = uso recorrente; **C** =
configuração/admin.

## Rotas públicas

### `/` (landing pré-login) — A

- **Objetivo**: porta de entrada quando deslogado; redirect para `/processos`
  quando logado.
- **Conteúdo**: header com logo + theme switcher + botões "Entrar" / "Criar
  conta"; hero com título e descrição do produto.
- **Estados**: env vars faltando → mostra `<EnvVarWarning>`.

### `/auth/login` — A
### `/auth/sign-up` — A
### `/auth/forgot-password`, `/auth/update-password`, `/auth/sign-up-success`, `/auth/error` — B

Cards centralizados, formulários simples, links de troca entre fluxos.

## Rotas autenticadas (layout com sidebar)

Sidebar 256px à esquerda em desktop. No mobile vira drawer (a implementar
— ver `06-responsive.md`).

### `/processos` — A
- **Objetivo**: lista de serviços sob análise, no escopo do usuário.
- **Conteúdo**: header com título + descrição + CTA "Novo processo";
  tabela com nome, órgão, esfera, ação "Abrir".
- **Estados**: vazio (texto explicativo + CTA para admin criar órgão).

### `/processos/novo` — B
- **Objetivo**: cadastrar processo dentro de um órgão.
- **Conteúdo**: formulário compacto (1 coluna): select órgão + nome.
- **Estados**: nenhum órgão visível → mensagem direcionando ao admin.

### `/processos/[id]` — A (hub do processo)
- **Objetivo**: visão panorâmica das 7 etapas metodológicas com status.
- **Conteúdo**: header (← processos, nome, sigla órgão);
  bloco "Status metodológico" com lista de etapas (ícone, título,
  descrição, detalhe à direita);
  botões de atalho no rodapé.
- **Estados**: cada etapa mostra "concluído", "em progresso" ou
  "pendente" com contagem real.

### `/processos/[id]/contexto` — B
- **Objetivo**: preencher a Compreensão do Contexto (aba 1 da planilha).
- **Conteúdo**: 6 textareas (objetivo, abrangência, público, perfil foco,
  indicadores, hipóteses) com hint em cada.
- **Estados**: salvando → erro → salvo (banner verde inline).

### `/processos/[id]/jornada-planejada` — A
- **Objetivo**: cadastrar a sequência ideal de passos.
- **Conteúdo**: tabela editável (ordem, descrição, categoria/tipo,
  obrigatório, tempo, **print**, ações ↑↓✗) + formulário "Adicionar passo"
  abaixo + seção "Questionários desta jornada" no fim.
- **Estados**: jornada inexistente → CTA "Iniciar jornada planejada".

### `/processos/[id]/participantes` — A
- **Objetivo**: cadastrar participantes anonimizados.
- **Conteúdo**: tabela (código P01…, idade, escolaridade, gênero, região,
  badge LGPD, remover) + formulário "Novo participante" abaixo.
- **Estados**: vazio → mensagem + form pronto para uso.

### `/processos/[id]/jornadas-individuais` — A
- **Objetivo**: listar participantes e o status da jornada de cada.
- **Conteúdo**: tabela (código, perfil resumido, LGPD, status da jornada,
  ação "Iniciar"/"Abrir editor"). Botão "Iniciar" desabilitado sem LGPD.
- **Estados**: nenhum participante → CTA para `/participantes`.

### `/processos/[id]/jornadas-individuais/[jornadaId]` — A
- **Objetivo**: editor da jornada real observada para um participante.
- **Conteúdo**: header (← lista, nome do participante, badge "validada"
  quando aplica, botão "Marcar como validada");
  banner "Copiar da planejada" quando vazia e planejada existe;
  tabela com colunas: #, descrição, categoria/tipo, **vinculado a passo
  planejado** (select), tempo, **print**, marcações (desvio/repetição),
  ações ↑↓✗;
  formulário "Adicionar passo observado";
  seção "Questionários desta jornada".
- **Estados**: validada → tabela em read-only, sem form, controles
  desabilitados.

### `/processos/[id]/jornada-padrao` — A
- **Objetivo**: construir a jornada padrão a partir das individuais.
- **Conteúdo**: similar à individual, mas sem participante. Banner "Copiar
  da planejada" como ponto de partida.

### `/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]` — A
- **Objetivo**: responder questionário (barreiras / impactos / necessidade).
- **Conteúdo**:
  - Header com nome do questionário, descrição, badge "concluído" quando
    aplica.
  - Banner explicativo da escala 1-5 e do "N/A".
  - **Modo matriz** (barreira/impacto): `<details>` por pergunta, listando
    todos os passos por baixo com botões 1-5, checkbox N/A, textarea.
  - **Modo necessidade**: cards de pergunta direto, sem passos.
  - Sticky footer com botão "Concluir" / "Reabrir".
- **Estados**: jornada sem passos (modo matriz) → tela vazia com CTA para
  voltar; concluído → read-only.

### `/processos/[id]/resultados` — A
- **Objetivo**: ver médias e tempos consolidados.
- **Conteúdo**: 4 seções com Recharts:
  1. Barreiras por critério (BarChart horizontal vermelho)
  2. Impactos por critério (BarChart horizontal azul)
  3. Necessidade (lista textual com média + qtd)
  4. Tempo total por jornada (BarChart horizontal verde)
  - Cada seção tem subtítulo com contagem de respostas.
  - "Sem dado" em itálico quando não há respostas.

### `/catalogo` — B
- **Objetivo**: visualizar o catálogo F5 (referência metodológica).
- **Conteúdo**: 4 tabelas (categorias, tipos, critérios-B, critérios-I).
- **Estados**: só leitura.

### `/admin/orgaos` — C (admin)
- **Objetivo**: cadastrar órgãos.
- **Conteúdo**: formulário (sigla, nome, esfera) + tabela de órgãos
  existentes.

## Estados globais que se repetem

- **Empty**: ícone + texto + CTA. Sem ilustração.
- **Loading**: por enquanto, não temos skeletons — SSR carrega tudo
  síncrono. Futuro: skeleton rows em tabelas.
- **Error**: banner inline vermelho (`bg-red-50`, border `red-200`, text
  `red-600`).
- **Salvando**: indicador inline `text-muted-foreground` ("salvando…").
- **Salvo**: indicador inline `text-green-600` ("✓").
- **Não salvo**: indicador inline `text-amber-600` ("não salvo").
