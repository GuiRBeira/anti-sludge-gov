import { useState, useEffect } from "react"
import type { ProcessoOption, Session } from "../background"
import { formatTimer } from "../utils/popup.utils"

interface PopupState {
  isActive: boolean
  session: Session | null
  timer: string
  showFinishedBanner: boolean
  apiSuccess: boolean | null
  processos: ProcessoOption[]
  selectedProcessoId: number | null
  loadingProcessos: boolean
  canStart: boolean
  handleToggle: (event?: boolean | React.ChangeEvent<HTMLInputElement>) => void
  setSelectedProcessoId: (id: number | null) => void
}

export function usePopupState(): PopupState {
  const [isActive, setIsActive] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [timer, setTimer] = useState("00:00")
  const [showFinishedBanner, setShowFinishedBanner] = useState(false)
  const [apiSuccess, setApiSuccess] = useState<boolean | null>(null)

  const [processos, setProcessos] = useState<ProcessoOption[]>([])
  const [selectedProcessoId, setSelectedProcessoId] = useState<number | null>(null)
  const [loadingProcessos, setLoadingProcessos] = useState(true)

  // Busca lista de processos ao montar
  useEffect(() => {
    chrome.runtime.sendMessage({ action: "GET_PROCESSOS" }, (response) => {
      if (response?.processos) setProcessos(response.processos)
      setLoadingProcessos(false)
    })
  }, [])

  // Carrega estado inicial e observa mudanças no storage
  useEffect(() => {
    chrome.storage.local.get(["isActive", "currentSession"], (result) => {
      setIsActive(result.isActive || false)
      setSession(result.currentSession || null)
      if (result.currentSession?.processoId) {
        setSelectedProcessoId(result.currentSession.processoId)
      }
    })

    const handleStorageChange = (
      changes: Record<string, chrome.storage.StorageChange>
    ) => {
      if (changes.isActive) setIsActive(changes.isActive.newValue)
      if (changes.currentSession) setSession(changes.currentSession.newValue)
    }

    chrome.storage.onChanged.addListener(handleStorageChange)
    return () => chrome.storage.onChanged.removeListener(handleStorageChange)
  }, [])

  // Timer atualizado a cada segundo enquanto ativo
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (isActive && session) {
      const tick = () => setTimer(formatTimer(session.startTime))
      tick()
      interval = setInterval(tick, 1000)
    } else {
      setTimeout(() => setTimer("00:00"), 0)
    }
    return () => clearInterval(interval)
  }, [isActive, session])

  const handleToggle = (event?: boolean | React.ChangeEvent<HTMLInputElement>) => {
    let targetState: boolean
    if (typeof event === "boolean") {
      targetState = event
    } else if (event?.target && typeof event.target.checked === "boolean") {
      targetState = event.target.checked
    } else {
      targetState = !isActive
    }

    if (targetState === isActive) return

    setIsActive(targetState)

    if (targetState) {
      const processo = processos.find((p) => p.id === selectedProcessoId)
      chrome.runtime.sendMessage({
        action: "startSession",
        processoId: processo?.id ?? null,
        processoNome: processo?.nome ?? "Sessão Avulsa",
      })
      setShowFinishedBanner(false)
      setApiSuccess(null)
    } else {
      chrome.runtime.sendMessage({ action: "stopSession" }, (response) => {
        setApiSuccess(response?.apiSuccess ?? false)
      })
      setShowFinishedBanner(true)
      setTimeout(() => setShowFinishedBanner(false), 6000)
    }
  }

  return {
    isActive,
    session,
    timer,
    showFinishedBanner,
    apiSuccess,
    processos,
    selectedProcessoId,
    loadingProcessos,
    canStart: selectedProcessoId !== null,
    handleToggle,
    setSelectedProcessoId,
  }
}
