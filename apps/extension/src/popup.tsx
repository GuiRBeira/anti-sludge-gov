import React, { useState, useEffect } from "react"
import govbr from "data-base64:../assets/govbr.png"
import { 
  BrHeader, 
  BrTag, 
  BrList, 
  BrItem, 
  BrSwitch
} from "@govbr-ds/react-components"
import "./popup.css"

// --- Types ---
interface PageInfo {
  url: string
  title: string
  startTime: number // Seconds
  endTime?: number  // Seconds
  clicks: number
  scrolled: boolean
}

interface Session {
  id: string
  startTime: number // Seconds
  pages: PageInfo[]
}

// --- Utils ---
const nowSeconds = () => Math.floor(Date.now() / 1000)

const formatUrl = (url: string) => {
  try {
    const parsed = new URL(url)
    return parsed.hostname + (parsed.pathname !== "/" ? parsed.pathname : "")
  } catch {
    return url
  }
}

const getPageDuration = (page: PageInfo) => {
  const end = page.endTime || nowSeconds()
  const durationSec = Math.max(0, end - page.startTime)
  const minutes = Math.floor(durationSec / 60)
  const seconds = durationSec % 60
  return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
}

function CustomHeader({ title, subTitle, logo, signature }: { title: string, subTitle: string, logo: string, signature: string }) {
  return (
    <header className="tw:bg-white tw:p-4 tw:shadow-xs tw:z-30 tw:border-b tw:border-slate-100">
      <div className="tw:flex tw:items-center tw:gap-3">
        {/* Simplified Logo */}
        <div className="tw:p-1">
          <img src={logo} alt="GovBR" className="tw:h-6 tw:w-auto" />
        </div>
        
        {/* Minimalist Title Content */}
        <div className="tw:flex-1">
          <h1 className="tw:text-sm tw:font-black tw:text-slate-800 tw:tracking-tight tw:leading-none">{title}</h1>
          <div className="tw:flex tw:items-center tw:gap-2 tw:mt-1">
            <span className="tw:text-[9px] tw:font-bold tw:text-slate-300 tw:uppercase tw:tracking-widest">{signature}</span>
            <div className="tw:h-2 tw:w-px tw:bg-slate-100"></div>
            <span className="tw:text-[9px] tw:font-bold tw:text-slate-400">{subTitle}</span>
          </div>
        </div>
        
        <BrTag type="icon" icon="fas fa-shield-halved" size="small" className="tw:text-slate-200 tw:bg-transparent tw:border-none" />
      </div>
    </header>
  );
}

function StatCard({ label, value, icon, color }: { label: string, value: string, icon: string, color: string }) {
  return (
    <div className="tw:bg-white tw:p-3 tw:rounded-2xl tw:shadow-sm tw:border tw:border-slate-100 tw:flex tw:items-center tw:gap-3 tw:transition-all tw:duration-300 hover-lift">
      <BrTag
        type="icon"
        icon={icon}
        size="large"
        className={`tw:w-10 tw:h-10 tw:rounded-xl tw:bg-linear-to-br ${color} tw:flex tw:items-center tw:justify-center tw:text-white tw:shadow-lg tw:border-none`}
      />
      <div className="tw:min-w-0">
        <div className="tw:text-[9px] tw:font-bold tw:text-slate-400 tw:uppercase tw:tracking-wider tw:truncate">{label}</div>
        <div className="tw:text-lg tw:font-black tw:text-slate-800 tw:leading-none">{value}</div>
      </div>
    </div>
  );
}

// --- Main Component ---
export default function IndexPopup() {
  const [isActive, setIsActive] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [timer, setTimer] = useState("00:00")
  const [showFinishedBanner, setShowFinishedBanner] = useState(false)

  // Load initial state
  useEffect(() => {
    chrome.storage.local.get(["isActive", "currentSession"], (result) => {
      setIsActive(result.isActive || false)
      setSession(result.currentSession || null)
    })

    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes.isActive) setIsActive(changes.isActive.newValue)
      if (changes.currentSession) setSession(changes.currentSession.newValue)
    }

    chrome.storage.onChanged.addListener(handleStorageChange)
    return () => chrome.storage.onChanged.removeListener(handleStorageChange)
  }, [])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive && session) {
      const updateTimer = () => {
        const elapsed = Math.max(0, nowSeconds() - session.startTime)
        const mins = Math.floor(elapsed / 60).toString().padStart(2, "0")
        const secs = (elapsed % 60).toString().padStart(2, "0")
        setTimer(`${mins}:${secs}`)
      }
      updateTimer()
      interval = setInterval(updateTimer, 1000)
    } else {
      setTimer("00:00")
    }
    return () => clearInterval(interval)
  }, [isActive, session])

  const handleToggle = (nextState?: boolean) => {
    const targetState = typeof nextState === 'boolean' ? nextState : !isActive
    if (targetState === isActive) return
    
    setIsActive(targetState)
    
    if (targetState) {
      chrome.runtime.sendMessage({ action: "startSession" })
      setShowFinishedBanner(false)
    } else {
      chrome.runtime.sendMessage({ action: "stopSession" })
      setShowFinishedBanner(true)
      setTimeout(() => setShowFinishedBanner(false), 5000)
    }
  }

  return (
    <div className="tw:flex tw:flex-col tw:h-screen tw:bg-slate-50">
      <CustomHeader
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
              value={(session?.pages?.length || 0).toString()} 
              icon="far fa-file-alt" 
              color="tw:from-emerald-500 tw:to-emerald-700" 
            />
          </div>
        </div>

        {showFinishedBanner && (
          <div className="tw:p-4 tw:bg-white tw:rounded-2xl tw:shadow-sm tw:border tw:border-emerald-100 tw:text-emerald-700 tw:text-xs tw:flex tw:items-center tw:gap-3 tw:animate-slide-down">
            <BrTag
              type="icon"
              icon="fas fa-check"
              size="medium"
              color="success"
              className="tw:bg-emerald-100! tw:text-emerald-700 tw:rounded-full tw:border-none"
            />
            <span className="tw:font-bold">Relatório exportado com sucesso!</span>
          </div>
        )}

        <div className="tw:bg-white tw:rounded-2xl tw:shadow-sm tw:border tw:border-slate-100 tw:overflow-hidden">
          <div className="tw:px-5 tw:py-4 tw:border-b tw:border-slate-100 tw:flex tw:items-center tw:justify-between">
            <h3 className="tw:text-sm tw:font-black tw:text-slate-800 tw:uppercase tw:tracking-tighter">Jornada do Cidadão</h3>
            <BrTag type="icon" icon="fas fa-history" size="small" className="tw:text-slate-300 tw:bg-transparent tw:border-none" />
          </div>

          <div className="tw:p-2 tw:space-y-2">
            {!isActive && !session?.pages?.length ? (
              <div className="tw:py-10 tw:text-center tw:text-slate-400 tw:flex tw:flex-col tw:items-center tw:gap-3">
                <BrTag type="icon" icon="fas fa-search" size="large" className="tw:opacity-20 tw:bg-transparent tw:border-none" />
                <p className="tw:text-xs tw:font-bold">Nenhuma atividade recente encontrada.</p>
              </div>
            ) : (
              <BrList>
                {(session?.pages || []).slice().reverse().map((page, index) => (
                  <BrItem key={index} className="tw:p-3 tw:hover:bg-slate-50 tw:rounded-xl tw:transition-colors">
                    <div className="tw:w-full">
                      <div className="tw:flex tw:justify-between tw:items-start tw:mb-1">
                        <div className="tw:text-[13px] tw:font-black tw:text-slate-800 tw:truncate tw:max-w-[180px]">
                          {page.title}
                        </div>
                        <div className="tw:text-[10px] tw:font-bold tw:text-blue-600 tw:bg-blue-50 tw:px-2 tw:py-0.5 tw:rounded-full">
                          {getPageDuration(page)}
                        </div>
                      </div>
                      <div className="tw:text-[10px] tw:text-slate-400 tw:mb-3 tw:truncate">{formatUrl(page.url)}</div>
                      
                      <div className="tw:flex tw:gap-2">
                        <BrTag
                          type="text"
                          color="warning"
                          icon="far fa-hand-point-up"
                          value={`${page.clicks} CLIQUES`}
                          className="tw:text-[9px] tw:font-black tw:rounded-lg tw:py-1 tw:px-2"
                        />
                        {page.scrolled && (
                          <BrTag
                            type="text"
                            color="success"
                            icon="fas fa-arrows-alt-v"
                            value="SCROLL"
                            className="tw:text-[9px] tw:font-black tw:rounded-lg tw:py-1 tw:px-2"
                          />
                        )}
                      </div>
                    </div>
                  </BrItem>
                ))}
              </BrList>
            )}
          </div>
        </div>
      </div>

      <div className="tw:px-4 tw:py-3 tw:bg-white tw:border-t tw:border-slate-100 tw:text-center">
        <div className="tw:text-[9px] tw:font-black tw:text-slate-300 tw:uppercase tw:tracking-widest">
          UTFPR & CINCO/MGI — Auditoria v1.0
        </div>
      </div>
    </div>
  )
}
