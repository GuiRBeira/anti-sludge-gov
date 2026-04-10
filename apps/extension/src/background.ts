// ============================================================
// AntiSludge — Background Service Worker (Reconstructed)
// Single Source of Truth: chrome.storage.local
// ============================================================

export {}

import Icon from "@/assets/icon.png"

// --- Types ---
interface PageInfo {
  url: string;
  title: string;
  startTime: number; // Seconds
  endTime?: number;  // Seconds
  clicks: number;
  scrolled: boolean;
}

interface Session {
  id: string;
  startTime: number; // Seconds
  pages: PageInfo[];
}

interface AppState {
  isActive: boolean;
  currentSession: Session | null;
}

// --- Utils ---
const nowSeconds = () => Math.floor(Date.now() / 1000);

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

// Get current state from storage
async function getAppState(): Promise<AppState> {
  const data = await chrome.storage.local.get(["isActive", "currentSession"]);
  return {
    isActive: data.isActive || false,
    currentSession: data.currentSession || null
  };
}

// Save state to storage
async function saveAppState(state: AppState) {
  await chrome.storage.local.set(state);
  
  // Update badge and icon
  if (state.isActive) {
    chrome.action.setBadgeText({ text: "ON" });
    chrome.action.setBadgeBackgroundColor({ color: "#00AA66" });
  } else {
    chrome.action.setBadgeText({ text: "" });
  }
}

// Placeholder for future API integration
async function sendToApi(sessionData: Session) {
  console.log("AntiSludge: Pre-prepared for API endpoint", sessionData);
  // Example:
  // fetch('https://api.colab.utfpr.edu.br/v1/sessions', {
  //   method: 'POST',
  //   body: JSON.stringify(sessionData)
  // });
}

// Download session as JSON
async function downloadSession(sessionData: Session) {
  const json = JSON.stringify(sessionData, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  
  const buffer = await blob.arrayBuffer();
  const base64 = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  const dataUrl = `data:application/json;base64,${base64}`;

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const filename = `antisludge-sessao-${timestamp}.json`;

  chrome.downloads.download({
    url: dataUrl,
    filename: filename,
    saveAs: false
  });
}

// --- Core Actions ---

async function startSession() {
  const state = await getAppState();
  if (state.isActive) return;

  state.isActive = true;
  state.currentSession = {
    id: generateId(),
    startTime: nowSeconds(),
    pages: []
  };

  await saveAppState(state);
}

async function stopSession() {
  const state = await getAppState();
  if (!state.isActive || !state.currentSession) return;

  // Finalize last page
  if (state.currentSession.pages.length > 0) {
    const lastPage = state.currentSession.pages[state.currentSession.pages.length - 1];
    if (!lastPage.endTime) lastPage.endTime = nowSeconds();
  }

  // Export
  await downloadSession(state.currentSession);
  await sendToApi(state.currentSession);

  // Clear state
  state.isActive = false;
  state.currentSession = null;
  await saveAppState(state);
}

async function addPage(url: string, title?: string) {
  const state = await getAppState();
  if (!state.isActive || !state.currentSession) return;

  // Filter internal pages
  if (url.startsWith("chrome://") || url.startsWith("chrome-extension://")) return;

  // Avoid duplicates
  if (state.currentSession.pages.length > 0) {
    const lastPage = state.currentSession.pages[state.currentSession.pages.length - 1];
    if (lastPage.url === url) return;
    
    // Finalize previous page duration
    if (!lastPage.endTime) lastPage.endTime = nowSeconds();
  }

  const newPage: PageInfo = {
    url,
    title: title || url,
    startTime: nowSeconds(),
    clicks: 0,
    scrolled: false
  };

  state.currentSession.pages.push(newPage);
  await saveAppState(state);
}

async function updateStats(url: string, clicks: number, scrolled: boolean) {
  const state = await getAppState();
  if (!state.isActive || !state.currentSession || state.currentSession.pages.length === 0) return;

  const currentPage = state.currentSession.pages[state.currentSession.pages.length - 1];
  if (currentPage.url === url) {
    currentPage.clicks = clicks;
    currentPage.scrolled = scrolled || currentPage.scrolled;
    await saveAppState(state);
  }
}

// --- Listeners ---

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const action = message.action || message.type;

  if (action === "startSession") {
    startSession().then(() => sendResponse({ ok: true }));
    return true;
  }
  if (action === "stopSession") {
    stopSession().then(() => sendResponse({ ok: true }));
    return true;
  }
  if (action === "PAGE_STATS") {
    updateStats(message.url, message.clicks, message.scrolled).then(() => sendResponse({ ok: true }));
    return true;
  }
  if (action === "GET_STATE") {
    getAppState().then(sendResponse);
    return true;
  }
});

chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId !== 0) return;
  try {
    const tab = await chrome.tabs.get(details.tabId);
    if (tab && tab.url) {
      await addPage(tab.url, tab.title);
    }
  } catch (e) {
    // Tab might be gone
  }
});

// Initialize on install or startup
chrome.runtime.onInstalled.addListener(async () => {
  const state = await getAppState();
  await saveAppState(state); // Sync manifest badges
});

chrome.runtime.onStartup.addListener(async () => {
  const state = await getAppState();
  await saveAppState(state); // Sync manifest badges
});
