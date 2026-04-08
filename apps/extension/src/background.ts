// ============================================================
// AntiSludge — Background Service Worker
// Manages session tracking, navigation events, and auto-download
// ============================================================

export {}

import Icon from "@/assets/icon.png"

// --- Types ---
interface Page {
  order: number;
  url: string;
  title: string;
  enteredAt: string;
  leftAt: string | null;
  duration: string | null;
  durationMs: number;
  clicks: number;
  scrolled: boolean;
}

interface Session {
  sessionId: string;
  startTime: string;
  endTime: string | null;
  totalDuration: string | null;
  totalDurationMs: number;
  pages: Page[];
}

// --- State ---
let isActive = false;
let session: Session | null = null;

// --- Helpers ---
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function formatDuration(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  if (min === 0) return `${sec}s`;
  return `${min}min ${sec}s`;
}

function isoNow() {
  return new Date().toISOString();
}

// --- Session Management ---
function createSession(): Session {
  return {
    sessionId: generateId(),
    startTime: isoNow(),
    endTime: null,
    totalDuration: null,
    totalDurationMs: 0,
    pages: []
  };
}

function finalizeCurrentPage() {
  if (!session || session.pages.length === 0) return;
  const page = session.pages[session.pages.length - 1];
  if (!page.leftAt) {
    page.leftAt = isoNow();
    page.durationMs = new Date(page.leftAt).getTime() - new Date(page.enteredAt).getTime();
    page.duration = formatDuration(page.durationMs);
  }
}

async function addPage(url: string, title?: string) {
  if (!session || !isActive) return;

  // Don't track chrome:// or extension pages
  if (url.startsWith("chrome://") || url.startsWith("chrome-extension://")) return;

  // Don't add duplicate consecutive pages
  if (session.pages.length > 0) {
    const lastPage = session.pages[session.pages.length - 1];
    if (lastPage.url === url) return;
  }

  // Finalize previous page
  finalizeCurrentPage();

  const page: Page = {
    order: session.pages.length + 1,
    url: url,
    title: title || url,
    enteredAt: isoNow(),
    leftAt: null,
    duration: null,
    durationMs: 0,
    clicks: 0,
    scrolled: false
  };

  session.pages.push(page);
  saveSession();
}

function saveSession() {
  if (session) {
    chrome.storage.local.set({ currentSession: session });
  }
}

// --- Toggle ---
async function activate() {
  isActive = true;
  session = createSession();
  await chrome.storage.local.set({ isActive: true, currentSession: session });
  chrome.action.setIcon({ path: Icon });
  chrome.action.setBadgeText({ text: "ON" });
  chrome.action.setBadgeBackgroundColor({ color: "#00AA66" });
}

async function deactivate() {
  // Finalize last page
  finalizeCurrentPage();

  if (session) {
    session.endTime = isoNow();
    session.totalDurationMs = new Date(session.endTime).getTime() - new Date(session.startTime).getTime();
    session.totalDuration = formatDuration(session.totalDurationMs);

    // Auto-download the session log
    await downloadSession(session);
  }

  isActive = false;
  session = null;

  await chrome.storage.local.set({ isActive: false, currentSession: null });
  chrome.action.setIcon({ path: Icon });
  chrome.action.setBadgeText({ text: "" });
}

async function downloadSession(sessionData: Session) {
  const json = JSON.stringify(sessionData, null, 2);
  const blob = new Blob([json], { type: "application/json" });

  // Convert blob to data URL using a simpler way for MV3 service worker
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

// --- Navigation Listener ---
chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (!isActive || !session) return;
  if (details.frameId !== 0) return; // Only main frame

  try {
    const tab = await chrome.tabs.get(details.tabId);
    if (tab && tab.url) {
      addPage(tab.url, tab.title);
    }
  } catch (e) {
    // Tab may have been closed
  }
});

// --- Message Listener (from content script and popup) ---
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE") {
    if (isActive) {
      deactivate().then(() => sendResponse({ isActive: false }));
    } else {
      activate().then(() => sendResponse({ isActive: true }));
    }
    return true; // async response
  }

  if (message.type === "GET_STATE") {
    sendResponse({ isActive, session });
    return;
  }

  if (message.type === "PAGE_STATS") {
    // Update clicks and scroll for the current page
    if (session && session.pages.length > 0 && isActive) {
      const currentPage = session.pages[session.pages.length - 1];
      if (message.url === currentPage.url) {
        currentPage.clicks = message.clicks || currentPage.clicks;
        currentPage.scrolled = message.scrolled || currentPage.scrolled;
        saveSession();
      }
    }
    sendResponse({ ok: true });
    return;
  }
});

// --- Restore state on startup ---
chrome.runtime.onStartup.addListener(async () => {
  const data = await chrome.storage.local.get(["isActive", "currentSession"]);
  if (data.isActive) {
    isActive = true;
    session = data.currentSession;
    chrome.action.setIcon({ path: Icon });
    chrome.action.setBadgeText({ text: "ON" });
    chrome.action.setBadgeBackgroundColor({ color: "#00AA66" });
  }
});

// Also restore on install/update
chrome.runtime.onInstalled.addListener(async () => {
  const data = await chrome.storage.local.get(["isActive"]);
  if (!data.isActive) {
    await chrome.storage.local.set({ isActive: false, currentSession: null });
    chrome.action.setIcon({ path: Icon });
  }
});
