/* global React, Sidebar, NumeroEtapa, SketchFrame, SketchUnderline,
   WatercolorSplatter, StatusPill, TrilhaJornada, BarreiraIcon, DesvioX, LoopRepeticao */

// =====================================================================
//  Screen 6 — Empty state (/processos) celebratório
// =====================================================================
function EmptyProcessos({ dark = false }) {
  return (
    <div className={`paper-grain ${dark ? 'theme-dark' : ''}`} style={{ background:'hsl(var(--background))', minHeight: '100%' }}>
      <div style={{ display:'flex', minHeight:'100%' }}>
        <Sidebar active="processos" dark={dark}/>
        <div style={{ flex: 1, display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'14px 28px', borderBottom:'1px solid hsl(var(--border))', fontSize: 13, color:'hsl(var(--muted-foreground))', display:'flex', alignItems:'center', gap: 8 }}>
            Processos
            <span style={{ marginLeft:'auto' }}>
              <button className="btn btn-primary" style={{ fontSize: 13 }}>+ Novo processo</button>
            </span>
          </div>

          <div style={{ flex: 1, display:'grid', placeItems:'center', padding: 36, position:'relative' }}>
            <div style={{ position:'relative', maxWidth: 540, textAlign:'center' }}>
              <div style={{ position:'absolute', top:-30, left:-60, pointerEvents:'none' }}>
                <WatercolorSplatter size={220} rotation={-12} opacity={0.4} seed={3}/>
              </div>
              <div style={{ position:'absolute', bottom:-30, right:-50, pointerEvents:'none' }}>
                <WatercolorSplatter size={140} rotation={28} opacity={0.35} seed={7} color="hsl(var(--primary))"/>
              </div>

              {/* trilha illustration */}
              <div style={{ position:'relative', height: 150, marginBottom: 14 }}>
                <svg viewBox="0 0 320 150" width="320" height="150" style={{ overflow:'visible' }} aria-hidden="true">
                  <path d="M 20 120 Q 80 30, 160 80 T 300 40"
                        stroke="hsl(var(--destructive))" strokeWidth="3" fill="none" strokeDasharray="5 7" strokeLinecap="round"/>
                  {/* footprints */}
                  {[40,90,160,225,290].map((x,i)=>(
                    <g key={i} transform={`translate(${x} ${120 - i*15})`}>
                      <circle r="5" fill="hsl(var(--destructive))"/>
                      <circle r="9" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1" opacity="0.4"/>
                    </g>
                  ))}
                  {/* X flag */}
                  <g transform="translate(296 30)">
                    <line x1="0" y1="0" x2="0" y2="22" stroke="hsl(var(--ink))" strokeWidth="2"/>
                    <path d="M 0 0 L 18 4 L 0 10 Z" fill="hsl(var(--accent))" stroke="hsl(var(--ink))" strokeWidth="1.2"/>
                  </g>
                </svg>
              </div>

              <SketchFrame seed={11} padX={22} padY={10}>
                <span className="font-hand" style={{ fontSize: 36 }}>Comece uma pesquisa</span>
              </SketchFrame>
              <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.6, color:'hsl(var(--muted-foreground))' }}>
                Cada processo é uma trilha do serviço público sob análise. Cadastre um — depois recrute participantes, observe suas jornadas reais e meça onde o caminho enrosca.
              </p>
              <div style={{ marginTop: 22, display:'flex', gap: 12, justifyContent:'center' }}>
                <button className="btn btn-primary">+ Novo processo</button>
                <button className="btn btn-outline">ver catálogo F5</button>
              </div>
              <div className="font-hand" style={{ marginTop: 22, color:'hsl(var(--muted-foreground))', transform:'rotate(-1deg)', fontSize: 16 }}>
                ↑ você precisa estar vinculado a um <strong>órgão</strong> primeiro · fale com o admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================================
//  Screen 7 — Mobile (375px) — Hub
// =====================================================================
function HubMobile({ dark = false }) {
  const etapas = [
    { ordem: 1, t:'Contexto', s:'concluido', d:'6/6 campos' },
    { ordem: 2, t:'Jornada planejada', s:'concluido', d:'6 passos' },
    { ordem: 3, t:'Participantes', s:'concluido', d:'12 cadastrados' },
    { ordem: 4, t:'Individuais', s:'em_progresso', d:'7 de 12 validadas' },
    { ordem: 5, t:'Jornada padrão', s:'em_progresso', d:'rascunho' },
    { ordem: 6, t:'Resultados', s:'pendente', d:'aguarda' },
    { ordem: 7, t:'Relatório', s:'pendente', d:'aguarda' },
  ];
  return (
    <div className={`paper-grain ${dark ? 'theme-dark' : ''}`} style={{ background:'hsl(var(--background))', minHeight: '100%', width: '100%' }}>
      {/* Top bar */}
      <div style={{ display:'flex', alignItems:'center', padding: '14px 16px', borderBottom:'1px solid hsl(var(--border))', background:'hsl(var(--card))', gap: 10 }}>
        <button style={{ background:'transparent', border:0, fontSize: 22, color:'hsl(var(--foreground))' }}>☰</button>
        <div style={{ lineHeight: 1.1 }}>
          <div className="font-hand" style={{ fontSize: 18 }}>Anti-Sludge</div>
          <div className="font-mono" style={{ fontSize: 9, opacity: 0.55, letterSpacing:'0.1em', textTransform:'uppercase' }}>FCINCO · MGI</div>
        </div>
        <div style={{ marginLeft:'auto', width: 28, height: 28, borderRadius: 999, background:'hsl(var(--accent))', display:'grid', placeItems:'center', fontWeight: 700, fontSize: 11 }}>JN</div>
      </div>

      <div style={{ padding: '14px 16px 6px' }}>
        <div className="font-mono" style={{ fontSize: 10, color:'hsl(var(--muted-foreground))', letterSpacing:'0.1em', textTransform:'uppercase' }}>Processo</div>
        <h1 className="font-hand" style={{ fontSize: 28, lineHeight: 1.1, margin: '4px 0 6px' }}>
          Cadastro de CPF para <span className="marker">estrangeiro</span>
        </h1>
        <div style={{ display:'flex', gap: 14, flexWrap:'wrap', marginTop: 8 }}>
          <div><div className="font-display" style={{ fontSize: 26, lineHeight: 1 }}>12</div><div className="font-mono" style={{ fontSize: 9, textTransform:'uppercase', color:'hsl(var(--muted-foreground))' }}>participantes</div></div>
          <div><div className="font-display" style={{ fontSize: 26, lineHeight: 1 }}>7</div><div className="font-mono" style={{ fontSize: 9, textTransform:'uppercase', color:'hsl(var(--muted-foreground))' }}>válidas</div></div>
          <div><div className="font-display" style={{ fontSize: 26, lineHeight: 1, color:'hsl(var(--destructive))' }}>3</div><div className="font-mono" style={{ fontSize: 9, textTransform:'uppercase', color:'hsl(var(--muted-foreground))' }}>críticas</div></div>
        </div>
      </div>

      <div style={{ padding: '14px 16px', display:'flex', alignItems:'baseline', gap: 8 }}>
        <h2 className="font-sans" style={{ fontSize: 14, fontWeight: 600, margin: 0, textTransform:'uppercase', letterSpacing:'0.04em' }}>Status</h2>
        <SketchUnderline width={70}/>
      </div>

      <div style={{ position:'relative', padding: '0 16px 24px' }}>
        {/* trilha line */}
        <svg width="100%" height={etapas.length * 78 + 10} style={{ position:'absolute', left: 16, top: 0, pointerEvents:'none' }} aria-hidden="true">
          {etapas.map((e, i) => {
            if (i === etapas.length - 1) return null;
            const y1 = i * 78 + 46;
            const y2 = (i+1) * 78 + 16;
            const done = e.s === 'concluido' && etapas[i+1].s !== 'pendente';
            return done
              ? <line key={i} x1="14" y1={y1} x2="14" y2={y2} stroke="hsl(var(--trilha))" strokeWidth="2.6" strokeLinecap="round"/>
              : <line key={i} x1="14" y1={y1} x2="14" y2={y2} stroke="hsl(var(--trilha))" strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" opacity={etapas[i+1].s === 'pendente' ? 0.45 : 1}/>;
          })}
        </svg>
        {etapas.map((e, i) => (
          <div key={e.ordem} style={{ position:'relative', height: 78, display:'flex', alignItems:'center' }}>
            <div style={{
              width: 30, height: 30, borderRadius: 999,
              background: e.s === 'pendente' ? 'hsl(var(--card))' : 'hsl(var(--trilha))',
              border: `2px ${e.s === 'pendente' ? 'dashed' : 'solid'} hsl(var(--trilha))`,
              display:'grid', placeItems:'center', flexShrink:0,
              boxShadow: '0 0 0 4px hsl(var(--background))',
              transform: 'rotate(-3deg)',
            }}>
              <span className="font-display" style={{ fontSize: 14, color: e.s === 'pendente' ? 'hsl(var(--muted-foreground))' : 'hsl(var(--accent))', transform: 'rotate(3deg)' }}>{String(e.ordem).padStart(2,'0')}</span>
            </div>
            <div style={{ marginLeft: 14, flex: 1, padding: '10px 12px', border:'1px solid hsl(var(--border))', borderRadius: 8, background:'hsl(var(--card))', opacity: e.s === 'pendente' ? 0.65 : 1 }}>
              <div style={{ display:'flex', alignItems:'center', gap: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{e.t}</span>
                <StatusPill tone={e.s} dark={dark}>{e.s === 'em_progresso' ? 'em curso' : e.s}</StatusPill>
              </div>
              <div className="font-mono" style={{ fontSize: 11, color:'hsl(var(--muted-foreground))', marginTop: 2 }}>{e.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================================
//  Screen 8 — Mobile (375px) — Trilha individual com desvio
// =====================================================================
function TrilhaMobile({ dark = false }) {
  const passos = [
    { ord: 1, txt:'Login único', tempo: 22 },
    { ord: 2, txt:'Clique em "esqueci senha"', tempo: 41, marc:'desvio' },
    { ord: 3, txt:'Buscar CPF estrangeiro', tempo: 28 },
    { ord: 4, txt:'Termo de uso', tempo: 84 },
    { ord: 5, txt:'Dados pessoais', tempo: 188 },
    { ord: 6, txt:'Upload passaporte (×3)', tempo: 246, marc:'repeticao' },
  ];
  return (
    <div className={`paper-grain ${dark ? 'theme-dark' : ''}`} style={{ background:'hsl(var(--background))', minHeight: '100%' }}>
      <div style={{ display:'flex', alignItems:'center', padding:'12px 16px', borderBottom:'1px solid hsl(var(--border))', background:'hsl(var(--card))', gap: 10 }}>
        <button style={{ background:'transparent', border:0, fontSize: 20, color:'hsl(var(--foreground))' }}>←</button>
        <div>
          <div className="font-mono" style={{ fontSize: 9, opacity: 0.55, letterSpacing:'0.1em', textTransform:'uppercase' }}>P07 · individual</div>
          <div className="font-hand" style={{ fontSize: 19, lineHeight: 1 }}>Sofia · trilha real</div>
        </div>
        <button className="btn btn-primary" style={{ marginLeft:'auto', fontSize: 11, padding:'5px 9px' }}>✓ valida</button>
      </div>

      {/* Replay control */}
      <div style={{ padding: '12px 16px', display:'flex', alignItems:'center', gap: 10, borderBottom:'1px solid hsl(var(--border))' }}>
        <button className="btn btn-primary" style={{ padding:'6px 10px' }}>▶</button>
        <div style={{ flex: 1, height: 6, background:'hsl(var(--muted))', borderRadius: 999, position:'relative' }}>
          <div style={{ width:'40%', height:'100%', background:'hsl(var(--trilha))', borderRadius: 999 }}/>
        </div>
        <span className="font-mono" style={{ fontSize: 11, color:'hsl(var(--muted-foreground))' }}>4:21/10:37</span>
      </div>

      {/* trilha */}
      <div style={{ position:'relative', padding: '14px 16px' }}>
        <svg width="100%" height={passos.length * 96} style={{ position:'absolute', left: 16, top: 14, pointerEvents:'none' }} aria-hidden="true">
          {passos.map((_, i) => {
            if (i === passos.length - 1) return null;
            const y1 = i * 96 + 40;
            const y2 = (i+1) * 96 + 16;
            return <line key={i} x1="14" y1={y1} x2="14" y2={y2} stroke="hsl(var(--trilha))" strokeWidth="2.4" strokeDasharray="3 5" strokeLinecap="round"/>;
          })}
        </svg>
        {passos.map((p, i) => (
          <div key={p.ord} style={{ position:'relative', minHeight: 96, display:'flex', alignItems:'flex-start', gap: 14, paddingTop: 4 }}>
            <div style={{ width: 30, height: 30, borderRadius: 999, background:'hsl(var(--trilha))', display:'grid', placeItems:'center', flexShrink:0, boxShadow:'0 0 0 4px hsl(var(--background))', transform:'rotate(-3deg)' }}>
              <span className="font-display" style={{ fontSize: 14, color:'hsl(var(--accent))', transform:'rotate(3deg)' }}>{String(p.ord).padStart(2,'0')}</span>
            </div>
            <div style={{ flex: 1, padding: '10px 12px', border:'1px solid hsl(var(--border))', borderRadius: 8, background:'hsl(var(--card))', position:'relative' }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{p.txt}</div>
              <div style={{ display:'flex', alignItems:'center', gap: 8, marginTop: 6, flexWrap:'wrap' }}>
                <span className="font-mono" style={{ fontSize: 11, color:'hsl(var(--muted-foreground))' }}>⏱ {p.tempo}s</span>
                {p.marc === 'desvio' && <StatusPill tone="desvio" dark={dark}>desvio</StatusPill>}
                {p.marc === 'repeticao' && <StatusPill tone="repeticao" dark={dark}>×3</StatusPill>}
              </div>
              {p.marc === 'desvio' && <div style={{ position:'absolute', top: -8, right: 6 }}><DesvioX size={32}/></div>}
              {p.marc === 'repeticao' && <div style={{ position:'absolute', top: -10, right: 6 }}><LoopRepeticao size={34}/></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.EmptyProcessos = EmptyProcessos;
window.HubMobile = HubMobile;
window.TrilhaMobile = TrilhaMobile;
