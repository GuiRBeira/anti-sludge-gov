import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Categoria, CriterioTemplate, TipoComportamento } from "@/types/database";

type TipoComCategoria = TipoComportamento & { categoria: Categoria };

export default async function CatalogoPage() {
  const supabase = await createClient();

  const [{ data: cats }, { data: tipos }, { data: crits }] = await Promise.all([
    supabase.from("categoria").select("*").order("ordem"),
    supabase
      .from("tipo_comportamento")
      .select("*, categoria:categoria_id (*)")
      .order("ordem"),
    supabase.from("criterio_template").select("*").order("dimensao").order("ordem"),
  ]);

  const categorias = (cats ?? []) as Categoria[];
  const tiposComCat = (tipos ?? []) as unknown as TipoComCategoria[];
  const criterios = (crits ?? []) as CriterioTemplate[];

  const barreiras = criterios.filter((c) => c.dimensao === "barreira");
  const impactos = criterios.filter((c) => c.dimensao === "impacto");

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-2xl font-semibold">Catálogo F5</h1>
        <p className="text-sm text-muted-foreground">
          Categorias, tipos de comportamento e critérios derivados da planilha F5.
          Somente leitura.
        </p>
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
    </div>
  );
}
