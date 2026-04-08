// ============================================================
// AntiSludge — Popup Script
// Renders session timeline and manages toggle interaction
// ============================================================

const toggleSwitch = document.getElementById("toggleSwitch");
const statusBadge = document.getElementById("statusBadge");
const sessionInfo = document.getElementById("sessionInfo");
const sessionTimer = document.getElementById("sessionTimer");
const pagesCount = document.getElementById("pagesCount");
const content = document.getElementById("content");
const emptyState = document.getElementById("emptyState");
const timeline = document.getElementById("timeline");
const finishedBanner = document.getElementById("finishedBanner");

let timerInterval = null;
let sessionStartTime = null;

// --- Init ---
chrome.runtime.sendMessage({ type: "GET_STATE" }, (response) => {
  if (!response) return;

  if (response.isActive && response.session) {
    setActiveUI(true);
    sessionStartTime = new Date(response.session.startTime);
    startTimer();
    renderTimeline(response.session);
  } else {
    setActiveUI(false);
  }
});

// --- Toggle ---
toggleSwitch.addEventListener("change", () => {
  chrome.runtime.sendMessage({ type: "TOGGLE" }, (response) => {
    if (!response) return;

    if (response.isActive) {
      setActiveUI(true);
      sessionStartTime = new Date();
      startTimer();
      renderTimeline(null);
      finishedBanner.classList.remove("visible");
    } else {
      setActiveUI(false);
      stopTimer();
      finishedBanner.classList.add("visible");

      // Show empty after a moment
      setTimeout(() => {
        timeline.style.display = "none";
        timeline.innerHTML = "";
        emptyState.style.display = "";
        content.style.display = "";
      }, 100);
    }
  });
});

// --- UI State ---
function setActiveUI(active) {
  toggleSwitch.checked = active;

  if (active) {
    statusBadge.textContent = "Ativo";
    statusBadge.className = "status-badge active";
    sessionInfo.style.display = "flex";
    emptyState.style.display = "none";
  } else {
    statusBadge.textContent = "Inativo";
    statusBadge.className = "status-badge inactive";
    sessionInfo.style.display = "none";
  }
}

// --- Timer ---
function startTimer() {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function updateTimer() {
  if (!sessionStartTime) return;
  const elapsed = Date.now() - sessionStartTime.getTime();
  const totalSec = Math.floor(elapsed / 1000);
  const min = Math.floor(totalSec / 60).toString().padStart(2, "0");
  const sec = (totalSec % 60).toString().padStart(2, "0");
  sessionTimer.textContent = `${min}:${sec}`;
}

// --- Render Timeline ---
function renderTimeline(session) {
  timeline.innerHTML = "";

  if (!session || !session.pages || session.pages.length === 0) {
    timeline.style.display = "none";
    content.style.display = "";
    emptyState.style.display = "";
    emptyState.querySelector(".title").textContent = "Aguardando navegação...";
    emptyState.querySelector(".subtitle").textContent = "Navegue por um site para começar\na registrar sua jornada";
    emptyState.querySelector(".icon").textContent = "🔍";
    return;
  }

  content.style.display = "none";
  timeline.style.display = "block";

  const pageCount = session.pages.length;
  pagesCount.textContent = `${pageCount} página${pageCount !== 1 ? "s" : ""}`;

  session.pages.forEach((page, index) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.style.animationDelay = `${index * 0.05}s`;

    // Duration display
    let durationText = "agora";
    if (page.duration) {
      durationText = page.duration;
    } else if (page.enteredAt) {
      const elapsed = Date.now() - new Date(page.enteredAt).getTime();
      const sec = Math.floor(elapsed / 1000);
      const min = Math.floor(sec / 60);
      if (min > 0) durationText = `${min}min ${sec % 60}s`;
      else durationText = `${sec}s`;
    }

    // Shorten URL for display
    let displayUrl = page.url;
    try {
      const u = new URL(page.url);
      displayUrl = u.hostname + u.pathname;
      if (displayUrl.length > 50) {
        displayUrl = displayUrl.substring(0, 47) + "...";
      }
    } catch (e) {}

    // Scroll tag
    const scrollTag = page.scrolled
      ? `<span class="meta-tag scroll-yes">↕ scroll</span>`
      : `<span class="meta-tag scroll-no">— sem scroll</span>`;

    item.innerHTML = `
      <div class="timeline-line">
        <div class="timeline-dot"></div>
        <div class="timeline-connector"></div>
      </div>
      <div class="timeline-card">
        <span class="card-order">Página ${page.order}</span>
        <div class="card-title" title="${escapeHtml(page.title)}">${escapeHtml(page.title)}</div>
        <div class="card-url" title="${escapeHtml(page.url)}">${escapeHtml(displayUrl)}</div>
        <div class="card-meta">
          <span class="meta-tag">⏱ ${durationText}</span>
          <span class="meta-tag clicks">🖱 ${page.clicks} clique${page.clicks !== 1 ? "s" : ""}</span>
          ${scrollTag}
        </div>
      </div>
    `;

    timeline.appendChild(item);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str || "";
  return div.innerHTML;
}

// --- Live update: poll every 2s ---
setInterval(() => {
  if (!toggleSwitch.checked) return;

  chrome.runtime.sendMessage({ type: "GET_STATE" }, (response) => {
    if (!response || !response.isActive) return;
    renderTimeline(response.session);
  });
}, 2000);