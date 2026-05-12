import { redirect } from "next/navigation";
import { getSessionOrRedirect } from "@/lib/auth/session";
import { listOrgaos } from "@/lib/db/orgs";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
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
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={240}
          opacity={0.26}
          seed={74}
          color="hsl(var(--primary))"
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              administração · órgãos
            </div>
            <h1 className="mt-1 text-3xl font-semibold leading-tight">Órgãos</h1>
            <SketchUnderline width={120} variant="short" color="hsl(var(--primary))" />
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              Cadastre os órgãos responsáveis pelos processos e organize o
              escopo institucional de gestores, analistas e diagnósticos.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <StatusPill tone={orgaos.length > 0 ? "em_progresso" : "pendente"}>
              {orgaos.length} órgãos
            </StatusPill>
            <StatusPill tone="validada">admin</StatusPill>
          </div>
        </div>
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
