export type Capability = {
  id: string;
  index: string;
  label: string;
  title: string;
  body: string;
  tags: string[];
  level: "core" | "recurring" | "adjacent";
};

export type SkillGroup = {
  label: string;
  detail: string;
  items: string[];
  tone: "accent" | "green" | "warm";
};

export const profile = {
  name: "Luiz Gustavo Saraiva",
  firstName: "Luiz Gustavo",
  login: "luizgustavosaraiva",
  role: "Full-stack developer · product-minded engineer",
  location: "Bebedouro, SP",
  bio: "Construo software que transforma operações complexas em experiências claras, confiáveis e fáceis de manter.",
  github: "https://github.com/luizgustavosaraiva",
  linkedin: "https://www.linkedin.com/in/luiz-gustavo-saraiva/",
  avatar: "/avatar.png",
  updatedAt: "24 set 2026",
};

export const metrics = [
  { value: "07", label: "anos de atividade", note: "2020 → agora" },
  { value: "1.5k", label: "contribuições", note: "calendário GitHub" },
  { value: "30", label: "repos públicos", note: "sem forks" },
  { value: "159", label: "commits", note: "últimos 12 meses" },
  { value: "699", label: "PRs mergeados", note: "752 criados · histórico completo" },
];

export const capabilities: Capability[] = [
  {
    id: "product",
    index: "01",
    label: "product / interface",
    title: "Interfaces que reduzem atrito",
    body: "Transformo fluxos densos em superfícies simples de entender, operar e manter — sem esconder a complexidade que realmente importa.",
    tags: ["React", "Next.js", "TypeScript", "UI systems", "responsive"],
    level: "core",
  },
  {
    id: "systems",
    index: "02",
    label: "systems / data",
    title: "APIs e dados com fronteiras claras",
    body: "Modelos, contratos e integrações para que uma mudança de produto não vire um efeito domino silencioso.",
    tags: ["Node.js", "Fastify", "tRPC", "PostgreSQL", "Drizzle", "Zod"],
    level: "core",
  },
  {
    id: "delivery",
    index: "03",
    label: "delivery / quality",
    title: "Automação que entrega evidência",
    body: "CI/CD, testes, scripts e ferramentas de desenvolvimento entram no fluxo para deixar feedback rápido e repetível.",
    tags: ["GitHub Actions", "testing", "Vite", "Docker", "Shell", "DX"],
    level: "core",
  },
  {
    id: "integrations",
    index: "04",
    label: "integrations / operations",
    title: "Integrações que respeitam o contexto",
    body: "Webhooks, autenticação, pagamentos, mensagens e serviços externos entram no produto com contratos explícitos e estados observáveis.",
    tags: ["REST", "webhooks", "auth", "Stripe", "Firebase", "Supabase"],
    level: "recurring",
  },
  {
    id: "platform",
    index: "05",
    label: "platform / craft",
    title: "Software que atravessa camadas",
    body: "Do browser ao sistema operacional: performance, ergonomia, documentação e uma base técnica que não vira caixa-preta.",
    tags: ["Linux", "QML", "Rust", ".NET", "Dart", "architecture"],
    level: "adjacent",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "language layer",
    detail: "linguagens que aparecem com mais frequência",
    items: ["TypeScript", "JavaScript", "C#", "SQL", "HTML / CSS", "Dart", "Rust", "QML / Shell"],
    tone: "accent",
  },
  {
    label: "product layer",
    detail: "da interface ao comportamento",
    items: ["React", "Next.js", "Node.js", "component systems", "state", "responsive UI", "accessibility"],
    tone: "green",
  },
  {
    label: "systems layer",
    detail: "a base que sustenta o produto",
    items: ["Fastify", "tRPC", "PostgreSQL", "Drizzle", "Zod", "auth", "REST", "webhooks"],
    tone: "warm",
  },
  {
    label: "delivery layer",
    detail: "como a mudança chega ao mundo",
    items: ["GitHub Actions", "CI / CD", "testing", "Vite", "Docker", "Shell", "Puppeteer", "observability"],
    tone: "accent",
  },
];

export const trajectory = [
  {
    period: "2020—21",
    label: "fundamentos",
    title: "Interfaces, APIs e os primeiros produtos",
    body: "A base foi se formando entre frontend, backend e o hábito de colocar uma ideia em um link público.",
  },
  {
    period: "2022—24",
    label: "systems",
    title: "Ferramentas para operação real",
    body: "Mais dados, integrações, automação e superfícies administrativas: a pergunta passa a ser como tornar o trabalho repetitivo confiável.",
  },
  {
    period: "2025—26",
    label: "leverage",
    title: "Monorepos, agentes e sistemas operacionais",
    body: "A complexidade passa a pedir fronteiras claras, documentação e ferramentas que melhoram o ambiente de quem constrói.",
  },
  {
    period: "now",
    label: "next",
    title: "Software útil, legível e compartilhável",
    body: "O foco continua sendo transformar problemas operacionais em sistemas que uma equipe consegue entender e evoluir.",
  },
];

export const evidence = [
  {
    index: "01",
    label: "continuidade",
    value: "7 anos",
    title: "Construir também é manter",
    body: "A atividade não é uma coleção de screenshots: é um histórico contínuo de código, correções, decisões e melhorias.",
  },
  {
    index: "02",
    label: "collaboration",
    value: "699 merged",
    title: "Aberturas que geram mudança",
    body: "752 pull requests foram criados no histórico acessível da conta; 699 foram mergeados. O recorte inclui pull requests encerradas e repositórios arquivados, não apenas a janela de 12 meses.",
  },
  {
    index: "03",
    label: "breadth",
    value: "multi-stack",
    title: "Conhecimento que atravessa camadas",
    body: "A combinação de linguagens e formatos sugere um developer que entende o fluxo inteiro, não apenas uma camada isolada.",
  },
  {
    index: "04",
    label: "delivery",
    value: "build → learn",
    title: "Aprender no caminho",
    body: "A maior parte das competências principais aparece em ciclos: observar, construir, verificar, explicar e repetir com menos ruído.",
  },
];

// Last 28 GitHub calendar weeks, kept as a small visual signal rather than a vanity metric.
export const activityWeeks = [
  [13, 0, 0, 12, 1, 2, 0],
  [1, 0, 0, 0, 2, 6, 15],
  [2, 0, 0, 2, 4, 7, 25],
  [0, 11, 8, 14, 3, 22, 1],
  [6, 0, 0, 15, 24, 33, 18],
  [0, 0, 0, 1, 0, 8, 0],
  [2, 13, 1, 17, 0, 4, 0],
  [0, 0, 0, 8, 15, 8, 9],
  [10, 0, 11, 16, 6, 1, 4],
  [12, 0, 0, 3, 0, 14, 10],
  [1, 3, 0, 3, 6, 5, 7],
  [6, 0, 7, 12, 4, 1, 0],
  [0, 0, 0, 5, 1, 16, 12],
  [1, 0, 0, 0, 7, 12, 10],
  [4, 0, 0, 2, 2, 5, 4],
  [6, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 14, 2, 5, 21],
  [14, 0, 0, 2, 15, 1, 1],
  [4, 0, 0, 4, 4, 1, 8],
  [4, 0, 0, 24, 4, 9, 11],
  [6, 0, 0, 11, 3, 12, 1],
  [8, 0, 0, 2, 0, 3, 14],
  [4, 0, 0, 6, 4, 2, 6],
  [2, 1, 0, 21, 30, 9, 5],
  [8, 0, 0, 5, 3, 1, 7],
  [9, 2, 0, 7, 3, 5, 4],
  [27, 0, 0, 17, 2, 14, 17],
  [28, 0, 0, 2, 10, 6, 2],
];

export const principles = [
  { index: "01", title: "clareza antes de abstração", body: "A forma mais simples que explica o problema é quase sempre a melhor próxima interface." },
  { index: "02", title: "sistemas explicáveis", body: "Código, documentação e operação precisam contar a mesma história." },
  { index: "03", title: "ciclos curtos, prova real", body: "Construir, verificar e aprender vale mais do que acumular promises." },
];

export const navSections = [
  { id: "overview", label: "overview" },
  { id: "capabilities", label: "capabilities" },
  { id: "stack", label: "stack" },
  { id: "trajectory", label: "trajectory" },
  { id: "evidence", label: "evidence" },
];
