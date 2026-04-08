import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  run_at: "document_idle"
}

// ============================================================
// AntiSludge — Content Script
// Captures clicks and scroll activity on each page
// ============================================================

let clickCount = 0;
let hasScrolled = false;
let isTracking = false;

// Check if extension is active
chrome.storage.local.get(["isActive"], (data) => {
  isTracking = data.isActive || false;

  if (isTracking) {
    startTracking();
  }
});

// Listen for changes to active state
chrome.storage.onChanged.addListener((changes) => {
  if (changes.isActive) {
    isTracking = changes.isActive.newValue;
    if (isTracking) {
      startTracking();
    }
  }
});

function startTracking() {
  // Reset counters for this page
  clickCount = 0;
  hasScrolled = false;
}

// --- Click tracking ---
document.addEventListener("click", () => {
  if (!isTracking) return;
  clickCount++;
  sendStats();
});

// --- Scroll tracking ---
let scrollTimeout: NodeJS.Timeout | null = null;
document.addEventListener("scroll", () => {
  if (!isTracking) return;
  if (!hasScrolled) {
    hasScrolled = true;
    sendStats();
  }
  // Debounce additional scroll reports
  if (scrollTimeout) clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(sendStats, 2000);
}, { passive: true });

// --- Send stats to background ---
function sendStats() {
  if (!isTracking) return;
  try {
    chrome.runtime.sendMessage({
      type: "PAGE_STATS",
      url: window.location.href,
      clicks: clickCount,
      scrolled: hasScrolled
    });
  } catch (e) {
    // Extension context may have been invalidated
  }
}

// --- Send final stats before leaving page ---
window.addEventListener("beforeunload", () => {
  if (!isTracking) return;
  sendStats();
});

// --- Periodic stats update (every 5s) ---
setInterval(() => {
  if (isTracking && (clickCount > 0 || hasScrolled)) {
    sendStats();
  }
}, 5000);
