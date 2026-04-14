import React from "react"
import { BrTag } from "@govbr-ds/react-components"

interface StatCardProps {
  label: string
  value: string
  icon: string
  color: string
}

export function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <div className="tw:bg-white tw:p-3 tw:rounded-2xl tw:shadow-sm tw:border tw:border-slate-100 tw:flex tw:items-center tw:gap-3 tw:transition-all tw:duration-300 hover-lift">
      <BrTag
        type="icon"
        icon={icon}
        size="large"
        className={`tw:w-10 tw:h-10 tw:rounded-xl tw:bg-linear-to-br ${color} tw:flex tw:items-center tw:justify-center tw:text-white tw:shadow-lg tw:border-none`}
      />
      <div className="tw:min-w-0">
        <div className="tw:text-[9px] tw:font-bold tw:text-slate-400 tw:uppercase tw:tracking-wider tw:truncate">
          {label}
        </div>
        <div className="tw:text-lg tw:font-black tw:text-slate-800 tw:leading-none">
          {value}
        </div>
      </div>
    </div>
  )
}
