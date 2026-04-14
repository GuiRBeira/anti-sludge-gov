import React from "react"
import { BrTag } from "@govbr-ds/react-components"

interface FinishedBannerProps {
  apiSuccess: boolean | null
}

export function FinishedBanner({ apiSuccess }: FinishedBannerProps) {
  const isSuccess = apiSuccess === true
  return (
    <div
      className={`tw:p-4 tw:bg-white tw:rounded-2xl tw:shadow-sm tw:border tw:text-xs tw:flex tw:items-center tw:gap-3 tw:animate-slide-down ${
        isSuccess
          ? "tw:border-emerald-100 tw:text-emerald-700"
          : "tw:border-amber-100 tw:text-amber-700"
      }`}
    >
      <BrTag
        type="icon"
        icon={isSuccess ? "fas fa-check" : "fas fa-download"}
        size="medium"
        color={isSuccess ? "success" : "warning"}
        className={`tw:rounded-full tw:border-none ${
          isSuccess
            ? "tw:bg-emerald-100! tw:text-emerald-700"
            : "tw:bg-amber-100! tw:text-amber-700"
        }`}
      />
      <span className="tw:font-bold">
        {isSuccess
          ? "Sessão enviada à API com sucesso!"
          : "API indisponível — sessão exportada localmente."}
      </span>
    </div>
  )
}
