/* global React, SketchFrame, SketchUnderline, NumeroEtapa, WatercolorSplatter,
   StatusPill, BarreiraIcon, Sidebar, CrumbBar */

const CRITERIOS_BARREIRA = [
  { id:'tempo',         label:'Tempo excessivo',           desc:'O passo demanda mais tempo do que o serviço justifica.', media: 4.2 },
  { id:'cognitiva',     label:'Carga cognitiva',           desc:'Exige memorizar, calcular ou inferir informação.',        media: 4.7 },
  { id:'linguagem',     label:'Linguagem técnica',         desc:'Vocabulário inacessível para o público-alvo.',            media: 3.1 },
  { id:'navegacao',     label:'Navegação confusa',         desc:'Não está claro para onde clicar para avançar.',            media: 4.0 },
  { id:'feedback',      label:'Falta de feedback',         desc:'O sistema não confirma a ação executada.',                 media: 2.6 },
  { id:'consequencia',  label:'Consequência opaca',        desc:'Não fica claro o que acontece se eu errar.',               media: 4.5 },
];

const PASSOS_DA_JORNADA = [
  { ord: 1, txt: 'Login único'   },
  { ord: 4, txt: 'Termo de uso'  },
  { ord: 5, txt: 'Dados pessoais'},
  { ord: 6, txt: 'Upload passaporte' },
];

function QuestionarioScreen({ dark = false }) {
  const [openId, setOpenId] = React.useState('cognitiva');
  return (
    <div className={`paper-grain ${dark ? 'theme-dark' : ''}`} style={{ background:'hsl(var(--background))', minHeight: '100%' }}>
      <div style={{ display:'flex', minHeight:'100%' }}>
        <Sidebar active="processos" dark={dark}/>
        <div style={{ flex: 1, display:'flex', flexDirection:'column', minWidth: 0 }}>
          <CrumbBar
            items={['Processos', 'CPF estrangeiro', 'P07 · Sofia', 'Questionário · Barreiras']}
            right={<span className="font-mono" style={{ fontSize: 11, color:'hsl(167 71% 32%)' }}>✓ salvo automático</span>}
          />

          {/* Header with sketch frame + splatter */}
          <div style={{ padding: '32px 36px 14px', position:'relative' }}>
            <div style={{ position:'absolute', top: -10, left: 240 }}>
              <WatercolorSplatter size={220} rotation={-18} opacity={0.45} seed={42}/>
            </div>
            <div style={{ position:'relative', display:'flex', alignItems:'center', gap: 24, flexWrap:'wrap' }}>
              <SketchFrame seed={9} padX={26} padY={14} strokeWidth={2.4} doubleStroke>
                <span className="font-hand" style={{ fontSize: 36, lineHeight: 1.05, color:'hsl(var(--foreground))' }}>
                  Dimensionamento de barreiras
                </span>
              </SketchFrame>
              <div style={{ display:'flex', gap: 16 }}>
                <Stat3 label="critérios" value="14"/>
                <Stat3 label="respondidos" value="9"/>
                <Stat3 label="passos" value={String(PASSOS_DA_JORNADA.length)}/>
              </div>
            </div>
            <p style={{ marginTop: 16, maxWidth: 720, color:'hsl(var(--muted-foreground))', fontSize: 14, lineHeight: 1.6 }}>
              Para cada critério, atribua uma nota de <strong>1 (irrelevante)</strong> a <strong>5 (impeditivo)</strong> em cada passo da jornada — ou marque <strong>N/A</strong> se o critério não se aplica. Use o campo de observação para contar o que viu.
            </p>
          </div>

          {/* Scale legend */}
          <div style={{ margin: '0 36px 18px', padding: '10px 14px', borderRadius: 8, background: 'hsl(var(--muted))', display:'flex', alignItems:'center', gap: 20, fontSize: 13 }}>
            <span className="font-mono" style={{ fontSize: 11, letterSpacing:'0.08em', textTransform:'uppercase', color:'hsl(var(--muted-foreground))' }}>escala</span>
            {[
              { n:1, label:'irrelevante',  c:'hsl(var(--muted-foreground))' },
              { n:2, label:'baixa',        c:'hsl(38 60% 45%)' },
              { n:3, label:'média',        c:'hsl(28 80% 45%)' },
              { n:4, label:'alta',         c:'hsl(12 80% 45%)' },
              { n:5, label:'impeditiva',   c:'hsl(var(--destructive))' },
            ].map(s => (
              <span key={s.n} style={{ display:'inline-flex', alignItems:'center', gap: 6 }}>
                <span className="font-display" style={{ fontSize: 20, color: s.c }}>{s.n}</span>
                <span style={{ color:'hsl(var(--muted-foreground))' }}>{s.label}</span>
              </span>
            ))}
            <span style={{ marginLeft:'auto', fontSize: 12, color:'hsl(var(--muted-foreground))' }}>
              <em>Sem dado</em> · use N/A — não preencha por intuição.
            </span>
          </div>

          {/* Critérios */}
          <div style={{ padding: '0 36px 120px', display:'flex', flexDirection:'column', gap: 10 }}>
            {CRITERIOS_BARREIRA.map((c, i) => (
              <details key={c.id} open={openId === c.id} onToggle={(e) => e.target.open && setOpenId(c.id)} style={{
                border: '1px solid hsl(var(--border))', borderRadius: 8, background:'hsl(var(--card))', overflow:'hidden'
              }}>
                <summary style={{ listStyle:'none', cursor:'pointer', padding: '14px 18px', display:'flex', alignItems:'center', gap: 14 }}>
                  <NumeroEtapa value={String(i+1).padStart(2,'0')} size={28} tilt={-2}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color:'hsl(var(--foreground))' }}>{c.label}</span>
                      {c.media >= 4 && <BarreiraIcon size={18}/>}
                    </div>
                    <div style={{ fontSize: 13, color:'hsl(var(--muted-foreground))' }}>{c.desc}</div>
                  </div>
                  <span className="font-mono" style={{ fontSize: 11, color:'hsl(var(--muted-foreground))' }}>média atual</span>
                  <span className="font-display" style={{ fontSize: 26, color: c.media >= 4 ? 'hsl(var(--destructive))' : 'hsl(var(--foreground))', minWidth: 36, textAlign:'right' }}>
                    {c.media.toFixed(1)}
                  </span>
                  <span style={{ marginLeft: 6, fontSize: 18, color:'hsl(var(--muted-foreground))', transform: openId === c.id ? 'rotate(180deg)' : '', transition:'transform .2s', display:'inline-block' }}>⌄</span>
                </summary>

                {openId === c.id && (
                  <div style={{ borderTop:'1px solid hsl(var(--border))', padding: '6px 0 0', background:'hsl(var(--background))' }}>
                    {PASSOS_DA_JORNADA.map((p, pi) => (
                      <div key={p.ord} style={{
                        display:'grid', gridTemplateColumns:'170px 1fr 80px',
                        gap: 16, padding: '14px 18px', borderTop: pi ? '1px solid hsl(var(--border))' : '0', alignItems:'flex-start'
                      }}>
                        <div>
                          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
                            <span className="font-mono" style={{ fontSize: 12, color:'hsl(var(--accent))' }}>{String(p.ord).padStart(2,'0')}</span>
                            <span style={{ fontSize: 13, fontWeight: 500 }}>{p.txt}</span>
                          </div>
                        </div>
                        <div>
                          <div style={{ display:'flex', gap: 6, marginBottom: 8 }}>
                            {[1,2,3,4,5].map(n => {
                              const picked = (pi + n) === 4 + pi; // demo: pick = 4
                              const isPicked = (pi === 0 && n === 2) || (pi === 1 && n === 4) || (pi === 2 && n === 5) || (pi === 3 && n === 5);
                              return (
                                <button key={n} className="font-mono" style={{
                                  width: 38, height: 38, borderRadius: 6,
                                  border: '1px solid hsl(var(--border))',
                                  background: isPicked ? (n >= 4 ? 'hsl(var(--destructive))' : 'hsl(var(--foreground))') : 'hsl(var(--card))',
                                  color: isPicked ? 'white' : 'hsl(var(--foreground))',
                                  fontSize: 14, fontWeight: 600,
                                  cursor:'pointer',
                                }}>{n}</button>
                              );
                            })}
                            <label style={{ display:'inline-flex', alignItems:'center', gap: 6, marginLeft: 10, fontSize: 12, color:'hsl(var(--muted-foreground))' }}>
                              <input type="checkbox" /> N/A
                            </label>
                          </div>
                          <textarea className="input-paper" rows={2} placeholder="o que você observou neste passo…" defaultValue={pi === 1 ? 'Sofia ficou ~80s relendo. Disse que "termo é longo demais para esse serviço".' : ''}/>
                        </div>
                        <div className="font-mono" style={{ fontSize: 11, color:'hsl(var(--muted-foreground))', textAlign:'right', paddingTop: 8 }}>
                          {p.print ? '▣ print' : '—'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </details>
            ))}
          </div>

          {/* Sticky footer */}
          <div style={{ position:'sticky', bottom: 0, padding: '14px 36px', borderTop: '1px solid hsl(var(--border))', background: 'hsl(var(--background) / 0.96)', backdropFilter:'blur(4px)', display:'flex', alignItems:'center', gap: 14 }}>
            <span className="font-mono" style={{ fontSize: 12, color:'hsl(var(--muted-foreground))' }}>9 de 14 critérios · 2 textareas com texto · auto-save ativo</span>
            <span style={{ flex: 1 }}/>
            <button className="btn btn-outline">salvar rascunho</button>
            <button className="btn btn-primary">✓ concluir questionário</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat3({ label, value }) {
  return (
    <div style={{ textAlign:'center' }}>
      <div className="font-display" style={{ fontSize: 32, color:'hsl(var(--foreground))', lineHeight: 1 }}>{value}</div>
      <div className="font-mono" style={{ fontSize: 10, letterSpacing:'0.1em', textTransform:'uppercase', color:'hsl(var(--muted-foreground))' }}>{label}</div>
    </div>
  );
}

// =====================================================================
//  Screen 5 — Resultados
// =====================================================================

const BARREIRAS_DATA = [
  { criterio: 'Carga cognitiva',     media: 4.7, n: 12 },
  { criterio: 'Consequência opaca',  media: 4.5, n: 11 },
  { criterio: 'Tempo excessivo',     media: 4.2, n: 12 },
  { criterio: 'Navegação confusa',   media: 4.0, n: 12 },
  { criterio: 'Linguagem técnica',   media: 3.1, n: 12 },
  { criterio: 'Falta de feedback',   media: 2.6, n: 10 },
  { criterio: 'Acessibilidade',      media: null, n: 0 },
];

const IMPACTOS_DATA = [
  { criterio: 'Frustração',      media: 4.6 },
  { criterio: 'Abandono parcial', media: 3.9 },
  { criterio: 'Retrabalho',       media: 3.4 },
  { criterio: 'Confiança no órgão', media: 2.8 },
];

const TEMPOS_DATA = [
  { jornada: 'P07 · Sofia',    s: 637 },
  { jornada: 'P03 · Heitor',   s: 581 },
  { jornada: 'P11 · Yu',       s: 522 },
  { jornada: 'P09 · Carlos',   s: 488 },
  { jornada: 'P05 · Beatriz',  s: 401 },
  { jornada: '◆ planejada',    s: 336, plan: true },
];

function ResultadosScreen({ dark = false }) {
  return (
    <div className={`paper-grain ${dark ? 'theme-dark' : ''}`} style={{ background:'hsl(var(--background))', minHeight: '100%' }}>
      <div style={{ display:'flex', minHeight:'100%' }}>
        <Sidebar active="processos" dark={dark}/>
        <div style={{ flex: 1, display:'flex', flexDirection:'column', minWidth: 0 }}>
          <CrumbBar
            items={['Processos', 'CPF estrangeiro', 'Resultados']}
            right={<>
              <button className="btn btn-outline" style={{ fontSize: 12 }}>Exportar PDF</button>
              <button className="btn btn-outline" style={{ fontSize: 12 }}>Exportar planilha</button>
            </>}
          />

          {/* Header */}
          <div style={{ padding: '32px 36px 8px', position:'relative' }}>
            <div style={{ position:'absolute', top: -12, left: 260, pointerEvents:'none' }}>
              <WatercolorSplatter size={280} rotation={12} opacity={0.5} seed={31}/>
            </div>
            <div style={{ position:'relative', display:'flex', alignItems:'flex-end', gap: 28 }}>
              <SketchFrame seed={5} padX={28} padY={14}>
                <span className="font-hand" style={{ fontSize: 44, lineHeight: 1.05 }}>Resultados</span>
              </SketchFrame>
              <div style={{ display:'flex', gap: 24, alignItems:'flex-end' }}>
                <Stat3 label="participantes" value="12"/>
                <Stat3 label="respostas válidas" value="218"/>
                <Stat3 label="barreiras críticas" value="4"/>
              </div>
            </div>
            <div style={{ marginTop: 14, maxWidth: 720, fontSize: 14, color:'hsl(var(--muted-foreground))', lineHeight: 1.55 }}>
              Médias consolidadas de barreiras, impactos e tempos. Critérios com média ≥ 4,0 são <strong style={{ color:'hsl(var(--destructive))' }}>barreiras críticas</strong> e precisam de redesenho prioritário.
            </div>
          </div>

          {/* Grid */}
          <div style={{ padding: '28px 36px 60px', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 28 }}>
            <ChartCard
              title="Barreiras por critério"
              subtitle="média 1-5 · n participantes responderam"
              meta="78 respostas"
            >
              <HorizontalBars data={BARREIRAS_DATA} accessor="media" labelKey="criterio" color="hsl(var(--barreira))" iconAt={4} showN/>
            </ChartCard>

            <ChartCard
              title="Impactos por critério"
              subtitle="média 1-5 do impacto percebido pela pesquisadora"
              meta="48 respostas"
            >
              <HorizontalBars data={IMPACTOS_DATA} accessor="media" labelKey="criterio" color="hsl(var(--impacto))"/>
            </ChartCard>

            <ChartCard
              title="Tempo por jornada"
              subtitle="segundos · comparativo individual × planejada"
              meta="12 jornadas"
            >
              <HorizontalBars data={TEMPOS_DATA} accessor="s" labelKey="jornada" color="hsl(var(--tempo))" formatVal={(v) => `${Math.floor(v/60)}m${(v%60).toString().padStart(2,'0')}s`} highlightPlan/>
            </ChartCard>

            <ChartCard
              title="Necessidade (5 = essencial)"
              subtitle="o quanto este serviço é essencial para a vida do cidadão"
              meta="12 respostas"
            >
              <NecessidadeList items={[
                { txt: 'Para iniciar emprego formal no país', m: 4.9, n: 12 },
                { txt: 'Para abrir conta bancária',           m: 4.7, n: 12 },
                { txt: 'Para alugar imóvel',                  m: 4.1, n: 11 },
                { txt: 'Para acessar plano de saúde privado', m: 3.4, n: 9  },
                { txt: 'Para comprar online',                 m: 2.2, n: 8  },
                { txt: 'Para aposentadoria',                  m: null, n: 0 },
              ]}/>
            </ChartCard>

            <div style={{ gridColumn: '1 / -1' }}>
              <ChartCard title="Barreiras críticas — síntese" subtitle="passos que combinam alta carga + consequência opaca" meta="4 passos">
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 14 }}>
                  {[
                    { p: 4, label:'Termo de uso',        nota: 4.5, motivo:'Linguagem jurídica longa.' },
                    { p: 5, label:'Dados pessoais',      nota: 4.7, motivo:'Carga cognitiva — campos inferidos.' },
                    { p: 6, label:'Upload passaporte',   nota: 4.8, motivo:'Erro silencioso > 4MB.' },
                    { p: 7, label:'Confirmar e-mail',    nota: 4.1, motivo:'Não esclarece consequência.' },
                  ].map(b => (
                    <div key={b.p} style={{ border:'1px solid hsl(var(--border))', borderRadius: 8, padding: 14, background:'hsl(var(--card))', position:'relative' }}>
                      <div style={{ position:'absolute', top: 8, right: 8 }}><BarreiraIcon size={26}/></div>
                      <NumeroEtapa value={b.p} size={48} tilt={-3}/>
                      <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{b.label}</div>
                      <div className="font-mono" style={{ fontSize: 11, color:'hsl(var(--destructive))', marginTop: 2 }}>média {b.nota.toFixed(1)} / 5</div>
                      <div style={{ fontSize: 12, color:'hsl(var(--muted-foreground))', marginTop: 6, lineHeight: 1.45 }}>{b.motivo}</div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, meta, children }) {
  return (
    <section style={{ border:'1px solid hsl(var(--border))', borderRadius: 10, background:'hsl(var(--card))', padding: 18 }}>
      <div style={{ display:'flex', alignItems:'baseline', gap: 12, marginBottom: 4 }}>
        <h3 className="font-sans" style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>{title}</h3>
        <SketchUnderline width={90} variant="short"/>
        <span style={{ marginLeft:'auto' }} className="font-mono" style={{ fontSize: 10, color:'hsl(var(--muted-foreground))', letterSpacing:'0.08em', textTransform:'uppercase' }}>{meta}</span>
      </div>
      <div style={{ fontSize: 12, color:'hsl(var(--muted-foreground))', marginBottom: 14 }}>{subtitle}</div>
      {children}
    </section>
  );
}

function HorizontalBars({ data, accessor, labelKey, color, formatVal, iconAt, showN, highlightPlan }) {
  const vals = data.map(d => d[accessor]).filter(v => v != null);
  const max = Math.max(...vals, 1);
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: 8 }}>
      {data.map((d, i) => {
        const v = d[accessor];
        const pct = v == null ? 0 : (v / max) * 100;
        const critical = iconAt && v != null && v >= iconAt;
        const plan = d.plan;
        return (
          <div key={i} style={{ display:'grid', gridTemplateColumns:'140px 1fr 70px', gap: 10, alignItems:'center', fontSize: 13 }}>
            <span style={{ color: plan ? 'hsl(var(--accent))' : 'hsl(var(--foreground))', fontWeight: plan ? 600 : 400, textAlign:'right', display:'flex', alignItems:'center', justifyContent:'flex-end', gap: 6 }}>
              {critical && <BarreiraIcon size={16}/>}
              {d[labelKey]}
            </span>
            {v == null ? (
              <em className="font-mono" style={{ color:'hsl(var(--muted-foreground))', fontSize: 12 }}>sem dado</em>
            ) : (
              <div style={{ position:'relative', height: 18 }}>
                <div style={{ position:'absolute', inset: 0, background:'hsl(var(--muted))', borderRadius: 4 }}/>
                <div style={{ position:'absolute', top: 0, bottom: 0, left: 0, width: `${pct}%`, background: plan ? 'transparent' : color, borderRadius: 4, border: plan ? `2px dashed ${color}` : undefined }}/>
                {highlightPlan && !plan && (
                  <div style={{ position:'absolute', top:-2, bottom:-2, left: `${(336/Math.max(...vals,1))*100}%`, width: 2, background:'hsl(var(--accent))' }} title="planejada"/>
                )}
              </div>
            )}
            <span className="font-mono" style={{ fontSize: 12, color:'hsl(var(--foreground))', textAlign:'right' }}>
              {v == null ? '—' : (formatVal ? formatVal(v) : v.toFixed(1))}
              {showN && d.n != null && <span style={{ color:'hsl(var(--muted-foreground))', marginLeft: 4, fontSize: 10 }}>n={d.n}</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function NecessidadeList({ items }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle:'none', display:'flex', flexDirection:'column', gap: 4 }}>
      {items.map((it, i) => (
        <li key={i} style={{ display:'grid', gridTemplateColumns:'1fr 90px 60px', gap: 12, alignItems:'center', padding: '8px 4px', borderBottom: '1px solid hsl(var(--border))' }}>
          <span style={{ fontSize: 14 }}>{it.txt}</span>
          {it.m == null ? <em className="font-mono" style={{ color:'hsl(var(--muted-foreground))', fontSize: 12 }}>sem dado</em> : (
            <span style={{ display:'flex', alignItems:'center', gap: 6 }}>
              {[1,2,3,4,5].map(n => (
                <span key={n} style={{ width: 10, height: 10, borderRadius: 2, background: n <= Math.round(it.m) ? 'hsl(var(--necessidade))' : 'hsl(var(--muted))' }}/>
              ))}
            </span>
          )}
          <span className="font-mono" style={{ fontSize: 12, color: it.m == null ? 'hsl(var(--muted-foreground))' : 'hsl(var(--foreground))', textAlign:'right' }}>
            {it.m == null ? '—' : it.m.toFixed(1)}
            <span style={{ color:'hsl(var(--muted-foreground))', marginLeft: 4, fontSize: 10 }}>n={it.n}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

window.QuestionarioScreen = QuestionarioScreen;
window.ResultadosScreen = ResultadosScreen;
