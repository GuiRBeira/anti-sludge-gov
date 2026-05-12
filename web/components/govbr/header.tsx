/**
 * GovBrHeader — cabeçalho institucional do Padrão Mínimo gov.br.
 *
 * Renderiza duas faixas:
 *   1. Barra superior fina #071D41 com a marca "gov.br" e atalhos
 *      institucionais (acessibilidade, alto contraste — opcionais).
 *   2. Faixa principal branca/escura com identificação do órgão (MGI),
 *      do produto (Anti-Sludge Gov) e accent FCINCO em verde teal.
 *
 * Conforme https://www.gov.br/ds/introducao/padrao-minimo, todo produto
 * digital do Governo Federal precisa exibir o logo gov.br e a identidade
 * do órgão responsável.
 */

import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  /** Conteúdo opcional alinhado à direita (avatar do usuário, theme switcher) */
  right?: ReactNode;
};

export function GovBrHeader({ right }: Props) {
  return (
    <header className="flex flex-col">
      {/* Faixa institucional gov.br — Blue Warm Vivid 90 */}
      <div
        className="flex h-7 items-center px-4"
        style={{ background: "hsl(var(--primary-dark))" }}
      >
        <a
          href="https://www.gov.br"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] font-semibold tracking-wide text-white hover:underline"
        >
          gov.br
        </a>
        <span className="ml-2 hidden font-mono text-[10px] uppercase tracking-wider text-white/60 sm:inline">
          Governo Federal · Brasil
        </span>
        <nav className="ml-auto flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider text-white/70">
          <Link href="/acessibilidade" className="hover:text-white">
            Acessibilidade
          </Link>
        </nav>
      </div>

      {/* Faixa do produto — MGI / FCINCO + Anti-Sludge */}
      <div className="flex min-h-14 items-center gap-4 border-b bg-card px-4 py-2 sm:px-6">
        {/* Bloco institucional gov.br */}
        <div className="flex items-center gap-3">
          <div
            className="grid h-9 w-9 place-items-center rounded-md text-white"
            style={{ background: "hsl(var(--primary))" }}
            aria-hidden="true"
          >
            <span className="font-mono text-[10px] font-semibold leading-none">
              gov
              <br />.br
            </span>
          </div>
          <div className="hidden flex-col leading-tight md:flex">
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Ministério da Gestão e da Inovação em Serviços Públicos
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
              FCINCO · Centro de Inovação em Serviços
            </span>
          </div>
        </div>

        {/* Accent FCINCO + nome do produto */}
        <Link
          href="/processos"
          className="ml-auto flex items-center gap-3 sm:ml-0"
        >
          <span
            className="hidden h-6 w-1 rounded-sm sm:block"
            style={{ background: "hsl(var(--fcinco-teal))" }}
            aria-hidden="true"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-semibold text-foreground">
              Anti-Sludge Gov
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
              metodologia F5 · FCINCO
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-3">{right}</div>
      </div>
    </header>
  );
}
