import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  activityWeeks,
  capabilities,
  evidence,
  metrics,
  navSections,
  principles,
  profile,
  skillGroups,
  trajectory,
  type Capability,
} from "./data";

type SectionId = (typeof navSections)[number]["id"];
type Theme = "dark" | "light";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = window.localStorage.getItem("tui-theme");
    return saved === "light" ? "light" : "dark";
  });
  const [activeSection, setActiveSection] = useState<SectionId>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState<"all" | "core" | "adjacent">("all");
  const visibleSkillGroups = useMemo(
    () => skillGroups.filter((group) => skillFilter === "all" || (skillFilter === "core" ? group.tone !== "warm" : group.tone === "warm")),
    [skillFilter],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("tui-theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = navSections
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: "-24% 0px -62% 0px", threshold: [0.05, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const goTo = (id: SectionId) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="tui-app">
      <Header
        activeSection={activeSection}
        theme={theme}
        menuOpen={menuOpen}
        onNavigate={goTo}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />

      <main>
        <section id="overview" className="tui-section overview-section section-width">
          <div className="overview-grid">
            <div className="identity-column">
              <div className="section-kicker"><span>01</span> profile / auto-presented</div>
              <h1>
                Luiz Gustavo
                <br />
                <span>Saraiva</span>
              </h1>
              <p className="role-line">{profile.role}</p>
              <p className="intro-copy">{profile.bio}</p>
              <div className="identity-meta">
                <div><span>base</span><strong>{profile.location}</strong></div>
                <div><span>focus</span><strong>product · systems · automation</strong></div>
                <div><span>github</span><strong>@{profile.login}</strong></div>
              </div>
              <div className="identity-actions">
                <button className="tui-button primary" onClick={() => goTo("capabilities")}>ver capacidades <span>↓</span></button>
                <a className="tui-button" href={profile.github} target="_blank" rel="noreferrer">abrir github <span>↗</span></a>
              </div>
            </div>

            <div className="overview-panels">
              <Panel code="map.01" title="capability map" className="map-panel">
                <CapabilityMap />
                <div className="panel-footnote"><span>primary axis</span><strong>useful software / clear systems</strong></div>
              </Panel>
              <div className="overview-mini-grid">
                <Panel code="state.01" title="current signal" className="mini-panel">
                  <div className="signal-value"><i /> building in public</div>
                  <p>Interfaces, automação e sistemas que deixam o trabalho mais legível.</p>
                </Panel>
                <Panel code="where.01" title="coordinates" className="mini-panel">
                  <div className="coordinate-line"><span>location</span><strong>{profile.location}</strong></div>
                  <div className="coordinate-line"><span>language</span><strong>pt-BR / english</strong></div>
                  <div className="coordinate-line"><span>availability</span><strong className="accent-text">open to good work</strong></div>
                </Panel>
              </div>
            </div>
          </div>

          <div className="hero-note-row">
            <span className="note-marker">+</span>
            <p>Este é um currículo derivado do seu GitHub: linguagens, formatos de entrega, integrações e continuidade da atividade — sem enumerar projetos.</p>
            <span className="note-date">snapshot / {profile.updatedAt}</span>
          </div>
        </section>

        <section className="metric-band section-width" aria-label="Métricas agregadas do GitHub">
          {metrics.map((metric, index) => (
            <div className="metric-cell" key={metric.label}>
              <span className="metric-index">0{index + 1}</span>
              <strong>{metric.value}</strong>
              <span className="metric-label">{metric.label}</span>
              <small>{metric.note}</small>
            </div>
          ))}
        </section>

        <section id="capabilities" className="tui-section section-width">
          <SectionIntro
            number="02"
            kicker="capabilities / core signal"
            title="O que o histórico diz sobre mim"
            description="A leitura vem da combinação entre linguagens, dependências, formatos de produto e trabalho de entrega. O foco não é uma lista de ferramentas: é a forma como elas se conectam."
          />
          <div className="capability-layout">
            <div className="capability-list">
              {capabilities.map((capability) => <CapabilityRow key={capability.id} capability={capability} />)}
            </div>
            <Panel code="method.01" title="how I work" className="method-panel">
              <div className="method-stack">
                {principles.map((principle) => (
                  <div className="method-row" key={principle.index}>
                    <span>{principle.index}</span>
                    <div><strong>{principle.title}</strong><p>{principle.body}</p></div>
                  </div>
                ))}
              </div>
              <div className="method-meter"><span>clarity</span><i><b /></i><strong>high</strong></div>
              <div className="method-meter"><span>feedback</span><i><b /></i><strong>fast</strong></div>
              <div className="method-meter"><span>ownership</span><i><b /></i><strong>end-to-end</strong></div>
            </Panel>
          </div>
        </section>

        <section id="stack" className="tui-section section-width">
          <SectionIntro
            number="03"
            kicker="stack / aggregate view"
            title="Competências em camadas"
            description="Uma síntese do conjunto do histórico: linguagens na base, produtos e sistemas no meio, automação e craft na superfície."
          />
          <div className="skill-toolbar">
            <div className="skill-tabs" role="tablist" aria-label="Filtrar competências">
              <button className={skillFilter === "all" ? "is-active" : ""} onClick={() => setSkillFilter("all")} role="tab" aria-selected={skillFilter === "all"}>all layers</button>
              <button className={skillFilter === "core" ? "is-active" : ""} onClick={() => setSkillFilter("core")} role="tab" aria-selected={skillFilter === "core"}>core</button>
              <button className={skillFilter === "adjacent" ? "is-active" : ""} onClick={() => setSkillFilter("adjacent")} role="tab" aria-selected={skillFilter === "adjacent"}>adjacent</button>
            </div>
            <span className="toolbar-note">sinais agregados · sem project names</span>
          </div>
          <div className="skill-grid">
            {visibleSkillGroups.map((group) => (
              <Panel key={group.label} code={group.label} title={group.label} className={`skill-panel tone-${group.tone}`}>
                <p className="skill-detail">{group.detail}</p>
                <div className="skill-items">
                  {group.items.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="skill-level"><span>signal</span><i><b /></i><strong>{group.tone === "accent" ? "dominant" : group.tone === "green" ? "recurring" : "applied"}</strong></div>
              </Panel>
            ))}
          </div>
          <div className="stack-summary">
            <span>core proposition</span>
            <strong>conectar produto, dados e entrega para transformar complexidade em algo utilizável.</strong>
            <span className="summary-mark">+</span>
          </div>
        </section>

        <section id="trajectory" className="tui-section section-width">
          <SectionIntro
            number="04"
            kicker="trajectory / time axis"
            title="Uma trajetória, não um showcase"
            description="A leitura por período mostra a direção do trabalho: entender a interface, conectar sistemas, automatizar o fluxo e ampliar a superfície de trabalho."
          />
          <div className="trajectory-layout">
            <div className="trajectory-line">
              {trajectory.map((item, index) => (
                <article className="trajectory-item" key={item.period}>
                  <div className="trajectory-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
                  <div className="trajectory-period">{item.period}</div>
                  <div className="trajectory-content">
                    <div className="trajectory-label">{item.label}</div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
            <Panel code="activity.28w" title="github activity" className="activity-panel">
              <ActivityGrid />
              <div className="activity-legend"><span>less</span><i className="level-0" /><i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /><span>more</span></div>
              <div className="activity-caption">28 weeks / leitura agregada</div>
            </Panel>
          </div>
        </section>

        <section id="evidence" className="tui-section section-width evidence-section">
          <SectionIntro
            number="05"
            kicker="evidence / historical signal"
            title="O currículo que se valida no histórico"
            description="Não preciso listar cada repositório para mostrar como trabalho. Os sinais abaixo resumem continuidade, colaboração, amplitude e entrega."
          />
          <div className="evidence-grid">
            {evidence.map((item) => (
              <Panel key={item.index} code={item.label} title={item.label} className="evidence-panel">
                <div className="evidence-top"><span>{item.index}</span><strong>{item.value}</strong></div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </Panel>
            ))}
          </div>
          <Panel code="closing.01" title="the short version" className="closing-panel">
            <div className="closing-copy">
              <span className="closing-label">if you read one thing</span>
              <h2>Eu construyo software para que<br /><span>trabalho real flua melhor.</span></h2>
              <p>Da interface ao sistema, da API ao deploy: interessado no problema, rigoroso com o contrato e pragmático com a solução.</p>
            </div>
            <div className="closing-actions">
              <a className="tui-button primary" href={profile.github} target="_blank" rel="noreferrer">ver no github <span>↗</span></a>
              <a className="tui-button" href={profile.linkedin} target="_blank" rel="noreferrer">conectar no linkedin <span>↗</span></a>
            </div>
          </Panel>
        </section>
      </main>

      <Footer onNavigate={goTo} />
    </div>
  );
}

type HeaderProps = {
  activeSection: SectionId;
  theme: Theme;
  menuOpen: boolean;
  onNavigate: (id: SectionId) => void;
  onToggleTheme: () => void;
  onToggleMenu: () => void;
};

function Header({ activeSection, theme, menuOpen, onNavigate, onToggleTheme, onToggleMenu }: HeaderProps) {
  return (
    <header className="tui-header">
      <div className="tui-header-inner">
        <button className="tui-brand" onClick={() => onNavigate("overview")} aria-label="Voltar ao início">
          <span className="brand-block">LG</span><span className="brand-slash">/</span><span>PROFILE</span>
        </button>
        <nav className={`tui-nav ${menuOpen ? "is-open" : ""}`} aria-label="Seções do perfil">
          {navSections.map((section, index) => (
            <button key={section.id} className={activeSection === section.id ? "is-active" : ""} onClick={() => onNavigate(section.id)}>
              <span>0{index + 1}</span>{section.label}
            </button>
          ))}
        </nav>
        <div className="header-tools">
          <span className="header-state"><i /> historical signal</span>
          <button className="theme-button" onClick={onToggleTheme} aria-label="Alternar tema">{theme === "dark" ? "☼" : "◐"}</button>
          <button className="menu-button" onClick={onToggleMenu} aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? "×" : "≡"}</button>
        </div>
      </div>
    </header>
  );
}

function Panel({ code, title, children, className = "" }: { code: string; title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`tui-panel ${className}`}>
      <div className="panel-header"><span>{code}</span><strong>{title}</strong><i>+</i></div>
      <div className="panel-body">{children}</div>
    </section>
  );
}

function SectionIntro({ number, kicker, title, description }: { number: string; kicker: string; title: string; description: string }) {
  return (
    <div className="section-intro">
      <div className="section-kicker"><span>{number}</span> {kicker}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function CapabilityMap() {
  return (
    <div className="capability-map" aria-label="Mapa de capacidades">
      <div className="map-grid-lines" />
      <div className="map-axis map-axis-x" />
      <div className="map-axis map-axis-y" />
      <svg className="map-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <line x1="50" y1="50" x2="21" y2="28" />
        <line x1="50" y1="50" x2="79" y2="28" />
        <line x1="50" y1="50" x2="21" y2="73" />
        <line x1="50" y1="50" x2="79" y2="73" />
      </svg>
      <div className="map-node node-interface"><span>01</span><strong>interface</strong><small>clarity</small></div>
      <div className="map-node node-systems"><span>02</span><strong>systems</strong><small>structure</small></div>
      <div className="map-node node-delivery"><span>03</span><strong>delivery</strong><small>evidence</small></div>
      <div className="map-node node-product"><span>04</span><strong>product</strong><small>intent</small></div>
      <div className="map-center"><span>core</span><strong>useful<br />software</strong></div>
      <span className="map-label label-left">human ←→ system</span>
      <span className="map-label label-right">signal over noise</span>
    </div>
  );
}

function CapabilityRow({ capability }: { capability: Capability }) {
  return (
    <article className="capability-row">
      <div className="capability-index">{capability.index}</div>
      <div className="capability-main">
        <div className="capability-label">{capability.label}</div>
        <h3>{capability.title}</h3>
        <p>{capability.body}</p>
        <div className="capability-tags">{capability.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
      <div className={`capability-level level-${capability.level}`}><span>{capability.level}</span><i /></div>
    </article>
  );
}

function ActivityGrid() {
  return (
    <div className="activity-grid" aria-label="Atividade recente no GitHub">
      {activityWeeks.flatMap((week) => week).map((count, index) => {
        const level = count === 0 ? 0 : count < 5 ? 1 : count < 12 ? 2 : count < 22 ? 3 : 4;
        return <i key={`${index}-${count}`} className={`level-${level}`} title={`${count} contribuições`} />;
      })}
    </div>
  );
}

function Footer({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  return (
    <footer className="tui-footer section-width">
      <div className="footer-panel">
        <span className="footer-brand">LG / PROFILE</span>
        <span>curriculum rendered from GitHub history · {profile.updatedAt}</span>
        <button onClick={() => onNavigate("overview")}>back to top ↑</button>
      </div>
    </footer>
  );
}

export default App;
