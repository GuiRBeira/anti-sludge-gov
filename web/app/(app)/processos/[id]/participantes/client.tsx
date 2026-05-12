"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, UserPlus } from "lucide-react";
import {
  criarParticipante,
  removerParticipante,
} from "@/features/observations/actions";
import { StatusPill } from "@/components/fcinco/status-pill";
import { NumeroEtapa } from "@/components/fcinco/numero-etapa";
import { EmptyState } from "@/components/fcinco/empty-state";
import type { Participante } from "@/types/database";

const NAO_INFORMADO = "__nao_informado__";
const FAIXAS = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
const ESCOLARIDADES = [
  "Fundamental",
  "Médio",
  "Superior incompleto",
  "Superior completo",
  "Pós-graduação",
];
const GENEROS = [
  "Feminino",
  "Masculino",
  "Não-binário",
  "Outro",
  "Prefere não dizer",
];

export default function ParticipantesClient({
  processoId,
  participantes,
  canEdit,
}: {
  processoId: string;
  participantes: Participante[];
  canEdit: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [idade, setIdade] = useState<string>(NAO_INFORMADO);
  const [escolaridade, setEscolaridade] = useState<string>(NAO_INFORMADO);
  const [genero, setGenero] = useState<string>(NAO_INFORMADO);
  const [regiao, setRegiao] = useState("");
  const [consent, setConsent] = useState(false);

  function reset() {
    setIdade(NAO_INFORMADO);
    setEscolaridade(NAO_INFORMADO);
    setGenero(NAO_INFORMADO);
    setRegiao("");
    setConsent(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canEdit) return;
    setError(null);
    startTransition(async () => {
      try {
        await criarParticipante({
          processo_id: processoId,
          idade_faixa: idade === NAO_INFORMADO ? null : idade,
          escolaridade: escolaridade === NAO_INFORMADO ? null : escolaridade,
          genero: genero === NAO_INFORMADO ? null : genero,
          regiao: regiao.trim() || null,
          consentimento_lgpd: consent,
        });
        reset();
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao cadastrar");
      }
    });
  }

  function handleRemove(id: string, codigo: string) {
    if (!canEdit) return;
    if (
      !confirm(
        `Remover participante ${codigo}? Isso apaga jornada e respostas associadas.`,
      )
    )
      return;
    startTransition(async () => {
      try {
        await removerParticipante(id);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao remover");
      }
    });
  }

  const proximoCodigo = `P${String(participantes.length + 1).padStart(2, "0")}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Tabela */}
      {participantes.length === 0 ? (
        <EmptyState
          title="Nenhum participante ainda"
          description={
            canEdit
              ? "Cadastre o primeiro participante anonimizado pelo formulário abaixo. O código P01 será gerado automaticamente."
              : "Visitantes visualizam participantes já cadastrados, mas não podem criar novos registros."
          }
        />
      ) : (
      <section className="overflow-hidden rounded-lg border bg-card">
        <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
          <h2 className="font-medium">Cadastrados</h2>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {participantes.length} pessoas · anonimizadas
          </span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Código</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Escolaridade</TableHead>
              <TableHead>Gênero</TableHead>
              <TableHead>Região</TableHead>
              <TableHead className="w-24">LGPD</TableHead>
              <TableHead className="w-16"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participantes.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <span
                      className="font-display text-lg"
                      style={{ color: "hsl(var(--accent))" }}
                    >
                      {p.codigo}
                    </span>
                  </TableCell>
                  <TableCell>
                    {p.idade_faixa ?? (
                      <em className="font-hand text-muted-foreground">sem dado</em>
                    )}
                  </TableCell>
                  <TableCell>
                    {p.escolaridade ?? (
                      <em className="font-hand text-muted-foreground">sem dado</em>
                    )}
                  </TableCell>
                  <TableCell>
                    {p.genero ?? (
                      <em className="font-hand text-muted-foreground">sem dado</em>
                    )}
                  </TableCell>
                  <TableCell>
                    {p.regiao ?? (
                      <em className="font-hand text-muted-foreground">sem dado</em>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusPill
                      tone={p.consentimento_lgpd ? "validada" : "pendente"}
                    >
                      {p.consentimento_lgpd ? "consentido" : "pendente"}
                    </StatusPill>
                  </TableCell>
                  <TableCell>
                    {canEdit && (
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={isPending}
                        onClick={() => handleRemove(p.id, p.codigo)}
                        title={`Remover ${p.codigo}`}
                        aria-label={`Remover participante ${p.codigo}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </section>
      )}

      {/* Formulário */}
      {!canEdit ? (
        <div className="rounded-lg border border-dashed bg-muted/30 p-5 text-sm text-muted-foreground">
          <strong>Modo leitura.</strong> Visitantes só visualizam — o cadastro de
          participantes é feito pela equipe (gestor/analista do órgão).
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-lg border bg-card p-6"
        >
          <header className="flex items-center gap-3">
            <NumeroEtapa value={proximoCodigo} size={42} tilt={-3} />
            <div>
              <h2 className="font-medium leading-none">Novo participante</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Código <strong className="font-mono">{proximoCodigo}</strong> é gerado
                automaticamente. Preencha apenas o que for relevante para o
                recorte de perfil-foco.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="idade">Faixa etária</Label>
              <Select value={idade} onValueChange={setIdade}>
                <SelectTrigger id="idade">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NAO_INFORMADO}>— não informado —</SelectItem>
                  {FAIXAS.map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="esc">Escolaridade</Label>
              <Select value={escolaridade} onValueChange={setEscolaridade}>
                <SelectTrigger id="esc">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NAO_INFORMADO}>— não informado —</SelectItem>
                  {ESCOLARIDADES.map((e) => (
                    <SelectItem key={e} value={e}>
                      {e}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="gen">Gênero</Label>
              <Select value={genero} onValueChange={setGenero}>
                <SelectTrigger id="gen">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NAO_INFORMADO}>— não informado —</SelectItem>
                  {GENEROS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="reg">Região / cidade</Label>
              <Input
                id="reg"
                value={regiao}
                onChange={(e) => setRegiao(e.target.value)}
                placeholder="Ex.: Curitiba/PR"
              />
            </div>
          </div>

          <label
            htmlFor="consent"
            className="flex cursor-pointer items-start gap-3 rounded-md border bg-muted/40 p-3"
          >
            <input
              id="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 cursor-pointer accent-primary"
            />
            <span className="text-sm leading-snug">
              <strong>Consentimento LGPD.</strong> O participante leu o termo de
              uso da pesquisa e concorda com a observação anonimizada. Sem este
              campo marcado, a jornada individual não pode ser iniciada.
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
            >
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={isPending}>
              <UserPlus className="h-4 w-4" />
              {isPending ? "Cadastrando…" : `Cadastrar ${proximoCodigo}`}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
