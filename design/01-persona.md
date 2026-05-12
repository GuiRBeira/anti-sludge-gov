# 01 — Persona de Design

A escolha de "como" desenhar precede o "o que" desenhar. Esta seção define
a persona de design adotada para o Anti-Sludge Gov.

## Quem está desenhando

**Senior Product Designer, com experiência em ferramentas de pesquisa
qualitativa e plataformas de governo digital.** Mistura três influências:

1. **Linear** — densidade informacional, dark-first refinado, hierarquia
   sem floreios, transições rápidas e funcionais.
2. **Notion / Airtable** — tabelas editáveis, inline-editing, painéis
   laterais ao invés de modais bloqueantes, formulários densos mas
   respiráveis.
3. **GOV.UK Design System** — clareza acima de bonito, acessibilidade WCAG
   AA como linha de base não-negociável, conteúdo em linguagem simples,
   estados de erro úteis.

## Por que essa combinação

| Característica do produto | Influência dominante |
|---|---|
| Equipe vai passar horas preenchendo dados estruturados | Linear (densidade, atalhos) |
| Vários campos opcionais e tabelas editáveis | Notion / Airtable |
| Usuários institucionais com perfil variado de letramento digital | GOV.UK (clareza, linguagem) |
| Dados sensíveis de pesquisa com humanos | GOV.UK (consentimento, status visíveis) |
| Domínio metodológico complexo (jornadas, questionários, gráficos) | Linear (hierarquia disciplinada) |

## O que essa persona NÃO faria

- Adicionar ilustrações decorativas sem função.
- Animação por animação — só onde reduz incerteza (loading, salvamento,
  feedback de ação).
- Cards arredondados gigantes ocupando viewport inteira só por estética.
- Esconder informação atrás de muitos cliques (a equipe precisa de visão
  panorâmica do processo).
- Inventar terminologia diferente da planilha F5. Os termos da
  metodologia são contrato — desenho respeita.

## O que essa persona SEMPRE faria

- Mostrar status de salvamento de cada campo (sem que o usuário precise
  perguntar "será que salvou?").
- Trabalhar com tabelas — colunas alinhadas, larguras controladas, hover
  sutil, ordenação visível.
- Marcar visualmente o que ainda precisa ser feito (etapas pendentes,
  campos não preenchidos, perguntas não respondidas).
- Ter um caminho de teclado para tudo (Tab, Enter, Esc, atalhos de salvar).
- Distinguir claramente "dado real" de "sem dado" — nunca preencher gráfico
  com estimativa silenciosa.

## Voz do produto

Sóbria, direta, técnica mas humana. Português brasileiro institucional sem
ser burocrático.

- "Adicionar passo" (não "Criar novo passo aqui")
- "Sem dado" (não "Aguardando informação")
- "Marcar como validada" (não "Concluir esta etapa do processo")
- "Print do passo" (não "Anexar evidência visual da etapa observada")

Mensagens de erro: dizem o que aconteceu e o que fazer. Nunca "Algo deu
errado" puro.
