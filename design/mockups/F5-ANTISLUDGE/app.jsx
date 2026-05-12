/* global React, DesignCanvas, DCSection, DCArtboard,
   HubProcesso, JornadaPlanejadaScreen, JornadaIndividualScreen,
   QuestionarioScreen, ResultadosScreen,
   EmptyProcessos, HubMobile, TrilhaMobile,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "handFont": "Patrick Hand",
  "trilhaColor": "#C8252A",
  "numeroColor": "#F4B400",
  "primaryColor": "#1FB597",
  "paperWarm": true
}/*EDITMODE-END*/;

function ThemedSet({ children, dark }) {
  return <div className={dark ? 'theme-dark' : ''} style={{ height: '100%' }}>{children}</div>;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply tweaks via CSS vars on :root scope of canvas iframe
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--font-hand-override', `'${t.handFont}'`);
    // tweak colours (convert hex → hsl channels would be ideal; for speed,
    // override with rgb wrappers via class on .tweak-skin)
    r.style.setProperty('--tweak-trilha', t.trilhaColor);
    r.style.setProperty('--tweak-numero', t.numeroColor);
    r.style.setProperty('--tweak-primary', t.primaryColor);
    document.body.classList.toggle('tweak-warm', !!t.paperWarm);
  }, [t]);

  return (
    <>
      <style>{`
        .font-hand { font-family: var(--font-hand-override, 'Patrick Hand'), 'Caveat', cursive !important; }
        :root {
          --trilha-tweak: ${t.trilhaColor};
          --numero-tweak: ${t.numeroColor};
          --primary-tweak: ${t.primaryColor};
        }
      `}</style>

      <DesignCanvas projectTitle="F5 Anti-Sludge · FCINCO direção" projectSubtitle="caderno de pesquisa digital — trilha vermelha, números mostarda, headers handlettered">
        <DCSection id="hub" title="01 · Hub do processo" subtitle="As 7 etapas metodológicas como TRILHA vertical numerada">
          <DCArtboard id="hub-light" label="claro · desktop" width={1320} height={1180}>
            <ThemedSet dark={false}><HubProcesso/></ThemedSet>
          </DCArtboard>
          <DCArtboard id="hub-dark" label="escuro · desktop" width={1320} height={1180}>
            <ThemedSet dark={true}><HubProcesso dark/></ThemedSet>
          </DCArtboard>
          <DCArtboard id="hub-mobile" label="mobile 375" width={375} height={1080}>
            <ThemedSet dark={false}><HubMobile/></ThemedSet>
          </DCArtboard>
        </DCSection>

        <DCSection id="planejada" title="02 · Jornada planejada" subtitle="Timeline-trilha como visão revelada estática">
          <DCArtboard id="plan-light" label="claro" width={1320} height={1080}>
            <ThemedSet dark={false}><JornadaPlanejadaScreen/></ThemedSet>
          </DCArtboard>
          <DCArtboard id="plan-dark" label="escuro" width={1320} height={1080}>
            <ThemedSet dark={true}><JornadaPlanejadaScreen dark/></ThemedSet>
          </DCArtboard>
        </DCSection>

        <DCSection id="individual" title="03 · Jornada individual em replay" subtitle="trilha sendo traçada · 1 desvio (X) · 1 repetição (loop)">
          <DCArtboard id="ind-light" label="replay · claro" width={1320} height={1300}>
            <ThemedSet dark={false}><JornadaIndividualScreen/></ThemedSet>
          </DCArtboard>
          <DCArtboard id="ind-dark" label="replay · escuro" width={1320} height={1300}>
            <ThemedSet dark={true}><JornadaIndividualScreen dark/></ThemedSet>
          </DCArtboard>
          <DCArtboard id="ind-mobile" label="mobile 375" width={375} height={1080}>
            <ThemedSet dark={false}><TrilhaMobile/></ThemedSet>
          </DCArtboard>
        </DCSection>

        <DCSection id="questionario" title="04 · Questionário · matriz handlettered" subtitle="Header em moldura sketch · escala 1-5 · auto-save">
          <DCArtboard id="quest-light" label="claro" width={1320} height={1380}>
            <ThemedSet dark={false}><QuestionarioScreen/></ThemedSet>
          </DCArtboard>
          <DCArtboard id="quest-dark" label="escuro" width={1320} height={1380}>
            <ThemedSet dark={true}><QuestionarioScreen dark/></ThemedSet>
          </DCArtboard>
        </DCSection>

        <DCSection id="resultados" title="05 · Resultados" subtitle="Recharts paleta FCINCO · barreiras críticas com ícone amarelo/preto">
          <DCArtboard id="res-light" label="claro" width={1320} height={1480}>
            <ThemedSet dark={false}><ResultadosScreen/></ThemedSet>
          </DCArtboard>
          <DCArtboard id="res-dark" label="escuro" width={1320} height={1480}>
            <ThemedSet dark={true}><ResultadosScreen dark/></ThemedSet>
          </DCArtboard>
        </DCSection>

        <DCSection id="empty" title="06 · Empty celebratório" subtitle="watercolor + trilha ilustrada + handlettering — primeira vez no produto">
          <DCArtboard id="empty-light" label="claro" width={1100} height={720}>
            <ThemedSet dark={false}><EmptyProcessos/></ThemedSet>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks · direção FCINCO">
        <TweakSection title="Tipografia">
          <TweakRadio
            label="Fonte handlettered"
            options={['Patrick Hand', 'Caveat', 'Reenie Beanie']}
            value={t.handFont}
            onChange={(v) => setTweak('handFont', v)}
          />
        </TweakSection>
        <TweakSection title="Paleta FCINCO">
          <TweakColor
            label="Trilha (vermelho watercolor)"
            value={t.trilhaColor}
            onChange={(v) => setTweak('trilhaColor', v)}
            options={['#C8252A', '#A8211F', '#D14F3B', '#8B2E2E']}
          />
          <TweakColor
            label="Numeração (amarelo)"
            value={t.numeroColor}
            onChange={(v) => setTweak('numeroColor', v)}
            options={['#F4B400', '#E89E00', '#FFCB3B', '#B89232']}
          />
          <TweakColor
            label="Primária (teal)"
            value={t.primaryColor}
            onChange={(v) => setTweak('primaryColor', v)}
            options={['#1FB597', '#0E8E78', '#2DCCAB', '#1A6F5E']}
          />
          <TweakToggle
            label="Papel quente"
            value={t.paperWarm}
            onChange={(v) => setTweak('paperWarm', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
