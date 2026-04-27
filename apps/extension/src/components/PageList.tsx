import React from "react"
import { BrTag, BrList, BrItem } from "@govbr-ds/react-components"
import type { PageInfo } from "../background"
import { formatUrl, getPageDuration } from "../utils/popup.utils"

interface PageListProps {
  pages: PageInfo[]
  isActive: boolean
}

export function PageList({ pages, isActive }: PageListProps) {
  const hasPages = pages.length > 0

  if (!isActive && !hasPages) {
    return (
      <div className="tw:py-10 tw:text-center tw:text-slate-400 tw:flex tw:flex-col tw:items-center tw:gap-3">
        <BrTag
          type="icon"
          icon="fas fa-search"
          size="large"
          className="tw:opacity-20 tw:bg-transparent tw:border-none"
        />
        <p className="tw:text-xs tw:font-bold">Nenhuma atividade recente encontrada.</p>
      </div>
    )
  }

  return (
    <BrList>
      {[...pages].reverse().map((page, index) => (
        <BrItem key={index} className="tw:p-3 tw:hover:bg-slate-50 tw:rounded-xl tw:transition-colors">
          <div className="tw:w-full">
            <div className="tw:flex tw:justify-between tw:items-start tw:mb-1">
              <div className="tw:text-sm tw:font-black tw:text-slate-800 tw:truncate tw:max-w-[180px]">
                {page.title}
              </div>
              <div className="tw:text-xs tw:font-bold tw:text-blue-600 tw:bg-blue-50 tw:px-2 tw:py-0.5 tw:rounded-full">
                {getPageDuration(page)}
              </div>
            </div>
            <div className="tw:text-xs tw:text-slate-400 tw:mb-3 tw:truncate">
              {formatUrl(page.url)}
            </div>

            <div className="tw:flex tw:gap-2 tw:flex-wrap">
              <BrTag
                type="text"
                color="warning"
                icon="far fa-hand-point-up"
                value={`${page.clicks} CLIQUES`}
                className="tw:text-xs tw:font-black tw:rounded-lg tw:py-1 tw:px-2"
              />
              {page.interactions?.length > 0 && (
                <BrTag
                  type="text"
                  color="info"
                  icon="fas fa-mouse-pointer"
                  value={`${page.interactions.length} INT.`}
                  className="tw:text-xs tw:font-black tw:rounded-lg tw:py-1 tw:px-2"
                />
              )}
              {page.scrolled && (
                <BrTag
                  type="text"
                  color="success"
                  icon="fas fa-arrows-alt-v"
                  value="SCROLL"
                  className="tw:text-xs tw:font-black tw:rounded-lg tw:py-1 tw:px-2"
                />
              )}
            </div>
          </div>
        </BrItem>
      ))}
    </BrList>
  )
}
