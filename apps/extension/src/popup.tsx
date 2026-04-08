import { useEffect, useState } from "react"
import { BrHeader, BrSwitch, BrBadge, BrItem, BrList } from "@govbr-ds/webcomponents-react"
import "./popup.css"

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
  const [isActive, setIsActive] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [timer, setTimer] = useState("00:00")
  const [showFinishedBanner, setShowFinishedBanner] = useState(false)

  // --- Fetch state ---
  const updateState = () => {
    chrome.runtime.sendMessage({ type: "GET_STATE" }, (response) => {
      if (response) {
        setIsActive(response.isActive)
        setSession(response.session)
      }
    })
  }

  // --- Toggle ---
  const handleToggle = () => {
    chrome.runtime.sendMessage({ type: "TOGGLE" }, (response) => {
      if (response) {
        setIsActive(response.isActive)
        if (!response.isActive) {
          setShowFinishedBanner(true)
          setTimeout(() => {
            setSession(null)
          }, 100)
        } else {
          setShowFinishedBanner(false)
        }
      }
    })
  }

  // --- State Polling ---
  useEffect(() => {
    updateState()
    const interval = setInterval(updateState, 2000)
    return () => clearInterval(interval)
  }, [])

  // --- Timer logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isActive && session?.startTime) {
      const startTime = new Date(session.startTime).getTime()
      
      const updateTimer = () => {
        const elapsed = Date.now() - startTime
        const totalSec = Math.floor(elapsed / 1000)
        const min = Math.floor(totalSec / 60).toString().padStart(2, "0")
        const sec = (totalSec % 60).toString().padStart(2, "0")
        setTimer(`${min}:${sec}`)
      }
      
      updateTimer()
      interval = setInterval(updateTimer, 1000)
    } else {
      setTimer("00:00")
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, session?.startTime])

  const formatUrl = (urlStr: string) => {
    try {
      const u = new URL(urlStr)
      let displayUrl = u.hostname + u.pathname
      if (displayUrl.length > 50) {
        displayUrl = displayUrl.substring(0, 47) + "..."
      }
      return displayUrl
    } catch (e) {
      return urlStr
    }
  }

  const getPageDuration = (page: Page) => {
    if (page.duration) return page.duration
    if (page.enteredAt) {
      const elapsed = Date.now() - new Date(page.enteredAt).getTime()
      const sec = Math.floor(elapsed / 1000)
      const min = Math.floor(sec / 60)
      if (min > 0) return `${min}min ${sec % 60}s`
      return `${sec}s`
    }
    return "agora"
  }

  return (
    <div className="popup-container">
      {/* DSGOV Header */}
      <BrHeader 
        title="AntiSludge" 
      />

      {/* Control Bar */}
      <div className="main-content" style={{ padding: '8px 16px', background: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <span style={{ fontSize: '14px', fontWeight: 600 }}>Status:</span>
             <BrBadge type={isActive ? "success" : "danger"}>
               {isActive ? "Ativo" : "Inativo"}
             </BrBadge>
          </div>
          <BrSwitch 
            label={isActive ? "Parar" : "Iniciar"} 
            checked={isActive} 
            onClick={handleToggle}
          />
        </div>
      </div>

      {/* Finished Banner */}
      {showFinishedBanner && (
        <div className="finished-banner">
          <i className="fas fa-check-circle"></i> Sessão finalizada — log baixado
        </div>
      )}

      {/* Session Info Bar */}
      {isActive && (
        <div className="session-info-bar">
          <span>Tempo decorrido: <span className="timer-text">{timer}</span></span>
          <span>{session?.pages?.length || 0} página(s)</span>
        </div>
      )}

      {/* Content Area */}
      <div className="main-content">
        {!isActive && !session?.pages?.length && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
            <p style={{ fontWeight: 600 }}>Monitoramento desativado</p>
            <p style={{ fontSize: '12px' }}>Inicie para rastrear sua jornada.</p>
          </div>
        )}

        {isActive && (!session?.pages || session.pages.length === 0) && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontWeight: 600 }}>Aguardando primeira página...</p>
          </div>
        )}

        {session?.pages && session.pages.length > 0 && (
          <div className="timeline-list">
            {session.pages.map((page, index) => (
              <div key={index} className="timeline-item-custom">
                <div className="card-title">{page.title}</div>
                <div className="card-url">{formatUrl(page.url)}</div>
                <div className="card-tags">
                  <BrBadge type="info" style={{ fontSize: '9px' }}>
                    <i className="fas fa-clock"></i> {getPageDuration(page)}
                  </BrBadge>
                  <BrBadge type="warning" style={{ fontSize: '9px' }}>
                    <i className="fas fa-mouse-pointer"></i> {page.clicks} cliques
                  </BrBadge>
                  {page.scrolled && (
                    <BrBadge type="success" style={{ fontSize: '9px' }}>
                      <i className="fas fa-arrows-alt-v"></i> scroll
                    </BrBadge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Simplified Footer */}
      <div className="footer-simple">
        AntiSludge v1.0 — Transparência Digital
      </div>
    </div>
  )
}
