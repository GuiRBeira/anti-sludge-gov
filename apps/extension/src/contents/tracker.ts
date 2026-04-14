import type { PlasmoCSConfig } from "plasmo"
import type { InteractionData } from "../background"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_idle"
}

// ============================================================
// AntiSludge — Content Script
// Captura cliques (com posição do mouse e info do elemento)
// e eventos de scroll, reportando ao background service worker.
// ============================================================

let isActive = false
let scrolled = false

// Initialize state
chrome.storage.local.get(["isActive"], (data) => {
  isActive = data.isActive || false
})

// Watch for state changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.isActive) {
    isActive = changes.isActive.newValue
    // Resetar scroll ao iniciar nova sessão
    if (changes.isActive.newValue === true) scrolled = false
  }
})

// Reportar stats de scroll ao background
function reportScrollStats() {
  if (!isActive) return
  chrome.runtime.sendMessage({
    type: "PAGE_STATS",
    url: window.location.href,
    clicks: 0,  // clicks são contabilizados via CLICK_INTERACTION
    scrolled,
  }).catch(() => {})
}

// Captura clique com posição do mouse e metadados do elemento
document.addEventListener("click", (e: MouseEvent) => {
  if (!isActive) return

  const target = e.target as HTMLElement

  // Texto visível do elemento ou do ancestral mais próximo com texto
  const rawText = target.textContent?.trim() ?? ""
  const elementoTexto = rawText.slice(0, 200)

  const interaction: InteractionData = {
    tipo: "click",
    posX: Math.round(e.clientX),
    posY: Math.round(e.clientY),
    posXRelativa: parseFloat(((e.clientX / window.innerWidth) * 100).toFixed(2)),
    posYRelativa: parseFloat(((e.clientY / window.innerHeight) * 100).toFixed(2)),
    elementoTag: target.tagName?.toLowerCase() ?? "",
    elementoId: target.id ?? "",
    elementoClasse: typeof target.className === "string" ? target.className : "",
    elementoTexto,
    timestampEvento: Date.now(),
  }

  chrome.runtime.sendMessage({
    action: "CLICK_INTERACTION",
    interaction,
  }).catch(() => {})
})

// Scroll: apenas flag booleana + debounced report
let scrollTimeout: ReturnType<typeof setTimeout> | null = null
document.addEventListener("scroll", () => {
  if (!isActive) return
  if (!scrolled) scrolled = true

  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(reportScrollStats, 1000)
}, { passive: true })

// Relatório final antes de fechar a página
window.addEventListener("beforeunload", reportScrollStats)

// Heartbeat a cada 10s para manter stats de scroll sincronizados
setInterval(() => {
  if (isActive) reportScrollStats()
}, 10000)
