import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_idle"
}

// ============================================================
// AntiSludge — Content Script (Reconstructed)
// Reports activity (clicks/scroll) to background
// ============================================================

let isActive = false;
let clicks = 0;
let scrolled = false;

// Initialize state
chrome.storage.local.get(["isActive"], (data) => {
  isActive = data.isActive || false;
});

// Watch for state changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.isActive) {
    isActive = changes.isActive.newValue;
  }
});

// Reporting function
function reportStats() {
  if (!isActive) return;
  chrome.runtime.sendMessage({
    type: "PAGE_STATS",
    url: window.location.href,
    clicks: clicks,
    scrolled: scrolled
  }).catch(() => {
    // Background might be suspended or context invalidated
  });
}

// Event Listeners
document.addEventListener("click", () => {
  if (!isActive) return;
  clicks++;
  reportStats();
});

let scrollTimeout: NodeJS.Timeout | null = null;
document.addEventListener("scroll", () => {
  if (!isActive) return;
  if (!scrolled) {
    scrolled = true;
  }
  
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(reportStats, 1000);
}, { passive: true });

// Final report before unload
window.addEventListener("beforeunload", reportStats);

// Heartbeat report every 10s if active
setInterval(() => {
  if (isActive) reportStats();
}, 10000);
