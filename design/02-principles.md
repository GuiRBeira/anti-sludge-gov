# 02 — Princípios

Sete princípios. Todo conflito de design se resolve voltando a eles.

## P1. Conteúdo > cromo

A informação que a equipe precisa ver tem prioridade sobre a UI que a
envolve. Cromo (bordas, sombras, gradientes) só onde melhora a legibilidade
ou a navegação.

**Aplicação:** tabelas com linhas finas, dividers de 1px, sem cards
aninhados sem função.

## P2. Densidade respirável

Densidade alta — porque é ferramenta de trabalho. Mas respiração suficiente
para os olhos não cansarem em 2h de uso.

**Aplicação:** padding consistente (`gap-4`/`gap-6` em layouts), line-height
1.5 em corpo, 1.25 em títulos. Tabelas com `py-2` por linha (não `py-1`).

## P3. Status sempre visível

Nada acontece em silêncio. Toda ação dá feedback imediato (salvando…,
salvo, erro). Toda etapa metodológica mostra seu estado.

**Aplicação:** indicadores inline (✓, salvando…, não salvo), status pills
nas etapas do processo, badges de validação nas jornadas.

## P4. Hierarquia por tipografia, não por cor

O peso e o tamanho da fonte fazem o trabalho principal de hierarquia. Cor
é reservada para significado (sucesso, erro, atenção, link, dado real).

**Aplicação:** três níveis de título (`text-2xl`/`text-lg`/`text-base
font-medium`), `text-muted-foreground` para metadados, cores semânticas
limitadas.

## P5. Acessibilidade não é tema do final

Contraste, foco visível, tamanho de toque, labels em formulários,
navegação por teclado — tudo desde o primeiro componente.

**Aplicação:** WCAG AA mínimo, todo input com `<Label>` explícito, foco com
ring visível, área clicável ≥ 32px.

## P6. Dado real vs sem dado

Gráficos e tabelas distinguem visualmente "tem resposta" de "sem dado".
Heurística nunca preenche silêncio.

**Aplicação:** "sem dado" em itálico cinza; gráfico vazio com mensagem
explícita ao invés de barra zero; lista de critérios sem resposta
colapsável.

## P7. Atalhos para quem fica horas aqui

Operações repetidas (adicionar passo, salvar, navegar entre passos) têm
caminho de teclado. Confirmação só onde a ação é destrutiva.

**Aplicação:** Enter para submeter, Esc para fechar, Tab linear,
auto-foco no primeiro campo de formulário, Ctrl+V para colar print.

## Decisões que esses princípios já fecharam

- **Sem ilustrações grandes** em estado vazio. Texto explicando o porquê e
  CTA direto (P1, P5).
- **Tabela como primeira escolha**, não cards (P2).
- **Auto-save com indicador** nos questionários, não botão "Salvar" geral
  (P3).
- **Cores chamadas com função**: vermelho = barreira, azul = impacto, verde
  = sucesso/conclusão, âmbar = pendência. Sem paleta arbitrária (P4).
- **Modal só para ação contextual** (anexar print). Tudo o que é fluxo
  principal acontece in-page (P2, P7).
- **"Em breve" não existe** depois desta versão — toda etapa metodológica
  é navegável e mostra status real (P3, P6).
