import { redirect } from "next/navigation";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { listOrgaos } from "@/lib/db/orgs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NovoOrgaoForm from "./form";

export default async function OrgaosAdminPage() {
  const session = await getSessionOrRedirect();
  if (session.profile.papel_global !== "admin") redirect("/processos");

  const orgaos = await listOrgaos();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold">Órgãos</h1>
        <p className="text-sm text-muted-foreground">
          Apenas admins podem cadastrar órgãos. Depois de criar, atribua
          gestores via SQL Editor (UI virá na Fase 2).
        </p>
      </header>

      <NovoOrgaoForm />

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sigla</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Esfera</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orgaos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                  Nenhum órgão cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              orgaos.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.sigla}</TableCell>
                  <TableCell>{o.nome}</TableCell>
                  <TableCell className="capitalize">{o.esfera}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
