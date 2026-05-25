import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, ClipboardList, MessageSquareText } from "lucide-react";
import { getProcesso } from "@/lib/db/processes";
import { getProcessoPermissions } from "@/lib/auth/processo-permissions";
import { listParticipantes, listProtocolosObservacao } from "@/features/observations/queries";
import {
  salvarEntrevistaPosObservacao,
  upsertProtocoloObservacao,
} from "@/features/observations/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/fcinco/empty-state";
import { SketchUnderline } from "@/components/fcinco/sketch-underline";
import { StatusPill } from "@/components/fcinco/status-pill";
import { WatercolorSplatter } from "@/components/fcinco/watercolor-splatter";
import { StageNavigation } from "@/components/fcinco/stage-navigation";
import type { EntrevistaPosObservacao } from "@/types/database";

function toDateTimeLocal(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

function resposta(
  entrevista: EntrevistaPosObservacao | null,
  key: string,
): string {
  const value = entrevista?.respostas?.[key];
  return typeof value === "string" ? value : "";
}

export default async function ObservacoesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const processo = await getProcesso(id);
  if (!processo) notFound();

  const [{ canEdit }, participantes, protocolos] = await Promise.all([
    getProcessoPermissions(id),
    listParticipantes(id),
    listProtocolosObservacao(id),
  ]);

  const protocoloPorParticipante = new Map(
    protocolos.map((protocolo) => [protocolo.participante_id, protocolo]),
  );
  const comProtocolo = protocolos.length;
  const comEntrevista = protocolos.filter((p) => p.entrevista).length;

  return (
    <div className="flex flex-col gap-6">
      <header className="relative overflow-hidden rounded-lg border bg-card p-6">
        <WatercolorSplatter
          className="absolute -right-20 -top-24"
          size={270}
          opacity={0.3}
          seed={51}
          color="hsl(var(--fcinco-teal))"
        />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              href={`/processos/${id}`}
              className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              ← {processo.nome}
            </Link>
            <div className="mt-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              etapa 03 de 06 · observação
            </div>
            <h1 className="mt-1 font-hand text-4xl leading-tight">
              Planejamento da observação
            </h1>
            <SketchUnderline width={240} variant="long" color="hsl(var(--accent))" />
            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              Registre a tarefa, local, dispositivos, consentimento operacional e
              notas de campo antes/depois da sessão. Esta tela cobre as abas
              <strong> JU.Planejamento</strong>, <strong>JU.Protocolo</strong> e
              a entrevista pós-observação da planilha F5.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            <StatusPill tone={participantes.length > 0 ? "em_progresso" : "pendente"}>
              {participantes.length} participantes
            </StatusPill>
            <StatusPill tone={comProtocolo > 0 ? "concluido" : "pendente"}>
              {comProtocolo} protocolos
            </StatusPill>
            <StatusPill tone={comEntrevista > 0 ? "print" : "pendente"}>
              {comEntrevista} entrevistas
            </StatusPill>
            {!canEdit && <StatusPill tone="pendente">somente leitura</StatusPill>}
          </div>
        </div>
      </header>

      {participantes.length === 0 ? (
        <EmptyState
          title="Nenhum participante cadastrado"
          description="Cadastre participantes anonimizados antes de planejar as observações."
          cta={{ href: `/processos/${id}/participantes`, label: "Cadastrar participantes" }}
        />
      ) : (
        <section className="grid gap-4">
          {participantes.map((participante) => {
            const protocolo = protocoloPorParticipante.get(participante.id) ?? null;
            const entrevista = protocolo?.entrevista ?? null;

            return (
              <article key={participante.id} className="rounded-lg border bg-card p-4">
                <div className="mb-4 flex flex-wrap items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-md bg-accent font-display text-xl text-accent-foreground">
                    {participante.codigo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold">
                      Participante {participante.codigo}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {[participante.idade_faixa, participante.escolaridade, participante.genero, participante.regiao]
                        .filter(Boolean)
                        .join(" · ") || "Perfil não informado"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusPill tone={participante.consentimento_lgpd ? "validada" : "pendente"}>
                      {participante.consentimento_lgpd ? "LGPD ok" : "LGPD pendente"}
                    </StatusPill>
                    <StatusPill tone={protocolo ? "em_progresso" : "pendente"}>
                      {protocolo ? "protocolo" : "sem protocolo"}
                    </StatusPill>
                    {entrevista && <StatusPill tone="print">entrevista</StatusPill>}
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                  <form
                    action={async (formData) => {
                      "use server";
                      await upsertProtocoloObservacao({
                        processo_id: id,
                        participante_id: participante.id,
                        tarefa: String(formData.get("tarefa") ?? ""),
                        data_observacao: String(formData.get("data_observacao") ?? ""),
                        local: String(formData.get("local") ?? ""),
                        dispositivos: String(formData.get("dispositivos") ?? ""),
                        consentimento_obtido: formData.get("consentimento_obtido") === "on",
                        notas_pre: String(formData.get("notas_pre") ?? ""),
                        notas_pos: String(formData.get("notas_pos") ?? ""),
                      });
                    }}
                    className="grid gap-3 rounded-md border bg-background p-4"
                  >
                    <div className="flex items-center gap-2">
                      <ClipboardList className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Protocolo da sessão</h3>
                    </div>
                    <fieldset disabled={!canEdit} className="grid gap-3 disabled:opacity-70">
                      <label className="grid gap-1.5 text-sm">
                        <span className="font-medium">Tarefa observada</span>
                        <Textarea
                          name="tarefa"
                          rows={3}
                          defaultValue={protocolo?.tarefa ?? ""}
                          placeholder="Ex: solicitar o serviço X sem ajuda externa."
                        />
                      </label>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <label className="grid gap-1.5 text-sm">
                          <span className="font-medium">Data/hora</span>
                          <Input
                            type="datetime-local"
                            name="data_observacao"
                            defaultValue={toDateTimeLocal(protocolo?.data_observacao ?? null)}
                          />
                        </label>
                        <label className="grid gap-1.5 text-sm">
                          <span className="font-medium">Local</span>
                          <Input name="local" defaultValue={protocolo?.local ?? ""} />
                        </label>
                        <label className="grid gap-1.5 text-sm">
                          <span className="font-medium">Dispositivos</span>
                          <Input
                            name="dispositivos"
                            defaultValue={protocolo?.dispositivos ?? ""}
                            placeholder="Notebook, celular..."
                          />
                        </label>
                      </div>
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          name="consentimento_obtido"
                          defaultChecked={protocolo?.consentimento_obtido ?? participante.consentimento_lgpd}
                        />
                        <span>Consentimento operacional conferido na sessão</span>
                      </label>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="grid gap-1.5 text-sm">
                          <span className="font-medium">Notas pré-observação</span>
                          <Textarea name="notas_pre" rows={4} defaultValue={protocolo?.notas_pre ?? ""} />
                        </label>
                        <label className="grid gap-1.5 text-sm">
                          <span className="font-medium">Notas pós-observação</span>
                          <Textarea name="notas_pos" rows={4} defaultValue={protocolo?.notas_pos ?? ""} />
                        </label>
                      </div>
                    </fieldset>
                    {canEdit && (
                      <div>
                        <Button type="submit" size="sm">Salvar protocolo</Button>
                      </div>
                    )}
                  </form>

                  <form
                    action={async (formData) => {
                      "use server";
                      if (!protocolo) return;
                      await salvarEntrevistaPosObservacao({
                        protocolo_id: protocolo.id,
                        facilitadores: String(formData.get("facilitadores") ?? ""),
                        dificuldades: String(formData.get("dificuldades") ?? ""),
                        maior_esforco: String(formData.get("maior_esforco") ?? ""),
                        comentarios: String(formData.get("comentarios") ?? ""),
                        data: String(formData.get("data") ?? ""),
                      });
                    }}
                    className="grid gap-3 rounded-md border bg-background p-4"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquareText className="h-4 w-4 text-primary" />
                      <h3 className="font-medium">Entrevista pós-observação</h3>
                    </div>
                    {!protocolo ? (
                      <p className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
                        Salve o protocolo da sessão antes de registrar a entrevista.
                      </p>
                    ) : (
                      <>
                        <fieldset disabled={!canEdit} className="grid gap-3 disabled:opacity-70">
                          <label className="grid gap-1.5 text-sm">
                            <span className="font-medium">Data da entrevista</span>
                            <Input
                              type="datetime-local"
                              name="data"
                              defaultValue={toDateTimeLocal(entrevista?.data ?? null)}
                            />
                          </label>
                          <label className="grid gap-1.5 text-sm">
                            <span className="font-medium">O que facilitou?</span>
                            <Textarea name="facilitadores" rows={3} defaultValue={resposta(entrevista, "facilitadores")} />
                          </label>
                          <label className="grid gap-1.5 text-sm">
                            <span className="font-medium">O que dificultou?</span>
                            <Textarea name="dificuldades" rows={3} defaultValue={resposta(entrevista, "dificuldades")} />
                          </label>
                          <label className="grid gap-1.5 text-sm">
                            <span className="font-medium">Onde houve maior esforço?</span>
                            <Textarea name="maior_esforco" rows={3} defaultValue={resposta(entrevista, "maior_esforco")} />
                          </label>
                          <label className="grid gap-1.5 text-sm">
                            <span className="font-medium">Comentários finais</span>
                            <Textarea name="comentarios" rows={3} defaultValue={resposta(entrevista, "comentarios")} />
                          </label>
                        </fieldset>
                        {canEdit && (
                          <div className="flex items-center gap-2">
                            <Button type="submit" size="sm">Salvar entrevista</Button>
                            {entrevista?.data && (
                              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                <CalendarClock className="h-3.5 w-3.5" />
                                registrada
                              </span>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </form>
                </div>
              </article>
            );
          })}
        </section>
      )}

      <StageNavigation currentStage={3} processoId={id} />
    </div>
  );
}
