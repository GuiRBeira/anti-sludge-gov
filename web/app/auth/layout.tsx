import { GovBrHeader } from "@/components/govbr/header";
import { GovBrFooter } from "@/components/govbr/footer";
import { ThemeSwitcher } from "@/components/theme-switcher";

/**
 * Layout das rotas de autenticação.
 *
 * Mesmo antes do login, o Padrão Mínimo do gov.br exige cabeçalho com
 * identificação do órgão e rodapé institucional. Aqui mantemos o shell
 * institucional simplificado (sem avatar / sem logout) e centralizamos
 * o formulário no meio da viewport.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <GovBrHeader right={<ThemeSwitcher />} />

      <main className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">{children}</div>
      </main>

      <GovBrFooter />
    </div>
  );
}
