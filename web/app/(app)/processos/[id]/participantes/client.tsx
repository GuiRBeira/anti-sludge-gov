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
import { Trash2 } from "lucide-react";
import {
  criarParticipante,
  removerParticipante,
} from "@/features/observations/actions";
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
const GENEROS = ["Feminino", "Masculino", "Não-binário", "Outro", "Prefere não dizer"];

export default function ParticipantesClient({
  processoId,
  participantes,
}: {
  processoId: string;
  participantes: Participante[];
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
    if (!confirm(`Remover participante ${codigo}? Isso apaga jornada e respostas associadas.`)) return;
    startTransition(async () => {
      try {
        await removerParticipante(id);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao remover");
      }
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="border rounded-lg">
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
            {participantes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Nenhum participante. Use o formulário abaixo.
                </TableCell>
              </TableRow>
            ) : (
              participantes.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono font-medium">{p.codigo}</TableCell>
                  <TableCell>{p.idade_faixa ?? "—"}</TableCell>
                  <TableCell>{p.escolaridade ?? "—"}</TableCell>
                  <TableCell>{p.genero ?? "—"}</TableCell>
                  <TableCell>{p.regiao ?? "—"}</TableCell>
                  <TableCell>
                    {p.consentimento_lgpd ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-900 dark:bg-green-950/40 dark:text-green-200">
                        consentido
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        pendente
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="ghost"
                      disabled={isPending}
                      onClick={() => handleRemove(p.id, p.codigo)}
                      title="Remover"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </section>

      <form onSubmit={handleSubmit} className="border rounded-lg p-5 flex flex-col gap-4">
        <div>
          <h2 className="font-medium">Novo participante</h2>
          <p className="text-xs text-muted-foreground">
            Código (P{String(participantes.length + 1).padStart(2, "0")}) é gerado automaticamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="idade">Faixa etária</Label>
            <Select value={idade} onValueChange={setIdade}>
              <SelectTrigger id="idade">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={NAO_INFORMADO}>— não informado —</SelectItem>
                {FAIXAS.map((f) => (
                  <SelectItem key={f} value={f}>{f}</SelectItem>
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
                  <SelectItem key={e} value={e}>{e}</SelectItem>
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
                  <SelectItem key={g} value={g}>{g}</SelectItem>
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
              placeholder="Ex: Curitiba/PR"
            />
          </div>
        </div>

        <div className="flex items-start gap-2 border rounded-md p-3 bg-muted/40">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="h-4 w-4 mt-0.5"
          />
          <Label htmlFor="consent" className="text-sm leading-snug cursor-pointer">
            O participante leu o termo e consentiu com a participação na pesquisa
            (LGPD). Sem consentimento, a jornada individual não pode ser iniciada.
          </Label>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-3">
            {error}
          </p>
        )}

        <div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Salvando..." : "Cadastrar participante"}
          </Button>
        </div>
      </form>
    </div>
  );
}
