// ============================================================
// AntiSludge — Background Service Worker
// Single Source of Truth: chrome.storage.local
// ============================================================

export {}

const API_BASE_URL = process.env.PLASMO_PUBLIC_API_URL ?? "http://localhost:8000/api/v1"
const EXTENSION_API_KEY = process.env.PLASMO_PUBLIC_EXTENSION_API_KEY ?? "dev-api-key"

// --- Types ---
export interface InteractionData {
  tipo: "click"
  posX: number
  posY: number
  posXRelativa: number
  posYRelativa: number
  elementoTag: string
  elementoId: string
  elementoClasse: string
  elementoTexto: string
  timestampEvento: number // unix ms
}

export interface PageInfo {
  url: string
  title: string
  startTime: number  // Unix seconds
  endTime?: number   // Unix seconds
  clicks: number
  scrolled: boolean
  interactions: InteractionData[]
}

export interface Session {
  id: string
  startTime: number  // Unix seconds
  processoId?: number
  processoNome?: string
  pages: PageInfo[]
}

interface AppState {
  isActive: boolean
  currentSession: Session | null
}

export interface ProcessoOption {
  id: number
  nome: string
}

// --- Utils ---
const nowSeconds = () => Math.floor(Date.now() / 1000)

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8)

// Get current state from storage
async function getAppState(): Promise<AppState> {
  const data = await chrome.storage.local.get(["isActive", "currentSession"])
  return {
    isActive: data.isActive || false,
    currentSession: data.currentSession || null
  }
}

// Save state to storage
async function saveAppState(state: AppState) {
  await chrome.storage.local.set(state)
  if (state.isActive) {
    chrome.action.setBadgeText({ text: "ON" })
    chrome.action.setBadgeBackgroundColor({ color: "#00AA66" })
  } else {
    chrome.action.setBadgeText({ text: "" })
  }
}

// --- API Integration ---

async function fetchProcessos(): Promise<ProcessoOption[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/processos?limit=100`, {
      headers: { "X-API-KEY": EXTENSION_API_KEY }
    })
    if (!response.ok) return []
    const data: ProcessoOption[] = await response.json()
    return data.map((p) => ({ id: p.id, nome: p.nome }))
  } catch {
    return []
  }
}

async function sendToApi(sessionData: Session): Promise<boolean> {
  const endTime = nowSeconds()
  const totalTime = endTime - sessionData.startTime

  const payload = {
    session_id_extensao: sessionData.id,
    processo_id: sessionData.processoId ?? null,
    data_inicio: new Date(sessionData.startTime * 1000).toISOString(),
    data_fim: new Date(endTime * 1000).toISOString(),
    total_tempo_segundos: totalTime,
    total_paginas: sessionData.pages.length,
    total_cliques: sessionData.pages.reduce((acc, p) => acc + p.clicks, 0),
    paginas: sessionData.pages.map((p, index) => ({
      url: p.url,
      titulo: p.title,
      tempo_inicio_unix: p.startTime,
      tempo_fim_unix: p.endTime ?? endTime,
      duracao_segundos: (p.endTime ?? endTime) - p.startTime,
      contagem_cliques: p.clicks,
      teve_scroll: p.scrolled,
      ordem: index,
      interacoes: p.interactions.map((i) => ({
        tipo: i.tipo,
        pos_x: i.posX,
        pos_y: i.posY,
        pos_x_relativa: i.posXRelativa,
        pos_y_relativa: i.posYRelativa,
        elemento_tag: i.elementoTag,
        elemento_id: i.elementoId,
        elemento_classe: i.elementoClasse,
        elemento_texto: i.elementoTexto,
        timestamp_evento: i.timestampEvento,
      })),
    })),
  }

  try {
    const response = await fetch(`${API_BASE_URL}/sessoes-extensao`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "X-API-KEY": EXTENSION_API_KEY
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const rawText = await response.text().catch(() => "(sem corpo)")
      let errorBody: unknown = rawText
      try { errorBody = JSON.parse(rawText) } catch { /* não é JSON */ }
      console.error("AntiSludge: Erro na API", {
        status: response.status,
        details: errorBody,
        raw: rawText,
      })
      return false
    }

    return true
  } catch (err) {
    console.error("AntiSludge: Falha de conexão com a API", err)
    return false
  }
}

// Download session as JSON (fallback local)
async function downloadSession(sessionData: Session) {
  const endTime = nowSeconds()
  const exportedData = {
    id: sessionData.id,
    processoId: sessionData.processoId,
    processoNome: sessionData.processoNome,
    totalTime: endTime - sessionData.startTime,
    pages: sessionData.pages.map((p) => ({
      url: p.url,
      title: p.title,
      clicks: p.clicks,
      scrolled: p.scrolled,
      time: (p.endTime || endTime) - p.startTime,
      interactions: p.interactions,
    })),
  }

  const json = JSON.stringify(exportedData, null, 2)
  const blob = new Blob([json], { type: "application/json" })
  const buffer = await blob.arrayBuffer()
  const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ""))
  const dataUrl = `data:application/json;base64,${base64}`
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)

  chrome.downloads.download({
    url: dataUrl,
    filename: `antisludge-sessao-${timestamp}.json`,
    saveAs: false,
  })
}

// --- Core Actions ---

async function startSession(processoId?: number, processoNome?: string) {
  const state = await getAppState()
  if (state.isActive) return

  state.isActive = true
  state.currentSession = {
    id: generateId(),
    startTime: nowSeconds(),
    processoId,
    processoNome,
    pages: [],
  }

  await saveAppState(state)
}

async function stopSession(): Promise<boolean> {
  const state = await getAppState()
  if (!state.isActive || !state.currentSession) return false

  // Finalizar última página
  if (state.currentSession.pages.length > 0) {
    const lastPage = state.currentSession.pages[state.currentSession.pages.length - 1]
    if (!lastPage.endTime) lastPage.endTime = nowSeconds()
  }

  const apiSuccess = await sendToApi(state.currentSession)

  // Download local como backup se a API falhar
  if (!apiSuccess) {
    await downloadSession(state.currentSession)
  }

  state.isActive = false
  state.currentSession = null
  await saveAppState(state)

  return apiSuccess
}

async function addPage(url: string, title?: string) {
  const state = await getAppState()
  if (!state.isActive || !state.currentSession) return

  if (url.startsWith("chrome://") || url.startsWith("chrome-extension://")) return

  if (state.currentSession.pages.length > 0) {
    const lastPage = state.currentSession.pages[state.currentSession.pages.length - 1]
    if (lastPage.url === url) return
    if (!lastPage.endTime) lastPage.endTime = nowSeconds()
  }

  const newPage: PageInfo = {
    url,
    title: title || url,
    startTime: nowSeconds(),
    clicks: 0,
    scrolled: false,
    interactions: [],
  }

  state.currentSession.pages.push(newPage)
  await saveAppState(state)
}

async function updateStats(url: string, clicks: number, scrolled: boolean) {
  const state = await getAppState()
  if (!state.isActive || !state.currentSession || state.currentSession.pages.length === 0) return

  const currentPage = state.currentSession.pages[state.currentSession.pages.length - 1]
  if (currentPage.url === url) {
    currentPage.clicks = clicks
    currentPage.scrolled = scrolled || currentPage.scrolled
    await saveAppState(state)
  }
}

async function addInteraction(interaction: InteractionData) {
  const state = await getAppState()
  if (!state.isActive || !state.currentSession || state.currentSession.pages.length === 0) return

  const currentPage = state.currentSession.pages[state.currentSession.pages.length - 1]
  currentPage.interactions.push(interaction)
  currentPage.clicks = currentPage.interactions.filter((i) => i.tipo === "click").length
  await saveAppState(state)
}

// --- Listeners ---

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const action = message.action || message.type

  if (action === "startSession") {
    startSession(message.processoId, message.processoNome).then(() => sendResponse({ ok: true }))
    return true
  }
  if (action === "stopSession") {
    stopSession().then((apiSuccess) => sendResponse({ ok: true, apiSuccess }))
    return true
  }
  if (action === "PAGE_STATS") {
    updateStats(message.url, message.clicks, message.scrolled).then(() => sendResponse({ ok: true }))
    return true
  }
  if (action === "CLICK_INTERACTION") {
    addInteraction(message.interaction as InteractionData).then(() => sendResponse({ ok: true }))
    return true
  }
  if (action === "GET_STATE") {
    getAppState().then(sendResponse)
    return true
  }
  if (action === "GET_PROCESSOS") {
    fetchProcessos().then((processos) => sendResponse({ processos }))
    return true
  }
})

chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId !== 0) return
  try {
    const tab = await chrome.tabs.get(details.tabId)
    if (tab && tab.url) {
      await addPage(tab.url, tab.title)
    }
  } catch {
    // Tab might be gone
  }
})

chrome.runtime.onInstalled.addListener(async () => {
  const state = await getAppState()
  await saveAppState(state)
})

chrome.runtime.onStartup.addListener(async () => {
  const state = await getAppState()
  await saveAppState(state)
})
