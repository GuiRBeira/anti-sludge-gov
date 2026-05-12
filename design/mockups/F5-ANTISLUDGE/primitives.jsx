/* global React */
// FCINCO primitives — sketch frames, organic underlines, trilha SVG,
// numeração amarela, watercolor splatters, status pills.

const { useMemo, useId, useState, useEffect, useRef } = React;

// ---------- helpers ----------
function rng(seed) {
  let s = seed | 0;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}
function jitterPath(width, height, seed, side, inset = 4, wobble = 2.5) {
  // build an organic line approximating a side of a rectangle
  const r = rng(seed);
  const pts = [];
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    let x, y;
    if (side === 'top')    { x = inset + (width - inset*2)*t; y = inset + (r()-0.5)*wobble; }
    else if (side === 'bot'){ x = inset + (width - inset*2)*t; y = height - inset + (r()-0.5)*wobble; }
    else if (side === 'left'){ y = inset + (height - inset*2)*t; x = inset + (r()-0.5)*wobble; }
    else                   { y = inset + (height - inset*2)*t; x = width - inset + (r()-0.5)*wobble; }
    pts.push([x,y]);
  }
  return pts.map((p,i)=> (i===0?`M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
}

// ---------- SketchFrame ----------
// hand-drawn rectangle around H1/H2 — replicates "COMO FUNCIONA" framing.
function SketchFrame({ children, seed = 7, color = 'currentColor', strokeWidth = 2.2, padX = 22, padY = 12, doubleStroke = true, tag: Tag = 'div', className = '', style = {} }) {
  const ref = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const w = box.w + padX*2;
  const h = box.h + padY*2;
  const paths = useMemo(() => {
    if (!w || !h) return [];
    return [
      jitterPath(w, h, seed+1, 'top'),
      jitterPath(w, h, seed+2, 'right'),
      jitterPath(w, h, seed+3, 'bot'),
      jitterPath(w, h, seed+4, 'left'),
    ];
  }, [w, h, seed]);
  return (
    <Tag className={`sketch-frame ${className}`} style={{ padding: `${padY}px ${padX}px`, ...style }}>
      {w > 0 && (
        <svg className="sketch-stroke" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
          {paths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {doubleStroke && paths.map((d, i) => (
            <path key={'d'+i} d={d} fill="none" stroke={color} strokeWidth={strokeWidth*0.55} strokeLinecap="round" opacity="0.55" transform="translate(1.5,1.5)" />
          ))}
        </svg>
      )}
      <span ref={ref} style={{ display: 'inline-block' }}>{children}</span>
    </Tag>
  );
}

// ---------- SketchUnderline ----------
function SketchUnderline({ width = 180, variant = 'short', color = 'currentColor', strokeWidth = 2.4 }) {
  const h = 14;
  const d = useMemo(() => {
    if (variant === 'scribble') {
      return `M 4 8 Q ${width*0.2} 2, ${width*0.4} 9 T ${width*0.8} 7 T ${width-4} 9`;
    }
    if (variant === 'long') {
      return `M 2 8 C ${width*0.25} 4, ${width*0.5} 12, ${width*0.7} 7 S ${width-2} 6, ${width-2} 9`;
    }
    return `M 2 8 Q ${width*0.5} 2, ${width-4} 9`;
  }, [width, variant]);
  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`} aria-hidden="true">
      <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

// ---------- NumeroEtapa ----------
function NumeroEtapa({ value, size = 'lg', tilt = 0, className = '', style = {} }) {
  const sizes = { sm: 22, md: 32, lg: 48, xl: 72, xxl: 92 };
  const fz = typeof size === 'number' ? size : sizes[size];
  const v = typeof value === 'number' ? String(value).padStart(2, '0') : value;
  return (
    <span className={`font-display ${className}`} style={{
      fontSize: fz,
      lineHeight: 0.85,
      color: 'hsl(var(--numero))',
      transform: `rotate(${tilt}deg)`,
      display: 'inline-block',
      textShadow: '0.5px 0.5px 0 hsl(var(--ink) / 0.15)',
      ...style,
    }}>{v}</span>
  );
}

// ---------- WatercolorSplatter ----------
// Original SVG splatter (no asset dependency). Uses turbulence-distorted blobs.
function WatercolorSplatter({ color = 'hsl(var(--accent))', size = 280, rotation = 0, opacity = 0.55, seed = 11, style = {} }) {
  const fid = `wc-${useId().replace(/:/g,'')}`;
  const blobs = useMemo(() => {
    const r = rng(seed);
    const arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push({
        cx: 40 + r()*120, cy: 40 + r()*120,
        rx: 28 + r()*40, ry: 24 + r()*40,
        rot: r()*360,
        o: 0.4 + r()*0.5,
      });
    }
    return arr;
  }, [seed]);
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ transform: `rotate(${rotation}deg)`, opacity, mixBlendMode: 'multiply', pointerEvents: 'none', ...style }} aria-hidden="true">
      <defs>
        <filter id={fid} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed={seed}/>
          <feDisplacementMap in="SourceGraphic" scale="22"/>
          <feGaussianBlur stdDeviation="0.6"/>
        </filter>
      </defs>
      <g filter={`url(#${fid})`} fill={color}>
        {blobs.map((b,i)=>(
          <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} opacity={b.o} transform={`rotate(${b.rot} ${b.cx} ${b.cy})`}/>
        ))}
      </g>
      {/* fine speckles */}
      <g fill={color} opacity="0.6">
        {Array.from({ length: 22 }).map((_, i) => {
          const r2 = rng(seed + i*3);
          return <circle key={i} cx={r2()*200} cy={r2()*200} r={0.4 + r2()*1.6} />;
        })}
      </g>
    </svg>
  );
}

// ---------- StatusPill ----------
const tones = {
  pendente:    { bg: 'hsl(40 25% 90%)',     fg: 'hsl(40 20% 30%)',     dbg:'hsl(40 10% 18%)', dfg:'hsl(40 25% 75%)' },
  em_progresso:{ bg: 'hsl(167 60% 90%)',    fg: 'hsl(167 71% 24%)',    dbg:'hsl(167 50% 18%)', dfg:'hsl(167 60% 78%)' },
  concluido:   { bg: 'hsl(167 50% 88%)',    fg: 'hsl(167 71% 22%)',    dbg:'hsl(167 50% 20%)', dfg:'hsl(167 60% 80%)' },
  validada:    { bg: 'hsl(167 71% 41%)',    fg: 'white',               dbg:'hsl(167 71% 35%)', dfg:'white' },
  desvio:      { bg: 'hsl(22 90% 90%)',     fg: 'hsl(22 89% 30%)',     dbg:'hsl(22 50% 18%)',  dfg:'hsl(22 70% 75%)' },
  repeticao:   { bg: 'hsl(268 50% 92%)',    fg: 'hsl(268 50% 30%)',    dbg:'hsl(268 30% 20%)', dfg:'hsl(268 50% 78%)' },
  barreira:    { bg: 'hsl(358 60% 92%)',    fg: 'hsl(358 67% 35%)',    dbg:'hsl(358 40% 20%)', dfg:'hsl(358 60% 78%)' },
  print:       { bg: 'hsl(167 30% 92%)',    fg: 'hsl(167 71% 28%)',    dbg:'hsl(167 30% 18%)', dfg:'hsl(167 60% 78%)' },
};
function StatusPill({ tone = 'pendente', children, dark = false }) {
  const t = tones[tone] || tones.pendente;
  return (
    <span className="font-mono" style={{
      display:'inline-flex', alignItems:'center',
      fontSize: 10, padding: '2px 7px', borderRadius: 999,
      textTransform: 'uppercase', letterSpacing: '0.08em',
      background: dark ? t.dbg : t.bg,
      color: dark ? t.dfg : t.fg,
      whiteSpace:'nowrap',
    }}>{children}</span>
  );
}

// ---------- Barreira icon (yellow/black stripes) ----------
function BarreiraIcon({ size = 22, tilt = -8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 22" style={{ transform: `rotate(${tilt}deg)` }} aria-hidden="true">
      <rect x="1" y="6" width="30" height="10" fill="hsl(var(--accent))" stroke="hsl(var(--ink))" strokeWidth="1.5"/>
      <g stroke="hsl(var(--ink))" strokeWidth="2.6">
        <line x1="6" y1="6" x2="2" y2="16"/>
        <line x1="13" y1="6" x2="9" y2="16"/>
        <line x1="20" y1="6" x2="16" y2="16"/>
        <line x1="27" y1="6" x2="23" y2="16"/>
      </g>
      <line x1="4" y1="6" x2="4" y2="2" stroke="hsl(var(--ink))" strokeWidth="2"/>
      <line x1="28" y1="6" x2="28" y2="2" stroke="hsl(var(--ink))" strokeWidth="2"/>
      <line x1="2" y1="20" x2="30" y2="20" stroke="hsl(var(--ink))" strokeWidth="1.5" strokeDasharray="3 2"/>
    </svg>
  );
}

// ---------- X for desvio (sketchy) ----------
function DesvioX({ size = 36, color = 'hsl(var(--destructive))' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M 6 7 Q 20 19, 33 33" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M 33 6 Q 21 18, 7 32"  stroke={color} strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M 8 8 Q 22 22, 32 32" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

// ---------- Loop for repetição ----------
function LoopRepeticao({ size = 40, color = 'hsl(var(--repeticao))' }) {
  return (
    <svg width={size} height={size*0.9} viewBox="0 0 44 40" aria-hidden="true">
      <path d="M 5 22 C 5 8, 38 6, 38 22 C 38 35, 14 36, 9 28" stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 12 24 L 8 28 L 4 25" stroke={color} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ---------- Sidebar chrome (compact) ----------
function Sidebar({ active = 'processos', dark = false, compact = false }) {
  const items = [
    { id: 'processos', label: 'Processos', icon: '◆' },
    { id: 'catalogo',  label: 'Catálogo F5', icon: '☷' },
    { id: 'admin',     label: 'Órgãos', icon: '⌂' },
  ];
  return (
    <aside style={{
      width: compact ? 68 : 232,
      borderRight: '1px solid hsl(var(--border))',
      background: 'hsl(var(--card))',
      display:'flex', flexDirection:'column',
      flexShrink: 0,
    }}>
      <div style={{ padding: '20px 18px 14px', display:'flex', alignItems:'center', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 6,
          background: 'hsl(var(--primary))',
          display:'grid', placeItems:'center',
          fontFamily: 'Bebas Neue, sans-serif', color:'white', fontSize: 19,
          transform: 'rotate(-3deg)',
        }}>F5</div>
        {!compact && (
          <div style={{ lineHeight: 1.15 }}>
            <div className="font-hand" style={{ fontSize: 18 }}>Anti-Sludge</div>
            <div className="font-mono" style={{ fontSize: 9.5, opacity: 0.55, letterSpacing:'0.1em', textTransform:'uppercase' }}>FCINCO · MGI</div>
          </div>
        )}
      </div>
      <nav style={{ padding: '8px', display:'flex', flexDirection:'column', gap: 2 }}>
        {items.map(it => (
          <button key={it.id} style={{
            display:'flex', alignItems:'center', gap: 12,
            padding: compact ? '10px' : '9px 12px',
            borderRadius: 6, border: 0, textAlign:'left',
            cursor:'pointer',
            background: active === it.id ? 'hsl(var(--muted))' : 'transparent',
            color: 'hsl(var(--foreground))',
            fontSize: 14, fontWeight: active === it.id ? 600 : 400,
            justifyContent: compact ? 'center' : 'flex-start',
          }}>
            <span style={{ fontSize: 14, opacity: 0.7 }}>{it.icon}</span>
            {!compact && <span>{it.label}</span>}
            {!compact && active === it.id && (
              <span style={{ marginLeft:'auto', width: 4, height: 16, borderRadius: 2, background:'hsl(var(--primary))' }}/>
            )}
          </button>
        ))}
      </nav>
      <div style={{ marginTop:'auto', padding: '12px 14px', borderTop: '1px solid hsl(var(--border))', fontSize: 12, color:'hsl(var(--muted-foreground))' }}>
        {!compact && <>
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 999, background:'hsl(var(--accent))', display:'grid', placeItems:'center', color:'hsl(var(--ink))', fontWeight:700, fontSize:11 }}>JN</div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: 13, color:'hsl(var(--foreground))' }}>Janaína</div>
              <div className="font-mono" style={{ fontSize: 10, opacity: 0.65 }}>pesquisadora</div>
            </div>
          </div>
        </>}
      </div>
    </aside>
  );
}

// Crumb bar
function CrumbBar({ items = [], right = null }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap: 6, fontSize: 13,
      padding: '14px 28px', borderBottom: '1px solid hsl(var(--border))',
      color:'hsl(var(--muted-foreground))', background:'hsl(var(--background))',
    }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ opacity:0.5 }}>/</span>}
          <span style={{ color: i === items.length-1 ? 'hsl(var(--foreground))' : undefined }}>{it}</span>
        </React.Fragment>
      ))}
      <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap: 12 }}>
        {right}
      </div>
    </div>
  );
}

Object.assign(window, {
  SketchFrame, SketchUnderline, NumeroEtapa, WatercolorSplatter, StatusPill,
  BarreiraIcon, DesvioX, LoopRepeticao, Sidebar, CrumbBar,
});
