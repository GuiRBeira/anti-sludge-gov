import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcesso } from "@/lib/db/processes";
import ContextoForm from "./form";

export default async function EditarContextoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  return (
    <div className="max-w-2xl flex flex-col gap-6">
      <header>
        <Link
          href={`/processos/${id}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← {processo.nome}
        </Link>
        <h1 className="text-2xl font-semibold mt-1">Compreensão do contexto</h1>
        <p className="text-sm text-muted-foreground">
          Equivalente à aba <strong>1 Compreensão do Contexto</strong> da planilha F5.
        </p>
      </header>

      <ContextoForm processoId={id} initial={processo} />
    </div>
  );
}
