import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  contributions,
  metrics,
  notes,
  profile,
  projects,
  stack,
  type Project,
} from "./data";

type Route = "home" | "work" | "docs" | "agents" | "about";

const routePaths: Record<Route, string> = {
  home: "/",
  work: "/work/",
  docs: "/docs/",
  agents: "/agents/",
  about: "/about/",
};

function routeFromLocation(): Route {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/work") return "work";
  if (path === "/docs") return "docs";
  if (path === "/agents") return "agents";
  if (path === "/about") return "about";
  if (path === "/") return "home";
  return "about";
}

function App() {
  const [route, setRoute] = useState<Route>(() => routeFromLocation());
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    return saved === "light" ? "light" : "dark";
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const onPopState = () => setRoute(routeFromLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA";
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navigate = (next: Route) => {
    window.history.pushState({}, "", routePaths[next]);
    setRoute(next);
    setSearchOpen(false);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <Header
        route={route}
        theme={theme}
        onNavigate={navigate}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        onOpenSearch={() => setSearchOpen(true)}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
      />
      {route === "home" && <HomePage onNavigate={navigate} />}
      {route === "work" && <WorkPage onNavigate={navigate} />}
      {route === "docs" && <DocsPage onNavigate={navigate} />}
      {route === "agents" && <AgentsPage onNavigate={navigate} />}
      {route === "about" && <AboutPage onNavigate={navigate} />}
      <Footer onNavigate={navigate} />
      {searchOpen && <CommandPalette onClose={() => setSearchOpen(false)} onNavigate={navigate} />}
    </div>
  );
}

type HeaderProps = {
  route: Route;
  theme: "dark" | "light";
  onNavigate: (route: Route) => void;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  menuOpen: boolean;
  onToggleMenu: () => void;
};

function Header({ route, theme, onNavigate, onToggleTheme, onOpenSearch, menuOpen, onToggleMenu }: HeaderProps) {
  const links: Array<{ route: Route; label: string }> = [
    { route: "work", label: "work" },
    { route: "docs", label: "docs" },
    { route: "agents", label: "agents" },
    { route: "about", label: "about" },
  ];

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="wordmark" onClick={() => onNavigate("home")} aria-label="Ir para o início">
          <span className="wordmark-mark">LG</span>
          <span className="wordmark-slash">/</span>
          <span>DEV</span>
        </button>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
          {links.map((link) => (
            <button
              key={link.route}
              className={`nav-link ${route === link.route ? "is-active" : ""}`}
              onClick={() => onNavigate(link.route)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <button
          className="mobile-menu-toggle"
          onClick={onToggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? "×" : "≡"}
        </button>
        <div className="topbar-actions">
          <button className="search-trigger" onClick={onOpenSearch} aria-label="Abrir busca">
            <span>search</span>
            <kbd>⌘ K</kbd>
          </button>
          <span className="availability"><i /> available</span>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {theme === "dark" ? "☼" : "◐"}
          </button>
        </div>
      </div>
    </header>
  );
}

function HomePage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const featured = projects.filter((project) => project.featured);

  return (
    <main>
      <section className="hero section-pad">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-mark">+</span> portfolio / 2026</div>
          <h1>
            Construo software<br />
            <span className="text-accent">que deixa o complexo</span><br />
            mais legível.
          </h1>
          <p className="hero-lede">
            Sou {profile.name.split(" ")[0]}, developer full-stack e construtor de produtos. Trabalho entre
            interface, dados, automação e as engrenagens que fazem uma ferramenta funcionar de verdade.
          </p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => onNavigate("work")}>
              ver projetos <span>↗</span>
            </button>
            <a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer">
              github <span>↗</span>
            </a>
          </div>
          <div className="hero-footnote">
            <span className="status-dot" />
            <span>atualmente construindo ferramentas pequenas com impacto grande.</span>
          </div>
        </div>
        <div className="hero-visual">
          <AsciiFrame title="profile.signal" className="signal-frame">
            <div className="signal-table">
              <div><span>name</span><strong>{profile.shortName}</strong></div>
              <div><span>role</span><strong>full-stack / product</strong></div>
              <div><span>base</span><strong>{profile.location}</strong></div>
              <div><span>focus</span><strong>tools · systems · ai</strong></div>
            </div>
            <pre className="ascii-avatar" aria-label="ASCII avatar">
{`   .--------.
  /  o    o  \\
 |      __     |
  \\  .----.  /
   '--------'
     [  lg  ]`}
            </pre>
            <div className="signal-footer">
              <span>status</span>
              <strong><i className="inline-dot" /> building in public</strong>
            </div>
          </AsciiFrame>
          <div className="hero-caption"><span>fig. 01</span> a portrait, rendered in text.</div>
        </div>
      </section>

      <section className="metrics-strip section-pad" aria-label="GitHub metrics">
        {metrics.map((metric, index) => (
          <div className="metric" key={metric.label}>
            <span className="metric-index">0{index + 1}</span>
            <strong>{metric.value}</strong>
            <span className="metric-label">{metric.label}</span>
            <small>{metric.note}</small>
          </div>
        ))}
      </section>

      <section className="section-pad work-preview" id="work">
        <SectionHeading
          eyebrow="selected work"
          title="coisas que eu construí"
          action={<button className="text-link" onClick={() => onNavigate("work")}>ver arquivo completo <span>→</span></button>}
        />
        <div className="project-grid project-grid-home">
          {featured.map((project) => <ProjectCard key={project.slug} project={project} compact />)}
        </div>
      </section>

      <section className="section-pad process-section">
        <div className="process-copy">
          <SectionHeading eyebrow="working style" title="do problema ao sistema" />
          <p>
            Gosto de começar pelo fluxo real, não pelo framework. Entender a operação, escolher a menor
            superfície útil e deixar a decisão visível no código e nos testes.
          </p>
          <div className="principle-list">
            <div><span>01</span><strong>clareza antes de abstração</strong></div>
            <div><span>02</span><strong>interfaces que explicam o sistema</strong></div>
            <div><span>03</span><strong>ship pequeno, aprender rápido</strong></div>
          </div>
        </div>
        <AsciiFrame title="build.loop" className="process-frame">
          <pre className="flow-diagram">{`  observe
     │
     ▼
  frame       →  build
     ▲              │
     │              ▼
  learn  ←  verify  ←  ship
     │
     └──────────────┘`}</pre>
          <div className="frame-caption">small loops / durable systems</div>
        </AsciiFrame>
      </section>

      <section className="section-pad contribution-preview">
        <SectionHeading
          eyebrow="open source trail"
          title="contribuições que ficaram"
          action={<button className="text-link" onClick={() => onNavigate("agents")}>ver linha do tempo <span>→</span></button>}
        />
        <ContributionList items={contributions.slice(0, 3)} />
      </section>

      <ContactBanner onNavigate={onNavigate} />
    </main>
  );
}

function WorkPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "all" },
    { id: "featured", label: "featured" },
    { id: "product", label: "product" },
    { id: "tooling", label: "tooling" },
    { id: "archive", label: "archive" },
  ];

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "featured") return projects.filter((project) => project.featured);
    if (filter === "archive") return projects.filter((project) => project.status === "archive");
    if (filter === "tooling") {
      return projects.filter((project) => /tool|action|admin|utility/i.test(`${project.title} ${project.kicker}`));
    }
    return projects.filter((project) => /product|released|foundation/i.test(`${project.title} ${project.kicker}`));
  }, [filter]);

  return (
    <main className="page-main section-pad">
      <PageIntro
        eyebrow="work / archive"
        title="projects, tools & experiments"
        description="Uma seleção do que está público no GitHub. O critério não é o número de stars; é o quanto o projeto torna um fluxo real mais claro, testável ou confiável."
      />
      <div className="filter-row" role="tablist" aria-label="Filtrar projetos">
        {filters.map((item) => (
          <button
            key={item.id}
            className={`filter-button ${filter === item.id ? "is-selected" : ""}`}
            onClick={() => setFilter(item.id)}
            role="tab"
            aria-selected={filter === item.id}
          >
            {item.label}
          </button>
        ))}
        <span className="filter-count">{String(filteredProjects.length).padStart(2, "0")} results</span>
      </div>
      <div className="project-grid project-grid-all">
        {filteredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
      <div className="page-footnote">
        <span className="status-dot" /> dados públicos do GitHub · atualizado em {profile.updatedAt}
        <button className="text-link" onClick={() => onNavigate("about")}>sobre o processo →</button>
      </div>
    </main>
  );
}

function DocsPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <main className="page-main section-pad">
      <PageIntro
        eyebrow="docs / field notes"
        title="notes from the build"
        description="Notas curtas sobre decisões de produto, arquitetura e as pequenas coisas que fazem um projeto continuar compreensível depois do primeiro deploy."
      />
      <div className="docs-layout">
        <div className="docs-index">
          <div className="docs-index-label">índice</div>
          {notes.map((note, index) => (
            <a href={`#${note.id}`} className="docs-index-link" key={note.id}>
              <span>0{index + 1}</span>{note.title}
            </a>
          ))}
          <div className="docs-index-rule" />
          <span className="docs-index-note">mais notas em breve<br />quando houver algo que mereça ser revisado.</span>
        </div>
        <div className="notes-list">
          {notes.map((note) => <NoteEntry key={note.id} note={note} />)}
        </div>
      </div>
      <AsciiFrame title="writing.rule" className="docs-rule-frame">
        <pre className="flow-diagram">{`  claim
    │
    ├── context
    ├── decision
    └── evidence  →  next`}</pre>
        <p>Uma nota só vale o custo quando muda uma decisão.</p>
      </AsciiFrame>
      <div className="page-back-row">
        <button className="text-link" onClick={() => onNavigate("work")}>← voltar para o work</button>
      </div>
    </main>
  );
}

function AgentsPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <main className="page-main section-pad">
      <PageIntro
        eyebrow="agents / collaboration"
        title="agents are leverage, not autopilot"
        description="Uso agentes para acelerar exploração, revisar hipóteses e manter o trabalho em movimento. A decisão continua sendo minha: contexto, escopo, trade-offs e o que entra no mundo."
      />
      <div className="agents-grid">
        <AsciiFrame title="agent.loop" className="agent-loop-frame">
          <pre className="flow-diagram">{`  intent
    │
    ▼
  context  →  propose
    ▲              │
    │              ▼
  verify  ←  apply
    │
    └── human checkpoint`}</pre>
          <div className="frame-caption">the useful part is the checkpoint</div>
        </AsciiFrame>
        <div className="agents-copy">
          <div className="eyebrow">operating principles</div>
          <div className="principle-list principle-list-large">
            <div><span>01</span><strong>contexto antes de prompt</strong><small>leio o repo, as docs e o estado real antes de pedir uma implementação.</small></div>
            <div><span>02</span><strong>small, reversible slices</strong><small>mudanças pequenas deixam espaço para verificar e aprender.</small></div>
            <div><span>03</span><strong>evidência no fim</strong><small>testes, logs, uma issue reproduzível ou um link funcionando.</small></div>
            <div><span>04</span><strong>human checkpoint</strong><small>autonomia é útil; editar o julgamento é onde entra a responsabilidade.</small></div>
          </div>
        </div>
      </div>
      <section className="agent-contrib-section">
        <SectionHeading eyebrow="public trail" title="work beyond my own repos" />
        <ContributionList items={contributions} />
      </section>
      <div className="page-back-row">
        <button className="text-link" onClick={() => onNavigate("about")}>conhecer o autor →</button>
      </div>
    </main>
  );
}

function AboutPage({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <main className="page-main section-pad">
      <div className="about-hero">
        <div className="about-portrait-wrap">
          <img className="about-portrait" src={profile.avatar} alt={`Retrato de ${profile.name}`} />
          <span className="portrait-label">hello / from {profile.location}</span>
        </div>
        <div className="about-hero-copy">
          <div className="eyebrow">about / the person behind the commits</div>
          <h1>Programador full-stack.<br /><span className="text-accent">Curioso por padrão.</span></h1>
          <p>{profile.bio}</p>
          <p>
            Ao longo da jornada, passei por produtos, operação, automação e infraestrutura. Hoje meu foco
            está em construir sistemas que tiram o ruído do caminho de quem usa.
          </p>
          <div className="about-links">
            <a className="button button-primary" href={profile.linkedin} target="_blank" rel="noreferrer">linkedin <span>↗</span></a>
            <a className="button button-quiet" href={profile.github} target="_blank" rel="noreferrer">github <span>↗</span></a>
          </div>
        </div>
      </div>
      <section className="about-grid">
        <div>
          <SectionHeading eyebrow="toolkit" title="stack I reach for" />
          <div className="stack-list">
            {stack.map((item) => (
              <div className="stack-row" key={item.name}>
                <span>{item.name}</span>
                <span className={`stack-level level-${item.level}`}>{item.level}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeading eyebrow="path" title="a few turning points" />
          <div className="timeline-list">
            <div><span>2020—21</span><p>primeiros produtos e bootcamps: interface, API e o hábito de publicar.</p></div>
            <div><span>2022—24</span><p>ferramentas internas, admin surfaces e automação que resolve trabalho real.</p></div>
            <div><span>2025—26</span><p>monorepos, agent workflows, Linux tooling e sistemas com mais contexto.</p></div>
          </div>
        </div>
      </section>
      <ContactBanner onNavigate={onNavigate} />
    </main>
  );
}

function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <article className={`project-card ${project.image ? "has-image" : ""} ${compact ? "is-compact" : ""}`}>
      <div className="project-card-head">
        <span className="project-number">[{project.number}]</span>
        <span className="project-kicker">{project.kicker}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      {project.image && (
        <div className="project-image-wrap">
          <img src={project.image} alt={`Prévia do projeto ${project.title}`} className="project-image" />
          <span className="image-caption">fig. {project.number} / live surface</span>
        </div>
      )}
      {!compact && <p className="project-detail">{project.detail}</p>}
      <div className="project-card-foot">
        <div className="tag-list">
          {project.stack.slice(0, compact ? 3 : 5).map((item) => <span key={item}>{item}</span>)}
        </div>
        <a className="project-link" href={project.repo} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.title} no GitHub`}>
          {project.status ?? "repo"} <span>↗</span>
        </a>
      </div>
    </article>
  );
}

function ContributionList({ items }: { items: typeof contributions }) {
  return (
    <div className="contribution-list">
      {items.map((item) => (
        <a className="contribution-row" href={item.href} target="_blank" rel="noreferrer" key={`${item.date}-${item.title}`}>
          <span className="contribution-date">{item.date}</span>
          <span className="contribution-type">{item.type}</span>
          <div className="contribution-main">
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </div>
          <span className="contribution-metric">{item.metric} <b>↗</b></span>
        </a>
      ))}
    </div>
  );
}

function NoteEntry({ note }: { note: (typeof notes)[number] }) {
  return (
    <article className="note-entry" id={note.id}>
      <div className="note-meta"><span>{note.date}</span><span>{note.label}</span></div>
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <a className="text-link" href={note.href} target="_blank" rel="noreferrer">abrir no github <span>↗</span></a>
    </article>
  );
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="page-intro">
      <div className="eyebrow"><span className="eyebrow-mark">+</span> {eyebrow}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

function AsciiFrame({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`ascii-frame ${className}`}>
      <div className="frame-title">{title}</div>
      <div className="frame-content">{children}</div>
    </div>
  );
}

function ContactBanner({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <section className="contact-banner section-pad">
      <div>
        <div className="eyebrow">next / say hello</div>
        <h2>Tem um sistema<br />para deixar mais simples?</h2>
      </div>
      <div className="contact-action">
        <p>Se o problema envolve produto, operação ou automação, vou querer entender o fluxo antes de sugerir a solução.</p>
        <a className="button button-primary" href={profile.linkedin} target="_blank" rel="noreferrer">conectar no linkedin <span>↗</span></a>
        <button className="text-link" onClick={() => onNavigate("work")}>ou explore o archive →</button>
      </div>
    </section>
  );
}

function Footer({ onNavigate }: { onNavigate: (route: Route) => void }) {
  return (
    <footer className="site-footer section-pad">
      <div className="footer-main">
        <span className="footer-mark">LG/DEV</span>
        <span className="footer-copy">built with curiosity, types and too much coffee.</span>
        <span className="footer-year">© {new Date().getFullYear()}</span>
      </div>
      <div className="footer-links">
        <button onClick={() => onNavigate("work")}>work</button>
        <button onClick={() => onNavigate("docs")}>docs</button>
        <a href={profile.github} target="_blank" rel="noreferrer">github ↗</a>
        <a href="#top" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>top ↑</a>
      </div>
    </footer>
  );
}

function CommandPalette({ onClose, onNavigate }: { onClose: () => void; onNavigate: (route: Route) => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return projects.slice(0, 5);
    return projects.filter((project) => `${project.title} ${project.summary} ${project.stack.join(" ")}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="palette-backdrop" role="presentation" onMouseDown={onClose}>
      <div className="command-palette" role="dialog" aria-modal="true" aria-label="Busca de projetos" onMouseDown={(event) => event.stopPropagation()}>
        <div className="palette-input-wrap">
          <span>⌕</span>
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="buscar projetos, stacks, sinais..." />
          <button onClick={onClose}>esc</button>
        </div>
        <div className="palette-results">
          {results.length > 0 ? results.map((project) => (
            <button className="palette-result" key={project.slug} onClick={() => onNavigate("work")}>
              <span className="palette-result-number">[{project.number}]</span>
              <span><strong>{project.title}</strong><small>{project.kicker}</small></span>
              <span className="palette-arrow">↗</span>
            </button>
          )) : <div className="palette-empty">nenhum sinal encontrado.</div>}
        </div>
        <div className="palette-footer"><span>↵ abrir archive</span><span>esc fechar</span></div>
      </div>
    </div>
  );
}

export default App;
