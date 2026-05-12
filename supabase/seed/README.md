# supabase/seed/

Seeds idempotentes derivados da planilha F5.

Seeds esperados (a serem criados na Fase 1, derivando da planilha):

- `seed_categorias.sql` — categorias comportamentais (#Conceitos&Escalas).
- `seed_tipos_comportamento.sql` — tipos por categoria.
- `seed_criterios.sql` — critérios de barreira e impacto.
- `seed_tipo_criterio.sql` — quais critérios para quais tipos
  (#CritériosPorTipo).
- `seed_escalas.sql` — texto das notas 1 a 5 por critério.
- `seed_questionarios.sql` — templates dos seis questionários e perguntas.
- `seed_glossario.sql` — termos do #Glossário.

## Regra crítica

**Toda linha vem de uma célula da planilha.** Não inventar critério,
pergunta, ou texto de nota. Se a planilha está ambígua, registrar issue
para validação com Janaina/Wendel antes de seedar.

## Idempotência

Cada seed deve poder ser rodado múltiplas vezes sem duplicar:

```sql
insert into categoria (codigo, nome, ...)
values (...)
on conflict (codigo) do update
  set nome = excluded.nome,
      ...;
```
