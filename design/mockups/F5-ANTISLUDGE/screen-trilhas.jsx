/* global React, SketchFrame, SketchUnderline, NumeroEtapa, WatercolorSplatter,
   StatusPill, BarreiraIcon, DesvioX, LoopRepeticao, Sidebar, CrumbBar,
   TrilhaJornada */

// =====================================================================
//  Screen 2 — Jornada planejada (timeline revelada estática)
// =====================================================================
const PASSOS_PLANEJADA = [
  { ordem: 1, descricao: 'Acessar gov.br e iniciar login único', categoria: 'autenticação', tipo: 'navegação', tempo: 18, obrigatorio: true,  print: true },
  { ordem: 2, descricao: 'Selecionar serviço "Cadastro CPF — estrangeiro"', categoria: 'navegação', tipo: 'escolha', tempo: 12, print: true },
  { ordem: 3, descricao: 'Ler termo de uso e marcar "Estou de acordo"', categoria: 'leitura', tipo: 'consentimento', tempo: 34, obrigatorio: true },
  { ordem: 4, descricao: 'Preencher dados pessoais e endereço no exterior', categoria: 'formulário', tipo: 'input longo', tempo: 142, obrigatorio: true, print: true },
  { ordem: 5, descricao: 'Anexar documento de identidade (passaporte)',     categoria: 'upload', tipo: 'documento', tempo: 88, obrigatorio: true, print: true },
  { ordem: 6, descricao: 'Confirmar e receber protocolo por e-mail',        categoria: 'confirmação', tipo: 'output', tempo: 22 },
];

function JornadaPlanejadaScreen({ dark = false }) {
  return (
    <div className={`paper-grain ${dark ? 'theme-dark' : ''}`} style={{ background:'hsl(var(--background))', minHeight: '100%' }}>
      <div style={{ display:'flex', minHeight:'100%' }}>
        <Sidebar active="processos" dark={dark}/>
        <div style={{ flex: 1, display:'flex', flexDirection:'column', minWidth: 0 }}>
          <CrumbBar
            items={['Processos', 'Cadastro CPF estrangeiro', 'Jornada planejada']}
            right={<>
              <span className="font-mono" style={{ fontSize: 11, color:'hsl(167 71% 32%)' }}>✓ salvo · há 12s</span>
              <div style={{ display:'flex', border:'1px solid hsl(var(--border))', borderRadius: 6, overflow:'hidden' }}>
                <button className="btn btn-ghost" style={{ borderRadius: 0, fontSize: 12, padding: '6px 12px', background:'hsl(var(--muted))' }}>Trilha</button>
                <button className="btn btn-ghost" style={{ borderRadius: 0, fontSize: 12, padding: '6px 12px' }}>Tabela</button>
              </div>
            </>}
          />

          <div style={{ padding: '24px 36px 8px', position:'relative' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap: 24, flexWrap:'wrap' }}>
              <div>
                <div className="font-mono" style={{ fontSize: 11, color:'hsl(var(--muted-foreground))', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom: 6 }}>etapa 02 de 07 · planejada</div>
                <h1 className="font-hand" style={{ fontSize: 40, margin: 0, color:'hsl(var(--foreground))' }}>A trilha <em style={{ fontStyle:'normal', color:'hsl(var(--destructive))' }}>ideal</em> do serviço</h1>
                <p style={{ margin: '6px 0 0', maxWidth: 540, color:'hsl(var(--muted-foreground))' }}>
                  O caminho que a equipe espera que o cidadão faça. Compare depois com as jornadas individuais para encontrar desvios.
                </p>
              </div>
              <div style={{ display:'flex', gap: 16, alignItems:'center' }}>
                <Stat2 label="passos" value="6"/>
                <Stat2 label="tempo total" value="5m36s" mono/>
                <Stat2 label="questionários" value="8"/>
              </div>
            </div>
          </div>

          <div style={{ padding: '20px 36px 36px', display:'grid', gridTemplateColumns: '1fr 320px', gap: 36 }}>
            <div>
              <TrilhaJornada passos={PASSOS_PLANEJADA.map((p, i) => ({...p, feito: true}))} mode="planejada" dark={dark}/>

              <div style={{ marginTop: 20, padding: 16, border: '1px dashed hsl(var(--border))', borderRadius: 8, background: 'hsl(var(--background))' }}>
                <div className="font-hand" style={{ fontSize: 17, color: 'hsl(var(--muted-foreground))' }}>+ adicionar passo planejado</div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 130px 130px 90px auto', gap: 8, marginTop: 10 }}>
                  <input className="input-paper" placeholder="Descrição do passo"/>
                  <select className="input-paper"><option>categoria</option></select>
                  <select className="input-paper"><option>tipo F5</option></select>
                  <input className="input-paper" placeholder="tempo"/>
                  <button className="btn btn-primary">+</button>
                </div>
              </div>
            </div>

            <aside style={{ display:'flex', flexDirection:'column', gap: 16 }}>
              <Panel title="Questionários desta jornada">
                <ul style={{ margin: 0, padding: 0, listStyle:'none', display:'flex', flexDirection:'column', gap: 6 }}>
                  {[
                    { nome: 'Barreiras por passo', tipo: 'matriz', q: 14 },
                    { nome: 'Impactos por passo',  tipo: 'matriz', q: 9  },
                    { nome: 'Necessidade pós-jornada', tipo: 'lista', q: 6 },
                  ].map(q => (
                    <li key={q.nome} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding: '8px 10px', borderRadius: 6, background:'hsl(var(--muted))' }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{q.nome}</div>
                        <div className="font-mono" style={{ fontSize: 10, color:'hsl(var(--muted-foreground))', textTransform:'uppercase' }}>{q.tipo} · {q.q} critérios</div>
                      </div>
                      <button className="btn btn-ghost" style={{ padding:'4px 8px', fontSize: 12 }}>abrir</button>
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel title="Atalhos">
                <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap: '8px 14px', fontSize: 13, color:'hsl(var(--muted-foreground))' }}>
                  <span>novo passo</span><span><kbd className="k">N</kbd></span>
                  <span>reordenar</span><span><kbd className="k">⌥</kbd> <kbd className="k">↑</kbd></span>
                  <span>colar print</span><span><kbd className="k">⌘</kbd> <kbd className="k">V</kbd></span>
                </div>
              </Panel>
              <div style={{ padding: '12px 14px', borderRadius: 8, background:'hsl(167 60% 92%)', color:'hsl(167 71% 22%)', fontSize: 13, lineHeight: 1.45 }}>
                <strong>Trilha pronta.</strong> Agora copie esta sequência para cada participante e edite só onde a observação divergir.
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat2({ label, value, mono }) {
  return (
    <div style={{ textAlign:'left' }}>
      <div className={mono ? 'font-mono' : 'font-display'} style={{ fontSize: mono ? 22 : 30, lineHeight: 1, color:'hsl(var(--foreground))' }}>{value}</div>
      <div className="font-mono" style={{ fontSize: 10, letterSpacing:'0.1em', textTransform:'uppercase', color:'hsl(var(--muted-foreground))' }}>{label}</div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <section style={{ border: '1px solid hsl(var(--border))', borderRadius: 8, background: 'hsl(var(--card))', padding: 14 }}>
      <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 10 }}>
        <h3 className="font-sans" style={{ fontSize: 13, fontWeight: 600, margin: 0, textTransform:'uppercase', letterSpacing:'0.04em', color:'hsl(var(--foreground))' }}>{title}</h3>
        <span style={{ flex: 1, height: 1, background:'hsl(var(--border))' }}/>
      </div>
      {children}
    </section>
  );
}

// =====================================================================
//  Screen 3 — Jornada individual com replay + desvio + repetição
// =====================================================================
const PASSOS_INDIVIDUAL = [
  { ordem: 1, descricao: 'Acessar gov.br e iniciar login único', categoria:'autenticação', tipo:'navegação', tempo: 22 },
  { ordem: 2, descricao: 'Clicar em "esqueci minha senha" por engano', categoria:'navegação', tipo:'erro', tempo: 41, marcacao:'desvio', note:'Botão de senha está mais visível que o de cadastro.' },
  { ordem: 3, descricao: 'Voltar e buscar serviço CPF estrangeiro',  categoria:'navegação', tipo:'recuperação', tempo: 28 },
  { ordem: 4, descricao: 'Ler termo de uso (em português)',          categoria:'leitura',   tipo:'consentimento', tempo: 84, print: true },
  { ordem: 5, descricao: 'Preencher dados pessoais',                  categoria:'formulário', tipo:'input longo', tempo: 188 },
  { ordem: 6, descricao: 'Anexar passaporte — refazer 3×',            categoria:'upload',     tipo:'documento', tempo: 246, marcacao:'repeticao', repeticoes: 3, note:'Erro silencioso quando arquivo > 4MB.' },
  { ordem: 7, descricao: 'Confirmar e-mail',                          categoria:'confirmação', tipo:'output', tempo: 12, extra: true },
  { ordem: 8, descricao: 'Receber protocolo',                         categoria:'confirmação', tipo:'output', tempo: 6 },
];

function JornadaIndividualScreen({ dark = false, playing = true }) {
  const [tick, setTick] = React.useState(45);
  React.useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setTick(x => (x + 1) % 100), 120);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <div className={`paper-grain ${dark ? 'theme-dark' : ''}`} style={{ background:'hsl(var(--background))', minHeight: '100%' }}>
      <div style={{ display:'flex', minHeight:'100%' }}>
        <Sidebar active="processos" dark={dark}/>
        <div style={{ flex: 1, display:'flex', flexDirection:'column', minWidth: 0 }}>
          <CrumbBar
            items={['Processos', 'Cadastro CPF estrangeiro', 'Individuais', 'P07 · Sofia']}
            right={<>
              <StatusPill tone="em_progresso" dark={dark}>jornada em revisão</StatusPill>
              <button className="btn btn-outline" style={{ fontSize: 12 }}>← anterior</button>
              <button className="btn btn-outline" style={{ fontSize: 12 }}>próxima →</button>
              <button className="btn btn-primary" style={{ fontSize: 12 }}>✓ marcar validada</button>
            </>}
          />

          <div style={{ padding: '24px 36px 8px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap: 24, flexWrap:'wrap' }}>
              <div style={{ display:'flex', alignItems:'center', gap: 18 }}>
                <div style={{ position:'relative' }}>
                  <NumeroEtapa value="P07" size={64} tilt={-4}/>
                </div>
                <div>
                  <div className="font-mono" style={{ fontSize: 11, color:'hsl(var(--muted-foreground))', letterSpacing:'0.1em', textTransform:'uppercase' }}>jornada individual · participante anonimizada</div>
                  <h1 className="font-hand" style={{ fontSize: 38, margin: '2px 0 0', color:'hsl(var(--foreground))' }}>O caminho real de Sofia</h1>
                  <div className="font-sans" style={{ marginTop: 4, fontSize: 13, color:'hsl(var(--muted-foreground))' }}>
                    32 anos · pós-graduação · região sudeste · <StatusPill tone="concluido" dark={dark}>LGPD assinado</StatusPill>
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', gap: 18 }}>
                <Stat2 label="passos observados" value="8"/>
                <Stat2 label="desvios" value="1"/>
                <Stat2 label="repetições" value="3"/>
                <Stat2 label="tempo real" value="10m37s" mono/>
              </div>
            </div>
          </div>

          <div style={{ padding: '14px 36px 48px', display:'grid', gridTemplateColumns: '1fr 320px', gap: 36 }}>
            <div>
              <TrilhaJornada
                passos={PASSOS_INDIVIDUAL}
                mode="individual"
                replayState={{ activeIndex: 3, progressPct: tick }}
                dark={dark}
              />
            </div>

            <aside style={{ display:'flex', flexDirection:'column', gap: 14 }}>
              <ReplayControl progress={tick} playing={playing}/>
              <Panel title="Legenda da trilha">
                <ul style={{ margin: 0, padding: 0, listStyle:'none', display:'flex', flexDirection:'column', gap: 10, fontSize: 13 }}>
                  <li style={{ display:'flex', alignItems:'center', gap: 10 }}>
                    <svg width="36" height="14"><line x1="2" y1="7" x2="34" y2="7" stroke="hsl(var(--trilha))" strokeWidth="3"/></svg>
                    trajeto percorrido
                  </li>
                  <li style={{ display:'flex', alignItems:'center', gap: 10 }}>
                    <svg width="36" height="14"><line x1="2" y1="7" x2="34" y2="7" stroke="hsl(var(--trilha-muted))" strokeWidth="2" strokeDasharray="4 6"/></svg>
                    ainda não percorrido
                  </li>
                  <li style={{ display:'flex', alignItems:'center', gap: 10 }}><DesvioX size={22}/> desvio do planejado</li>
                  <li style={{ display:'flex', alignItems:'center', gap: 10 }}><LoopRepeticao size={24}/> repetição do mesmo passo</li>
                  <li style={{ display:'flex', alignItems:'center', gap: 10 }}>
                    <span style={{ width: 22, height: 22, borderRadius: 999, background:'hsl(var(--accent))', display:'inline-block', boxShadow:'0 0 0 4px hsl(var(--accent) / 0.25)' }}/>
                    passo ativo no replay
                  </li>
                </ul>
              </Panel>
              <Panel title="Observação livre">
                <textarea className="input-paper font-hand" rows={4} style={{ fontSize: 16, resize:'vertical' }} defaultValue={'Sofia tentou usar autenticação biométrica — não percebeu que o serviço exige login único de senha. Comentou em voz alta: "isso aqui é diferente do app".'}/>
              </Panel>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReplayControl({ progress = 45, playing = true }) {
  return (
    <section style={{ border: '1px solid hsl(var(--border))', borderRadius: 8, background: 'hsl(var(--card))', padding: 14 }}>
      <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 12 }}>
        <h3 className="font-sans" style={{ fontSize: 13, fontWeight: 600, margin: 0, textTransform:'uppercase', letterSpacing:'0.04em' }}>Reproduzir jornada</h3>
        <span className="font-mono" style={{ marginLeft:'auto', fontSize: 12, color: 'hsl(var(--muted-foreground))' }}>04:21 / 10:37</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 10 }}>
        <button className="btn btn-outline" style={{ padding: '6px 8px' }}>⏮</button>
        <button className="btn btn-primary" style={{ padding: '6px 12px' }}>{playing ? '❚❚' : '▶'}</button>
        <button className="btn btn-outline" style={{ padding: '6px 8px' }}>⏭</button>
        <span className="font-mono" style={{ fontSize: 11, marginLeft: 6, color:'hsl(var(--muted-foreground))' }}>1×</span>
      </div>
      <div style={{ height: 8, borderRadius: 999, background:'hsl(var(--muted))', position:'relative', overflow:'hidden' }}>
        <div style={{ width: `${progress}%`, height: '100%', background:'hsl(var(--trilha))', transition:'width .2s linear' }}/>
        <div style={{ position:'absolute', top: -3, left: `calc(${progress}% - 7px)`, width: 14, height: 14, borderRadius: 999, background:'hsl(var(--accent))', border:'2px solid hsl(var(--ink))' }}/>
      </div>
      <div className="font-mono" style={{ marginTop: 8, fontSize: 11, color: 'hsl(var(--muted-foreground))', display:'flex', justifyContent:'space-between' }}>
        <span>passo 4 · ler termo</span>
        <span>↻ até 8s</span>
      </div>
    </section>
  );
}

window.JornadaPlanejadaScreen = JornadaPlanejadaScreen;
window.JornadaIndividualScreen = JornadaIndividualScreen;
