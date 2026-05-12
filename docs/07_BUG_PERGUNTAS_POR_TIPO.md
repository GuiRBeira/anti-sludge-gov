# 07 — Bug crítico: perguntas não filtram por tipo do passo

> **Status**: diagnosticado, plano definido, ainda não implementado.
> **Reportado por**: Profª Janaina Piana, em transcrição de áudio
> repassada por Pedro em 2026-05-12, durante teste do MVP v1.
> **Severidade**: alta — invalida o resultado metodológico do
> Dimensionamento de Barreiras enquanto persistir.

---

## 1. Resumo da reclamação

> "A relação das perguntas com os passos: eu tenho uma pergunta associada
> a todos os passos. Mas não é assim que funciona. A gente tem, por
> exemplo, dependendo de como eu digito lá um passo (…), aí eu classifico
> em termos de categoria e comportamento esse passo. E conforme eu
> classifico vai gerar perguntas pra esse comportamento, pra esse passo.
> E aqui não. Ele tá gerando uma pergunta pra tudo igual, pra todos os
> passos."

Traduzindo para o domínio F5:

- A jornada tem passos (`passo_jornada`).
- Cada passo é classificado em **categoria** (Busca e Acesso, Preparação
  e Entrega, Interação, Escolha, Espera, Outros) **e em um tipo de
  comportamento** dentro da categoria (Realizar login, Preencher,
  Anexar, etc.).
- O **conjunto de critérios-B** (e portanto de perguntas) que vale a
  pena dimensionar **depende do tipo do passo**. Não faz sentido medir
  "É fácil redefinir senhas?" num passo cujo tipo é "Anexar documento".

Hoje no app **isso não está sendo respeitado**: o questionário de
Barreiras gera uma **matriz cheia** (todas as perguntas × todos os
passos), ignorando o tipo de cada passo.

---

## 2. Onde está a fonte da verdade (referência metodológica)

A implementação Streamlit original que a FCINCO usou para validar a
metodologia está em
[`/home/plreis/Documentos/PROJ-EXT-GOV/TODAS_INFOS/AntiSludge/`](../../TODAS_INFOS/AntiSludge/).
Aponta direto pro comportamento esperado:

### 2.1 CSV `utils/conceitos_e_escalas_barreiras.csv` (92 perguntas)

Cabeçalho:

```
Categoria, Tipo, Critério-B, Nº Cat, Categoria-Tipo, Ref #,
Categoria-Conceito, Categoria-Exemplos, Categoria-Descrição,
Tipo-Conceito, Tipo-Exemplos, Tipo-Descrição,
Critério-B-Conceito, Pergunta,
1 - Sem barreiras, 5 - Com barreiras impeditivas
```

Cada linha amarra **um critério-B a um par (Categoria, Tipo)**, e traz
a Pergunta + as âncoras 1 e 5. Exemplos da planilha:

| Categoria | Tipo | Critério-B | Pergunta |
|---|---|---|---|
| Busca e Acesso | Procurar site ou aplicativo | Acessibilidade das informações | "É fácil encontrar o link para o processo ou serviço?" |
| Busca e Acesso | Realizar login | Eficiência | "É fácil redefinir senhas esquecidas?" |
| Preparação e Entrega | Preencher | Design | "Os campos do formulário são claros e organizados?" |
| Preparação e Entrega | Preencher | Autonomia | "A pessoa usuária pode salvar seu progresso?" |

O CSV de barreiras tem **92 perguntas** distribuídas por **16 tipos**
de comportamento (média ~6 perguntas/tipo, com variação grande).

### 2.2 Página Streamlit `pages/3_Dimensionamento_Barreiras.py`

Linhas 89-122 são o coração da lógica:

```python
for idx, row in df_jornada.iterrows():
    comportamento = str(row["Comportamento"]).strip()
    categoria = str(row["Categoria"]).strip()
    tipo = str(row["Tipo"]).strip()

    with st.expander(f"Comportamento {idx + 1}: {comportamento}"):
        st.caption(f"**Categoria:** {categoria} | **Tipo:** {tipo}")

        perguntas = df_conceitos[
            (df_conceitos["Categoria"].str.strip() == categoria) &
            (df_conceitos["Tipo"].str.strip() == tipo)
        ]

        if perguntas.empty:
            st.warning("Nenhuma pergunta encontrada para este comportamento.")
            continue

        for _, q in perguntas.iterrows():
            …
```

Ou seja: **para cada passo, filtra o CSV pelo par (Categoria, Tipo) do
passo, e só renderiza essas perguntas.** Se o passo está sem
classificação, **avisa que não há pergunta** em vez de mostrar tudo.

### 2.3 CSV de impactos (`conceitos_e_escalas_impactos.csv`)

Tem só **4 linhas** e **não tem coluna Categoria/Tipo**:

| Critério-I |
|---|
| Necessidade |
| Carga Cognitiva |
| Emoção |
| Consequência |

Isto é importante: **impactos não filtram por tipo**. Os 4 critérios-I
se aplicam universalmente, mas cada um tem regra própria:

- **Necessidade**: respondido **uma vez por jornada** (não por passo).
  Avalia a importância do serviço para a pessoa.
- **Carga Cognitiva, Emoção, Consequência**: respondidos **por passo**,
  mas independente do tipo do passo (todos os 3 valem pra qualquer
  comportamento).

---

## 3. O que já está certo no nosso schema (não precisa mudar)

A migration [`0003_catalog_f5.sql`](../supabase/migrations/0003_catalog_f5.sql)
já modelou a junction correta:

```sql
create table public.tipo_criterio (
  tipo_comportamento_id  uuid not null references public.tipo_comportamento(id) on delete cascade,
  criterio_template_id   uuid not null references public.criterio_template(id) on delete cascade,
  ordem                  int,
  primary key (tipo_comportamento_id, criterio_template_id)
);

comment on table public.tipo_criterio is
  'Restringe quais critérios de barreira/impacto se aplicam a cada tipo de comportamento (planilha #CritériosPorTipo).';
```

E a seed [`0001_seed_catalog_f5.sql`](../supabase/seed/0001_seed_catalog_f5.sql)
popula **93 linhas** dessa junção (apenas para critérios-B; os 4
critérios-I são universais e ficam fora da junção, como na planilha).

**Conferindo**: rodando

```sql
select tc.codigo as tipo, ct.codigo as criterio
from public.tipo_criterio j
join public.tipo_comportamento tc on tc.id = j.tipo_comportamento_id
join public.criterio_template ct on ct.id = j.criterio_template_id
where tc.codigo = 'BUSCA_E_ACESSO__REALIZAR_LOGIN'
order by j.ordem;
```

deve retornar só os critérios-B pertinentes a "Realizar login"
(eficiência, conteúdo, etc.). Os dados estão lá.

---

## 4. O que está errado no frontend (a correção real)

### 4.1 A query que monta o questionário não usa a junção

[`web/features/questionnaires/queries.ts:46-57`](../web/features/questionnaires/queries.ts):

```typescript
export async function listPerguntas(
  questionarioTemplateId: string,
): Promise<PerguntaComCriterio[]> {
  const { data } = await supabase
    .from("pergunta_template")
    .select("*, criterio:criterio_template_id (*)")
    .eq("questionario_template_id", questionarioTemplateId)
    .order("ordem");
  return (data ?? []) as PerguntaComCriterio[];
}
```

Retorna **todas as perguntas do template** sem nenhum filtro de
`tipo_criterio`. Não há sequer um overload que aceite `tipo_id`.

### 4.2 O form renderiza matriz cega

[`web/app/(app)/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]/form.tsx`](../web/app/(app)/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]/form.tsx)
itera no modo "matriz" **todas as perguntas × todos os passos**, sem
nunca olhar para `passo.tipo_comportamento_id` na hora de decidir se a
pergunta se aplica àquele passo. Resultado: a matriz mostra "Os campos
do formulário são claros?" no passo "Realizar login" — exatamente o que
a Janaina reclamou.

### 4.3 Falta também a tela de classificação por passo

A reclamação da Janaina pressupõe que o passo já está classificado em
(Categoria, Tipo) **antes** do questionário rodar. Nossa UI do
[`/jornada-planejada/editor.tsx`](../web/app/(app)/processos/[id]/jornada-planejada/editor.tsx)
permite escolher o tipo no momento de criar/editar o passo (já
corrigimos a ordem do dropdown na execução anterior), mas:

- Nada **obriga** o pesquisador a classificar (`tipo_comportamento_id` é
  nullable em `passo_jornada`).
- Se faltar tipo, o questionário deveria mostrar um aviso explícito
  ("classifique este passo antes de dimensionar"), igual o Streamlit faz
  com `st.warning("Nenhuma pergunta encontrada para este comportamento.")`.

---

## 5. Plano de correção (em 4 fatias commitáveis)

### Fatia A — Query nova: `listPerguntasPorTipo(template, tipoId)`

[`web/features/questionnaires/queries.ts`](../web/features/questionnaires/queries.ts)

Adicionar (manter `listPerguntas` para compatibilidade com necessidade,
que não filtra):

```typescript
export async function listPerguntasParaTipo(
  questionarioTemplateId: string,
  tipoComportamentoId: string | null,
): Promise<PerguntaComCriterio[]> {
  // Sem tipo classificado: lista vazia (UI mostra "classifique primeiro").
  if (!tipoComportamentoId) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pergunta_template")
    .select(`
      *,
      criterio:criterio_template_id (
        *,
        tipos:tipo_criterio!inner (tipo_comportamento_id, ordem)
      )
    `)
    .eq("questionario_template_id", questionarioTemplateId)
    .eq("criterio.tipos.tipo_comportamento_id", tipoComportamentoId)
    .order("ordem");
  if (error) throw error;
  return (data ?? []) as PerguntaComCriterio[];
}
```

> A sintaxe de filtro embutido (`!inner` + `eq` por caminho) é PostgREST
> 12+. Caso o nosso Supabase ainda esteja em versão anterior, alternativa
> é fazer 2 queries (busca os `criterio_template_id` da junção, depois
> filtra `pergunta_template` por `in (...)`).

### Fatia B — Server Component reescreve a árvore (passo → perguntas)

[`/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]/page.tsx`](../web/app/(app)/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]/page.tsx)

Em vez de carregar uma matriz plana, monta um array de:

```typescript
type BlocoPasso = {
  passo: PassoComTipo;
  perguntas: PerguntaComCriterio[]; // já filtradas por tipo
};
```

```typescript
const blocos: BlocoPasso[] = await Promise.all(
  passos.map(async (passo) => ({
    passo,
    perguntas: await listPerguntasParaTipo(template.id, passo.tipo_comportamento_id),
  })),
);
```

Modos:

- **Necessidade** (`template.dimensao === "necessidade"`): chama
  `listPerguntas(template.id)` (sem filtro) e renderiza 1 bloco
  `passo_jornada_id = null`.
- **Impactos** (Carga Cognitiva, Emoção, Consequência): **todos os
  passos** com as **mesmas 3 perguntas** (universal, não filtra). Trate
  como matriz como hoje, mas só com 3 colunas de pergunta.
- **Barreiras**: filtra por tipo de cada passo. Passo sem tipo aparece
  com mensagem amarela "classifique este passo antes de dimensionar".

### Fatia C — Form refatorado: itera por passo, não por matriz

[`form.tsx`](../web/app/(app)/processos/[id]/jornadas/[jornadaId]/questionario/[codigo]/form.tsx)

Vira essencialmente um `<details>` por passo, contendo só as perguntas
que se aplicam àquele passo. Mantém o estado e o auto-save por (pergunta,
passo) como já está. UX:

- Passo sem tipo: render colapsado, com aviso "passo sem classificação —
  abra o editor e marque a categoria/tipo. Sem isso o dimensionamento
  fica vazio".
- Passo com tipo mas zero perguntas na junção (não deve acontecer com a
  seed atual, mas defenda-se): mensagem "nenhum critério-B mapeado para
  este tipo na planilha".
- Contador de progresso no topo: "9/14 critérios respondidos" passa a
  ser "X critérios respondidos em Y passos relevantes".

### Fatia D — Bloqueio metodológico opcional

Adicionar regra: enquanto houver passo sem `tipo_comportamento_id`, o
botão "Concluir questionário" fica desabilitado, com tooltip
"classifique todos os passos antes de concluir". Janaina pode rejeitar
isso (talvez queira concluir parcial); confirmar com ela.

### Não esquecer: tipos novos (categoria "Outros · Comportamento novo")

A planilha permite "Comportamento novo" — um tipo coringa para passos
exóticos. A junção `tipo_criterio` provavelmente **não tem** linhas pra
esse tipo. Solução: render como "passo classificado mas sem perguntas
pré-definidas — use as 4 perguntas de Impacto + observação livre".

---

## 6. Itens secundários da reunião (não-bloqueantes)

### 6.1 "View as gestor / view as analista" (Moodle-style role switcher)

> "Pra fazer igual eu faço no Moodle, que eu tô com o Admin mas eu
> consigo visualizar a tela como se fosse um gestor, um analista. É um
> recurso legal ter no Moodle."

Implementável em 2 partes:

- **Cliente**: um seletor no header (visível só pra admin) que escolhe
  um "papel efetivo" e o `orgao_id` efetivo. Salva em cookie/localStorage.
- **Server**: `getSessionOrRedirect()` recebe um shim que lê o cookie e,
  **se o usuário é realmente admin**, sobrescreve `papel_global` e a
  membership do orgao na sessão devolvida. Para qualquer outro papel,
  ignora o cookie. Importante: a checagem RLS no Postgres **continua
  rodando com o `auth.uid()` real** — o switcher é puramente de UX. Para
  o admin ver "como visitante", a UI precisa esconder ações e queries do
  cliente; o banco continua dando acesso total porque a sessão Postgres
  ainda é admin. Aceitável para um modo de "ensaio de UI", **não** para
  testar permissões reais — para isso, criar usuário de teste separado.

Documentar essa nuance é importante: o Moodle resolve diferente
(stateless impersonation server-side); a gente vai entregar a versão
"visual only" no MVP.

### 6.2 Outros pontos que ela falou que ainda quero confirmar com ela

- Padrão de **necessidade de categoria** (default "Outros") na criação
  do passo — hoje começamos sem nada selecionado; talvez ela prefira
  começar com algo pré-selecionado pra não ficar fácil esquecer.
- Reordenação visual da lista de tipos no dropdown — **já foi resolvido**
  na execução anterior (group by categoria, ordem certa).
- "Ainda não tá tão bonito o modo claro/escuro" — combinamos receber 1
  print de cada pra calibrar. Sem ação até o print.

---

## 7. Verificação rápida que recomendo antes de codar

Logar no Supabase e rodar:

```sql
-- Confirma que a junção está populada
select count(*) from public.tipo_criterio;        -- esperado: 93

-- Confirma que cada tipo tem pelo menos uma pergunta
select tc.nome, count(*) qt
from public.tipo_criterio j
join public.tipo_comportamento tc on tc.id = j.tipo_comportamento_id
group by tc.nome
order by qt desc;

-- Confirma que "Realizar login" tem critérios diferentes de "Preencher"
select tc.nome as tipo, ct.nome as criterio
from public.tipo_criterio j
join public.tipo_comportamento tc on tc.id = j.tipo_comportamento_id
join public.criterio_template ct on ct.id = j.criterio_template_id
where tc.codigo in ('BUSCA_E_ACESSO__REALIZAR_LOGIN', 'PREPARACAO_E_ENTREGA__PREENCHER')
order by tc.codigo, j.ordem;
```

Se o conjunto retornado bater com o CSV original, podemos seguir direto
para Fatia A. Se algo estiver inconsistente (ex: faltam linhas pra
algum tipo), corrigimos no seed antes — não vale codar correção em cima
de dado quebrado.

---

## 8. Como avançar daqui

Sugestão de ordem para a próxima execução:

1. Rodar a checagem SQL do §7 e me passar o resultado (ou eu rodo via
   Server Action de inspeção temporária).
2. Implementar Fatias A + B (query + page), que é onde está o erro real.
3. Implementar Fatia C (form) — a UI vai mudar bastante, mas o estado
   por (pergunta, passo) se mantém.
4. Decidir com Janaina sobre Fatia D (bloqueio) — pergunta direta.
5. **Depois**, atacar o switcher de papel (recurso "tipo Moodle") como
   feature isolada.

Se ela validar o §5 e o §6.1 está claro, podemos fechar o questionário
de Barreiras inteiro numa única execução de implementação, deixando
testes funcionais pra Pedro rodar com ela no dia seguinte.
