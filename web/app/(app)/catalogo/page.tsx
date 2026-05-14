import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import type { Categoria, CriterioTemplate, Glossario, TipoComportamento } from "@/types/database";

type TipoComCategoria = TipoComportamento & { categoria: Categoria };

export default async function CatalogoPage() {
  const supabase = await createClient();

  const [{ data: cats }, { data: tipos }, { data: crits }, { data: termos }] = await Promise.all([
    supabase.from("categoria").select("*").order("ordem"),
    supabase
      .from("tipo_comportamento")
      .select("*, categoria:categoria_id (*)")
      .order("ordem"),
    supabase.from("criterio_template").select("*").order("dimensao").order("ordem"),
    supabase.from("glossario").select("*").order("termo"),
  ]);

  const categorias = (cats ?? []) as Categoria[];
  const tiposComCat = (tipos ?? []) as unknown as TipoComCategoria[];
  const criterios = (crits ?? []) as CriterioTemplate[];
  const glossario = (termos ?? []) as Glossario[];

  const barreiras = criterios.filter((c) => c.dimensao === "barreira");
  const impactos = criterios.filter((c) => c.dimensao === "impacto");

  return (
    <div className="flex flex-col gap-8">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={240}
          opacity={0.28}
          seed={64}
          color="hsl(var(--fcinco-teal))"
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              catálogo metodológico · F5
            </div>
            <h1 className="mt-1 font-hand text-4xl leading-tight">Catálogo F5</h1>
            <SketchUnderline width={170} variant="long" color="hsl(var(--accent))" />
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Categorias, tipos de comportamento e critérios derivados da
              planilha F5. Esta área é somente leitura.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <StatusPill tone="em_progresso">{categorias.length} categorias</StatusPill>
            <StatusPill tone="print">{tiposComCat.length} tipos</StatusPill>
            <StatusPill tone="barreira">{barreiras.length} barreiras</StatusPill>
            <StatusPill tone="concluido">{impactos.length} impactos</StatusPill>
            <StatusPill tone="pendente">{glossario.length} termos</StatusPill>
          </div>
        </div>
      </header>

      <section>
        <h2 className="font-medium mb-3">Categorias ({categorias.length})</h2>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ordem</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Conceito</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categorias.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.ordem}</TableCell>
                  <TableCell className="font-medium">{c.nome}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {c.conceito}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="font-medium mb-3">Tipos de comportamento ({tiposComCat.length})</h2>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Conceito</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiposComCat.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.categoria?.nome}</TableCell>
                  <TableCell className="font-medium">{t.nome}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {t.conceito}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="font-medium mb-3">Critérios de barreira ({barreiras.length})</h2>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Critério</TableHead>
                <TableHead>Pergunta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {barreiras.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.nome}</TableCell>
                  <TableCell className="text-sm">{c.pergunta_padrao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="font-medium mb-3">Critérios de impacto ({impactos.length})</h2>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subdimensão</TableHead>
                <TableHead>Critério</TableHead>
                <TableHead>Pergunta</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {impactos.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="capitalize">{c.subdimensao_impacto?.replace("_", " ")}</TableCell>
                  <TableCell className="font-medium">{c.nome}</TableCell>
                  <TableCell className="text-sm">{c.pergunta_padrao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <h2 className="font-medium mb-3">Glossário ({glossario.length})</h2>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Termo</TableHead>
                <TableHead>Definição</TableHead>
                <TableHead>Aba origem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {glossario.map((termo) => (
                <TableRow key={termo.id}>
                  <TableCell className="font-medium">{termo.termo}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {termo.definicao}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {termo.aba_origem ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
