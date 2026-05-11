import { useState } from "react";
import { Processo } from "../api/processService";
import { useUpdateProcessMutation } from "../api/useProcessQueries";
import { toast } from "sonner";

export function useProcessContextForm(processo: Processo) {
  const updateMutation = useUpdateProcessMutation();
  const [isDirty, setIsDirty] = useState(false);

  const [formData, setFormData] = useState<Partial<Processo>>({
    nome: processo.nome,
    descricao: processo.descricao || "",
    objetivo: processo.objetivo || "",
    esfera_governo: processo.esfera_governo,
    abrangencia: processo.abrangencia,
    publico_alvo: processo.publico_alvo || "",
    usuarios_estimados_ano: processo.usuarios_estimados_ano || 0,
    perfil_foco_mapeamento: processo.perfil_foco_mapeamento || "",
    jornada_planejada_descricao: processo.jornada_planejada_descricao || "",
    necessidade_usuario: processo.necessidade_usuario || "",
    tempo_medio_estimado: processo.tempo_medio_estimado || "",
    indicadores_desempenho: processo.indicadores_desempenho || "",
    hipoteses_dificuldades: processo.hipoteses_dificuldades || "",
    registros_reclamacao: processo.registros_reclamacao || "",
    registros_satisfacao: processo.registros_satisfacao || "",
  });

  const handleChange = (field: keyof Processo, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        id: processo.id,
        data: formData,
      });
      setIsDirty(false);
      toast.success("Contexto do processo atualizado com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar o contexto.");
    }
  };

  return {
    formData,
    isDirty,
    isPending: updateMutation.isPending,
    handleChange,
    handleSubmit,
  };
}
