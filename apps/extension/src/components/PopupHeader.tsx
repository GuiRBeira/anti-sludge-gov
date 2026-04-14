import React from "react"
import { BrTag } from "@govbr-ds/react-components"

interface PopupHeaderProps {
  title: string
  subTitle: string
  logo: string
  signature: string
}

export function PopupHeader({ title, subTitle, logo, signature }: PopupHeaderProps) {
  return (
    <header className="tw:bg-white tw:px-4 tw:pb-3 tw:shadow-xs tw:border-b tw:border-slate-200">
      <div className="tw:flex tw:items-center tw:gap-2">
        <div className="tw:p-1 tw:flex tw:justify-start">
          <a href="https://www.gov.br" target="_blank" rel="noopener noreferrer">
            <img src={logo} alt="GovBR" className="tw:h-6 tw:w-auto" />
          </a>
        </div>
        <div className="tw:w-px tw:h-8 tw:bg-gray-300 tw:mx-1" />
        <div className="tw:flex-1">
          <h3 className="tw:text-sm tw:from-neutral-800 tw:text-slate-800 tw:tracking-tight tw:leading-none">
            {title}
          </h3>
        </div>
      </div>
      <div className="tw:flex tw:justify-start tw:items-center tw:gap-2">
        <span className="tw:text-[11px] tw:font-bold tw:text-slate-300 tw:uppercase tw:tracking-widest">
          {signature}
        </span>
        <div className="tw:h-2 tw:w-px tw:bg-slate-100" />
        <span className="tw:text-[11px] tw:font-bold tw:text-slate-400 tw:justify-end">
          {subTitle}
        </span>
        <BrTag
          type="icon"
          icon="fas fa-shield-halved"
          size="small"
          className="tw:text-slate-200 tw:bg-transparent tw:border-none tw:justify-end"
        />
      </div>
    </header>
  )
}
