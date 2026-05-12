"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";
import type { TipoComCategoria } from "@/features/journeys/queries";

export const SEM_TIPO = "__sem_tipo__";

/**
 * Select de Tipo de Comportamento — agrupado visualmente por categoria F5.
 *
 * A query [listTiposComportamento] retorna a lista já ordenada por
 * `categoria.ordem + tipo.ordem`. Aqui só agrupamos pra renderizar com
 * cabeçalhos de categoria (SelectLabel) e separador entre grupos.
 *
 * Usado em:
 *   - editor da jornada planejada
 *   - editor da jornada individual
 *   - editor da jornada padrão (quando vier)
 */
export function TipoComportamentoSelect({
  id,
  value,
  onChange,
  tipos,
  disabled,
  placeholder = "Selecione (opcional)",
}: {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  tipos: TipoComCategoria[];
  disabled?: boolean;
  placeholder?: string;
}) {
  // Agrupa em ordem original (já está ordenada por categoria.ordem).
  const groups: Array<{ categoria: string; items: TipoComCategoria[] }> = [];
  for (const t of tipos) {
    const nome = t.categoria?.nome ?? "Sem categoria";
    const last = groups[groups.length - 1];
    if (last && last.categoria === nome) {
      last.items.push(t);
    } else {
      groups.push({ categoria: nome, items: [t] });
    }
  }

  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[420px]">
        <SelectItem value={SEM_TIPO}>— sem classificação —</SelectItem>
        {groups.map((g) => (
          <SelectGroup key={g.categoria}>
            <SelectSeparator />
            <SelectLabel>{g.categoria}</SelectLabel>
            {g.items.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.nome}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
