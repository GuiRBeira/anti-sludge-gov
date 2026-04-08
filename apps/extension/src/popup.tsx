import { useEffect, useState } from "react";
import {
  BrHeader,
  BrSwitch,
  BrTag,
  BrItem,
  BrList,
  BrCard,
  BrHeaderLogo,
  BrIcon,
} from "@govbr-ds/webcomponents-react";
import "./popup.css";
import logo from "@/assets/icon.png";

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

export default function IndexPopup() {
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [timer, setTimer] = useState("00:00");
  const [showFinishedBanner, setShowFinishedBanner] = useState(false);

  // --- Fetch state ---
  const updateState = () => {
    chrome.runtime.sendMessage({ type: "GET_STATE" }, (response) => {
      if (response) {
        setIsActive(response.isActive);
        setSession(response.session);
      }
    });
  };

  // --- Toggle ---
  const handleToggle = () => {
    chrome.runtime.sendMessage({ type: "TOGGLE" }, (response) => {
      if (response) {
        setIsActive(response.isActive);
        if (!response.isActive) {
          setShowFinishedBanner(true);
          setTimeout(() => {
            setSession(null);
          }, 100);
        } else {
          setShowFinishedBanner(false);
        }
      }
    });
  };

  // --- State Polling ---
  useEffect(() => {
    updateState();
    const interval = setInterval(updateState, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- Timer logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && session?.startTime) {
      const startTime = new Date(session.startTime).getTime();

      const updateTimer = () => {
        const elapsed = Date.now() - startTime;
        const totalSec = Math.floor(elapsed / 1000);
        const min = Math.floor(totalSec / 60)
          .toString()
          .padStart(2, "0");
        const sec = (totalSec % 60).toString().padStart(2, "0");
        setTimer(`${min}:${sec}`);
      };

      updateTimer();
      interval = setInterval(updateTimer, 1000);
    } else {
      setTimer("00:00");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, session?.startTime]);

  const formatUrl = (urlStr: string) => {
    try {
      const u = new URL(urlStr);
      let displayUrl = u.hostname + u.pathname;
      if (displayUrl.length > 40) {
        displayUrl = displayUrl.substring(0, 37) + "...";
      }
      return displayUrl;
    } catch (e) {
      return urlStr;
    }
  };

  const getPageDuration = (page: Page) => {
    if (page.duration) return page.duration;
    if (page.enteredAt) {
      const elapsed = Date.now() - new Date(page.enteredAt).getTime();
      const sec = Math.floor(elapsed / 1000);
      const min = Math.floor(sec / 60);
      if (min > 0) return `${min}m ${sec % 60}s`;
      return `${sec}s`;
    }
    return "agora";
  };

  return (
    <div className="popup-container">
      {/* 1. Header Section */}
      <div className="header-wrapper">
        <BrHeader 
          caption="AntiSludge" 
          subcaption="Auditoria de Fricção Digital"
        >
          <div slot="header-logo">
            <BrHeaderLogo>
              <img src={logo} alt="AntiSludge Logo" className="header-logo-img" />
            </BrHeaderLogo>
          </div>
        </BrHeader>
      </div>

      {/* 2. Dashboard Section */}
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="status-indicator">
            <span className="status-label">Monitoramento</span>
            <BrTag color={isActive ? "success" : "danger"}>
              <BrIcon
                className={`fas fa-circle ${isActive ? "fa-pulse" : ""}`}
                style={{ marginRight: "6px", fontSize: "8px" }}
              ></BrIcon>
              {isActive ? "Ativo" : "Inativo"}
            </BrTag>
          </div>
          <BrSwitch 
            label={isActive ? "Parar" : "Iniciar"} 
            checked={isActive} 
            onClick={handleToggle}
          />
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-header">
              <BrIcon className="far fa-clock stat-icon"></BrIcon>
              <span className="stat-label">Tempo Total</span>
            </div>
            <span className="stat-value">{timer}</span>
          </div>
          <div className="stat-item">
             <div className="stat-header">
              <BrIcon className="far fa-file-alt stat-icon"></BrIcon>
              <span className="stat-label">Páginas</span>
            </div>
            <span className="stat-value">{session?.pages?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* 3. Notifications */}
      {showFinishedBanner && (
        <div className="finished-banner">
          <BrIcon className="fas fa-check-circle" style={{ color: "var(--success)" }}></BrIcon>
          <span>Sessão finalizada. Log baixado.</span>
        </div>
      )}

      {/* 4. Timeline Section */}
      <div className="timeline-section">
        <div className="timeline-title">
          <BrIcon className="fas fa-history"></BrIcon> Jornada do Cidadão
        </div>
        
        {!isActive && !session?.pages?.length ? (
          <div className="empty-state">
            <div className="empty-icon">🛡️</div>
            <p style={{ fontWeight: 600, fontSize: "14px", marginBottom: "4px" }}>Pronto para Auditar</p>
            <p style={{ fontSize: "12px" }}>Inicie para capturar pontos de fricção.</p>
          </div>
        ) : (
          <BrList>
            {(session?.pages || []).map((page, index) => (
              <BrCard key={index} className="timeline-card">
                <BrItem>
                  <div className="timeline-item-content">
                    <div className="page-title">{page.title}</div>
                    <span className="page-url">{formatUrl(page.url)}</span>
                    <div className="page-metrics">
                      <BrTag color="info">
                        <BrIcon className="far fa-clock" style={{marginRight: '4px'}}></BrIcon>
                        {getPageDuration(page)}
                      </BrTag>
                      <BrTag color="warning">
                        <BrIcon className="far fa-hand-point-up" style={{marginRight: '4px'}}></BrIcon>
                        {page.clicks} cliques
                      </BrTag>
                      {page.scrolled && (
                        <BrTag color="success">
                          <BrIcon className="fas fa-arrows-alt-v" style={{marginRight: '4px'}}></BrIcon>
                          scroll
                        </BrTag>
                      )}
                    </div>
                  </div>
                </BrItem>
              </BrCard>
            ))}
          </BrList>
        )}
      </div>

      {/* 5. Footer */}
      <div className="footer-simple">Versão 1.0.0 — UTFPR & CINCO/MGI</div>
    </div>
  );
}
