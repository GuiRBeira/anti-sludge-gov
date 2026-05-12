/* global React, SketchFrame, SketchUnderline, NumeroEtapa, WatercolorSplatter,
   StatusPill, BarreiraIcon, DesvioX, LoopRepeticao, Sidebar, CrumbBar,
   TrilhaJornada */

// =====================================================================
//  Screen 1 — Hub do processo (/processos/[id]) — 7 etapas como TRILHA
// =====================================================================
const ETAPAS_HUB = [
  { ordem: 1, titulo: 'Compreensão do contexto', desc: 'Objetivo, abrangência, público, hipóteses iniciais.', status: 'concluido',     detalhe: '6 de 6 campos preenchidos · há 2 dias' },
  { ordem: 2, titulo: 'Jornada planejada',       desc: 'Sequência ideal de passos do serviço.',              status: 'concluido',     detalhe: '6 passos · 8 questionários vinculados' },
  { ordem: 3, titulo: 'Participantes',           desc: 'Cadastro anonimizado e termos LGPD.',                 status: 'concluido',     detalhe: '12 participantes · 12 LGPD assinados' },
  { ordem: 4, titulo: 'Jornadas individuais',    desc: 'Observação real de cada participante.',               status: 'em_progresso',  detalhe: '7 de 12 jornadas validadas' },
  { ordem: 5, titulo: 'Jornada padrão',          desc: 'Síntese das individuais, fechando o real.',           status: 'em_progresso',  detalhe: 'rascunho · 4 passos consolidados' },
  { ordem: 6, titulo: 'Resultados',              desc: 'Médias de barreiras, impactos, tempos.',              status: 'pendente',      detalhe: 'gera após jornada padrão' },
  { ordem: 7, titulo: 'Relatório metodológico',  desc: 'Export do caderno completo para revisão.',            status: 'pendente',      detalhe: 'PDF + planilha · não disponível' },
];

function HubProcesso({ dark = false }) {
  const total = ETAPAS_HUB.length;
  const trailX = 86;       // x of vertical line
  const rowH = 124;
  return (
    <div className={`paper-grain ${dark ? 'theme-dark' : ''}`} style={{ background:'hsl(var(--background))', minHeight: '100%' }}>
      <div style={{ display:'flex', minHeight:'100%' }}>
        <Sidebar active="processos" dark={dark}/>
        <div style={{ flex: 1, display:'flex', flexDirection:'column', minWidth: 0 }}>
          <CrumbBar
            items={['Processos', 'MGI · CAF', 'Cadastro CPF estrangeiro']}
            right={
              <>
                <span className="font-mono" style={{ fontSize: 11, color:'hsl(var(--muted-foreground))' }}>4/7 concluídas</span>
                <button className="btn btn-outline" style={{ padding:'5px 10px', fontSize: 12 }}>Exportar</button>
                <button className="btn btn-outline" style={{ padding:'5px 10px', fontSize: 12 }}>Compartilhar</button>
              </>
            }
          />

          {/* Header */}
          <div style={{ padding: '28px 36px 8px', position:'relative' }}>
            <div style={{ display:'flex', alignItems:'flex-start', gap: 28, flexWrap:'wrap' }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div className="font-mono" style={{ fontSize: 11, color:'hsl(var(--muted-foreground))', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom: 8 }}>
                  Processo · MGI/CAF · 02º trimestre 2026
                </div>
                <h1 className="font-hand" style={{ fontSize: 44, lineHeight: 1.05, margin: 0, color:'hsl(var(--foreground))' }}>
                  Cadastro de CPF para <span className="marker">cidadão estrangeiro</span>
                </h1>
                <div style={{ marginTop: 6, color:'hsl(var(--muted-foreground))' }}>
                  <SketchUnderline width={210} variant="long" color="hsl(var(--accent))"/>
                </div>
                <p style={{ marginTop: 14, maxWidth: 560, fontSize: 14, lineHeight: 1.55, color:'hsl(var(--muted-foreground))' }}>
                  Anti-Sludge aplicado ao fluxo de emissão online. 12 participantes recrutados, observação remota com gravação de tela e questionário de barreiras pós-passo.
                </p>
              </div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap: 10 }}>
                <div style={{ position:'relative' }}>
                  <WatercolorSplatter size={140} rotation={-15} opacity={0.4} style={{ position:'absolute', top:-30, right:-30 }}/>
                  <div style={{ position:'relative', display:'flex', gap: 18 }}>
                    <Stat label="participantes" value="12"/>
                    <Stat label="jornadas válidas" value="7"/>
                    <Stat label="barreiras críticas" value="3" tone="destructive"/>
                  </div>
                </div>
                <div style={{ display:'flex', gap: 8 }}>
                  <button className="btn btn-outline" style={{ fontSize: 13 }}>↳ Abrir jornada padrão</button>
                  <button className="btn btn-primary" style={{ fontSize: 13 }}>+ Nova jornada individual</button>
                </div>
              </div>
            </div>
          </div>

          {/* Trilha de etapas */}
          <div style={{ padding: '14px 36px 48px', position:'relative' }}>
            <div style={{ display:'flex', alignItems:'baseline', gap: 14, marginBottom: 18 }}>
              <h2 className="font-sans" style={{ fontSize: 20, fontWeight: 600, margin: 0, color:'hsl(var(--foreground))' }}>Status metodológico</h2>
              <SketchUnderline width={130} variant="short"/>
              <span className="font-mono" style={{ marginLeft:'auto', fontSize: 11, color:'hsl(var(--muted-foreground))' }}>7 etapas</span>
            </div>

            <div style={{ position:'relative', minHeight: rowH * total }}>
              {/* dotted trail spine */}
              <svg width="100%" height={rowH * total} style={{ position:'absolute', left: 0, top: 0 }} aria-hidden="true">
                {ETAPAS_HUB.map((e, i) => {
                  if (i === total - 1) return null;
                  const y1 = i * rowH + 70;
                  const y2 = (i+1) * rowH + 28;
                  const done = ETAPAS_HUB[i].status === 'concluido' && ETAPAS_HUB[i+1].status !== 'pendente';
                  if (done) return <line key={i} x1={trailX} y1={y1} x2={trailX} y2={y2} stroke="hsl(var(--trilha))" strokeWidth="3" strokeLinecap="round"/>;
                  return <line key={i} x1={trailX} y1={y1} x2={trailX} y2={y2} stroke="hsl(var(--trilha))" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="4 6" opacity={ETAPAS_HUB[i+1].status === 'pendente' ? 0.45 : 1}/>;
                })}
              </svg>

              {ETAPAS_HUB.map((e, i) => (
                <EtapaHubRow key={e.ordem} etapa={e} idx={i} rowH={rowH} trailX={trailX} dark={dark}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }) {
  return (
    <div style={{ textAlign:'right' }}>
      <div className="font-display" style={{ fontSize: 34, lineHeight: 1, color: tone === 'destructive' ? 'hsl(var(--destructive))' : 'hsl(var(--foreground))' }}>{value}</div>
      <div className="font-mono" style={{ fontSize: 10, letterSpacing:'0.1em', textTransform:'uppercase', color:'hsl(var(--muted-foreground))' }}>{label}</div>
    </div>
  );
}

function EtapaHubRow({ etapa, idx, rowH, trailX, dark }) {
  const isLast = idx === ETAPAS_HUB.length - 1;
  const pendente = etapa.status === 'pendente';
  const active   = etapa.status === 'em_progresso';
  return (
    <div style={{ position:'absolute', top: idx * rowH, left: 0, right: 0, height: rowH, display:'flex' }}>
      {/* big yellow number */}
      <div style={{ width: trailX + 32, position:'relative', flexShrink: 0 }}>
        <div style={{
          position:'absolute', left: 8, top: 8,
          opacity: pendente ? 0.4 : 1,
        }}>
          <NumeroEtapa value={etapa.ordem} size={62} tilt={-4 + (idx%2)*8}/>
        </div>
        {/* node circle on trail */}
        <div style={{
          position:'absolute', left: trailX - 9, top: 32,
          width: 18, height: 18, borderRadius: 999,
          background: pendente ? 'hsl(var(--card))' : 'hsl(var(--trilha))',
          border: `2px ${pendente ? 'dashed' : 'solid'} hsl(var(--trilha))`,
          boxShadow: `0 0 0 5px hsl(var(--background))`,
        }}/>
      </div>

      {/* card */}
      <div style={{
        flex: 1, padding: '12px 18px 14px',
        border: '1px solid hsl(var(--border))',
        borderRadius: 8, marginRight: 0,
        background: 'hsl(var(--card))',
        opacity: pendente ? 0.7 : 1,
        position: 'relative',
        marginBottom: 12,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
          <h3 className="font-sans" style={{ fontSize: 17, fontWeight: 600, margin: 0, color: 'hsl(var(--foreground))' }}>{etapa.titulo}</h3>
          <StatusPill tone={etapa.status} dark={dark}>{etapa.status === 'em_progresso' ? 'em progresso' : etapa.status}</StatusPill>
          {active && <span className="font-hand" style={{ fontSize: 16, color:'hsl(var(--accent))', transform:'rotate(-2deg)', display:'inline-block' }}>← você está aqui</span>}
        </div>
        <p style={{ margin: '4px 0 0', fontSize: 14, color:'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>{etapa.desc}</p>
        <div style={{ marginTop: 8, display:'flex', alignItems:'center', gap: 10, fontSize: 12 }}>
          <span className="font-mono" style={{ color:'hsl(var(--muted-foreground))' }}>{etapa.detalhe}</span>
          <span style={{ marginLeft:'auto', display:'flex', gap: 6 }}>
            {!pendente && <button className="btn btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}>Abrir →</button>}
            {pendente && <span className="font-mono" style={{ fontSize: 10, opacity: 0.55, letterSpacing:'0.1em', textTransform:'uppercase' }}>aguarda etapa anterior</span>}
          </span>
        </div>
      </div>
    </div>
  );
}

window.HubProcesso = HubProcesso;
