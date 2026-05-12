/**
 * GovBrFooter — rodapé institucional do Padrão Mínimo gov.br.
 *
 * Exibe a identidade do órgão (MGI/FCINCO) e os links institucionais que
 * o Padrão Mínimo requer: acessibilidade, mapa do site, política de
 * privacidade. A linha inferior leva a marca gov.br.
 *
 * Manter denso e funcional — é rodapé de ferramenta de trabalho, não
 * de site marketing.
 */

import Link from "next/link";

export function GovBrFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-[12px] text-muted-foreground sm:px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className="h-4 w-1 rounded-sm"
              style={{ background: "hsl(var(--fcinco-teal))" }}
              aria-hidden="true"
            />
            <span className="text-[13px] font-semibold text-foreground">
              Anti-Sludge Gov
            </span>
          </div>
          <p className="leading-relaxed max-w-md">
            Plataforma de diagnóstico de barreiras em serviços públicos
            digitais, aplicando a metodologia <strong>F5 Anti-Sludge</strong>{" "}
            mantida pela FCINCO/MGI.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider opacity-70">
            Ministério da Gestão e da Inovação em Serviços Públicos · Governo
            Federal
          </p>
        </div>

        <nav className="flex flex-col gap-2 lg:items-end">
          <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">
            Institucional
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-1 lg:justify-end">
            <Link href="/acessibilidade" className="hover:text-foreground">
              Acessibilidade
            </Link>
            <Link href="/mapa-do-site" className="hover:text-foreground">
              Mapa do site
            </Link>
            <Link href="/privacidade" className="hover:text-foreground">
              Privacidade · LGPD
            </Link>
            <a
              href="https://www.gov.br/gestao/pt-br/assuntos/gestaoeinovacao/inovacao-governamental-carreiras-transversais/inovacao-governamental/cinco/fcinco"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              FCINCO ↗
            </a>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">
            © {year} · Padrão Digital de Governo
          </span>
        </nav>
      </div>

      <div
        className="border-t"
        style={{
          background: "hsl(var(--primary-dark))",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6">
          <a
            href="https://www.gov.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] font-semibold hover:underline"
          >
            gov.br
          </a>
          <span className="font-mono text-[10px] uppercase tracking-wider opacity-75">
            Aderente ao Padrão Mínimo do gov.br Design System
          </span>
        </div>
      </div>
    </footer>
  );
}
