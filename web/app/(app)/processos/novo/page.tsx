import { listOrgaos } from "@/lib/db/orgs";
import NovoProcessoForm from "./form";

export default async function NovoProcessoPage() {
  const orgaos = await listOrgaos();

  return (
    <div className="max-w-xl flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold">Novo processo</h1>
        <p className="text-sm text-muted-foreground">
          Cadastrar serviço público para análise. Você precisa ter permissão de
          gestor (ou admin) no órgão.
        </p>
      </header>

      {orgaos.length === 0 ? (
        <div className="border rounded-lg p-6 text-sm text-muted-foreground">
          Nenhum órgão disponível. Peça ao admin para cadastrar um órgão e
          adicionar você como gestor.
        </div>
      ) : (
        <NovoProcessoForm orgaos={orgaos} />
      )}
    </div>
  );
}
