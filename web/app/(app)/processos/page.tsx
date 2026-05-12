import Link from "next/link";
import { listProcessos } from "@/lib/db/processes";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ProcessosPage() {
  const processos = await listProcessos();

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Processos</h1>
          <p className="text-sm text-muted-foreground">
            Serviços públicos sob análise. RLS filtra automaticamente o que você pode ver.
          </p>
        </div>
        <Link href="/processos/novo">
          <Button>Novo processo</Button>
        </Link>
      </header>

      {processos.length === 0 ? (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          Nenhum processo visível no seu escopo. Se você é admin, comece criando
          um <Link className="underline" href="/admin/orgaos">órgão</Link> e depois um processo.
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Órgão</TableHead>
                <TableHead>Esfera</TableHead>
                <TableHead className="w-[120px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processos.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.nome}</TableCell>
                  <TableCell>{p.orgao?.sigla ?? "—"}</TableCell>
                  <TableCell className="capitalize">{p.orgao?.esfera ?? "—"}</TableCell>
                  <TableCell>
                    <Link
                      href={`/processos/${p.id}`}
                      className="text-sm underline"
                    >
                      Abrir
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
