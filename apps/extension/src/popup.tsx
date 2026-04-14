import React from "react"
import govbr from "data-base64:../assets/govbr.png"
import { BrTag, BrSwitch, BrSelect } from "@govbr-ds/react-components"
import "./popup.css"
import { usePopupState } from "./hooks/usePopupState"
import { PopupHeader } from "./components/PopupHeader"
import { StatCard } from "./components/StatCard"
import { FinishedBanner } from "./components/FinishedBanner"
import { PageList } from "./components/PageList"

export default function IndexPopup() {
  const {
    isActive,
    session,
    timer,
    showFinishedBanner,
    apiSuccess,
    processos,
    selectedProcessoId,
    loadingProcessos,
    canStart,
    handleToggle,
    setSelectedProcessoId,
  } = usePopupState()

  const processoOptions = processos.map((p) => ({ label: p.nome, value: String(p.id) }))

  return (
    <div className="tw:flex tw:flex-col tw:h-screen tw:bg-slate-50">
      <PopupHeader
        signature="UTFPR / CINCO MGI"
        title="AntiSludge Auditor"
        subTitle="Transparência em Serviços Digitais"
        logo={govbr}
      />

      <div className="tw:flex-1 tw:overflow-y-auto tw:p-4 tw:space-y-6">
        <div className="tw:space-y-4">
          <header className="tw:flex tw:justify-between tw:items-end">
            <div>
              <h3 className="tw:text-2xl tw:font-black tw:tracking-tight">Monitoramento</h3>
              <p className="tw:text-[11px] tw:text-slate-500">Controle a gravação de fricção digital.</p>
            </div>
            <BrSwitch
              onChange={handleToggle}
              checked={isActive}
              label={isActive ? "Parar" : "Iniciar"}
              className="tw:mb-0"
            />
          </header>

          {/* Seletor de processo — visível apenas quando inativo */}
          {!isActive && (
            <div className="tw:space-y-1">
              <label className="tw:text-[10px] tw:font-bold tw:text-slate-500 tw:uppercase tw:tracking-wider">
                Processo a monitorar
              </label>
              {loadingProcessos ? (
                <p className="tw:text-[11px] tw:text-slate-400">Carregando processos...</p>
              ) : processos.length === 0 ? (
                <p className="tw:text-[11px] tw:text-amber-600 tw:font-semibold">
                  Nenhum processo cadastrado na API.
                </p>
              ) : (
                <BrSelect
                  id="processo-select"
                  label=""
                  placeholder="Selecione um processo..."
                  options={processoOptions}
                  value={selectedProcessoId !== null ? String(selectedProcessoId) : null}
                  onChange={(val: string | null) => {
                    setSelectedProcessoId(val ? Number(val) : null)
                  }}
                />
              )}
              {!canStart && processos.length > 0 && (
                <p className="tw:text-[10px] tw:text-slate-400">Selecione um processo para iniciar.</p>
              )}
            </div>
          )}

          {/* Processo ativo */}
          {isActive && session?.processoNome && (
            <div className="tw:text-[11px] tw:text-slate-600 tw:font-semibold tw:bg-blue-50 tw:px-3 tw:py-2 tw:rounded-xl tw:border tw:border-blue-100">
              Processo: <span className="tw:text-blue-700">{session.processoNome}</span>
            </div>
          )}

          <div className="tw:flex tw:items-center">
            <BrTag
              type="status"
              color={isActive ? "success" : "danger"}
              value={isActive ? " Ativa" : " Inativa"}
              icon={isActive ? "fas fa-sync fa-spin" : "fas fa-shield-alt"}
              className="tw:pb-2 tw:font-black tw:tracking-widest"
            />
          </div>

          <div className="tw:grid tw:grid-cols-2 tw:gap-4">
            <StatCard
              label="Tempo Total"
              value={timer}
              icon="far fa-clock"
              color="tw:from-blue-500 tw:to-blue-700"
            />
            <StatCard
              label="Páginas"
              value={(session?.pages?.length ?? 0).toString()}
              icon="far fa-file-alt"
              color="tw:from-emerald-500 tw:to-emerald-700"
            />
          </div>
        </div>

        {showFinishedBanner && <FinishedBanner apiSuccess={apiSuccess} />}

        <div className="tw:bg-white tw:rounded-2xl tw:shadow-sm tw:border tw:border-slate-100 tw:overflow-hidden">
          <div className="tw:px-5 tw:py-4 tw:border-b tw:border-slate-100 tw:flex tw:items-center tw:justify-between">
            <h3 className="tw:text-sm tw:font-black tw:text-slate-800 tw:uppercase tw:tracking-tighter">
              Jornada do Cidadão
            </h3>
            <BrTag
              type="icon"
              icon="fas fa-history"
              size="small"
              className="tw:text-slate-300 tw:bg-transparent tw:border-none"
            />
          </div>
          <div className="tw:p-2 tw:space-y-2">
            <PageList pages={session?.pages ?? []} isActive={isActive} />
          </div>
        </div>
      </div>

      <div className="tw:px-4 tw:py-3 tw:bg-white tw:border-t tw:border-slate-100 tw:text-center">
        <div className="tw:text-[9px] tw:font-black tw:text-slate-300 tw:uppercase tw:tracking-widest">
          UTFPR &amp; CINCO/MGI — Auditoria v1.0
        </div>
      </div>
    </div>
  )
}
