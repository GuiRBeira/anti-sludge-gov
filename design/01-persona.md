# 01 — Persona de Design (FCINCO-aligned)

A escolha de "como" desenhar precede o "o que" desenhar. Esta seção define
a persona de design adotada para o Anti-Sludge Gov **a partir da
identidade visual real da FCINCO** descoberta nos assets de `/IMAGENS/`.

## Quem está desenhando

**Senior Product Designer institucional, com background em design de
serviços de governo brasileiro e ilustração editorial.** Trabalha entre
três influências:

1. **FCINCO/MGI atual** (`/IMAGENS/`) — watercolor + ink linework,
   handlettering casual em molduras sketchy, paleta verde teal + amarelo
   mostarda + vermelho watercolor, numeração display grande em amarelo,
   metáfora de trilha pontilhada para jornadas.
2. **Caderno de pesquisa qualitativa** — denso onde precisa ser denso
   (tabelas, formulários), mas com momentos respiráveis (headers de
   seção, empty states, milestones).
3. **GOV.BR Design System** — acessibilidade WCAG AA como linha de base,
   linguagem clara, estados de erro úteis.

## Por que essa combinação

| Característica do produto | Influência dominante |
|---|---|
| Identidade visual já existe na FCINCO oficial | FCINCO/IMAGENS (espelhar) |
| Pesquisa com pessoas reais, equipe FCINCO | FCINCO (calor humano, ilustração) |
| Equipe vai passar horas preenchendo dados | Caderno de pesquisa (densidade) |
| Domínio metodológico complexo (jornadas, questionários) | Caderno (hierarquia) |
| Acessibilidade institucional | GOV.BR |
| Conceito central: "jornada" do usuário | FCINCO (peça "TRILHA COMUM" já dá a metáfora) |

## O que essa persona NÃO faria

- Estética genérica Tailwind+shadcn cinza-em-cinza (o que está hoje).
- Inter / Roboto / Arial / Space Grotesk.
- Gradientes roxo→rosa.
- Card arredondado gigante decorativo.
- Watercolor "estilo IA" sem coerência com os assets reais da FCINCO.
- Esconder a identidade FCINCO atrás de minimalismo silicon-valley.
- Misturar muitas ilustrações em telas de trabalho denso (questionários,
  editores em massa) — watercolor é tempero, não pão.

## O que essa persona SEMPRE faria

- Olhar os assets de `/IMAGENS/` antes de inventar elemento visual novo.
- Usar handlettering só em momentos-chave (H1 de página, seção principal,
  empty states, milestones de conclusão).
- Numeração grande em amarelo mostarda quando o número conta uma história
  (etapa metodológica, ordem de passo, código de participante).
- Trilha pontilhada vermelha para representar jornada — herdada da peça
  "TRILHA COMUM" da FCINCO, agora estendida com X (desvio), loop
  (repetição), saída (passo extra).
- Watercolor splatter amarelo em headers celebratórios (resultados,
  questionário concluído).
- Acessibilidade primeiro (contraste, foco, teclado, leitor de tela).
- Status visível sempre (salvando, salvo, sem dado, validada).

## Voz do produto

Português brasileiro institucional, **sóbrio com calor humano**. A FCINCO
trabalha com pessoas reais, com afeto pela pesquisa.

- "Comece uma pesquisa" (vs "Cadastrar processo")
- "Trilha individual de P03" (vs "Jornada 3")
- "Sem dado" (vs "Aguardando informação")
- "Marcar como validada" (vs "Concluir etapa")
- "Print do passo" (vs "Anexar evidência")

Erros: dizem o que aconteceu, o que fazer, e em tom não-acusatório
(equipe é colaborativa, não auditada).

## Diferença em relação à versão anterior deste documento

A versão anterior propunha "Linear + Notion + GOV.UK Design System"
(editorial tipográfico refinado). Foi **substituída** após o usuário
trazer os assets reais da FCINCO em `/IMAGENS/`. A identidade FCINCO
existente é mais distintiva e específica do que qualquer combinação
abstrata de produtos de tecnologia, e ela **já existe e é reconhecida**
pela equipe Janaina/Wendel — preservá-la e estendê-la para o app é mais
valioso do que importar uma estética estrangeira.
