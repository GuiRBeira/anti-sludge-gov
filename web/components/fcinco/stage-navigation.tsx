import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";

interface StageNavigationProps {
  currentStage: number;
  processoId: string;
}

const STAGES = [
  { ordem: 1, label: "Compreensão do contexto", path: "contexto" },
  { ordem: 2, label: "Jornada planejada", path: "jornada-planejada" },
  { ordem: 3, label: "Participantes e observação", path: "observacoes" },
  { ordem: 4, label: "Jornadas individuais", path: "jornadas-individuais" },
  { ordem: 5, label: "Jornada padrão", path: "jornada-padrao" },
  { ordem: 6, label: "Questionários", path: "jornadas-individuais" },
  { ordem: 7, label: "Resultados e gráficos", path: "resultados" },
];

/**
 * Reusable stage navigation component.
 * Rendered at the bottom of each process subpage to allow skipping/navigating to the next stage.
 */
export function StageNavigation({ currentStage, processoId }: StageNavigationProps) {
  const nextStage = STAGES.find((s) => s.ordem === currentStage + 1);

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6">
      <Link href={`/processos/${processoId}`}>
        <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5">
          <Home className="h-4 w-4" />
          Voltar ao Início do Processo
        </Button>
      </Link>

      {nextStage && (
        <Link href={`/processos/${processoId}/${nextStage.path}`}>
          <Button className="group gap-2 hover:shadow-md transition-all">
            Próxima Etapa: {nextStage.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      )}
    </div>
  );
}
