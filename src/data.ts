export type Project = {
  slug: string;
  number: string;
  title: string;
  kicker: string;
  year: string;
  summary: string;
  detail: string;
  stack: string[];
  repo: string;
  status?: string;
  image?: string;
  featured?: boolean;
};

export type Contribution = {
  date: string;
  type: "pull request" | "issue" | "commit run";
  title: string;
  description: string;
  href: string;
  metric: string;
};

export const profile = {
  name: "Luiz Gustavo Saraiva",
  shortName: "Luiz Gustavo",
  login: "luizgustavosaraiva",
  role: "Developer full-stack · product-minded engineer",
  location: "Bebedouro, SP",
  bio: "Construo produtos, ferramentas internas e automações que deixam operações complexas mais simples de usar, entender e manter.",
  github: "https://github.com/luizgustavosaraiva",
  linkedin: "https://www.linkedin.com/in/luiz-gustavo-saraiva/",
  avatar: "/avatar.png",
  updatedAt: "24 set 2026",
};

export const metrics = [
  { value: "1.5k", label: "contribuições", note: "GitHub · últimos 12 meses" },
  { value: "29", label: "repos públicos", note: "owner · sem forks" },
  { value: "159", label: "commits", note: "últimos 12 meses" },
  { value: "04", label: "pull requests", note: "mergeados no período" },
];

export const projects: Project[] = [
  {
    slug: "omarchy-ai-memory",
    number: "01",
    title: "AI Memory / Omarchy",
    kicker: "tool released · public",
    year: "2026",
    summary:
      "Um companheiro de desktop que leva o wiki ai-memory para dentro do shell Omarchy — sem abrir o navegador.",
    detail:
      "Bar widget em QML com handoffs pendentes, estatísticas da sessão, busca FTS5, listagem de páginas e renderização Markdown dentro do painel. A API é consumida em modo read-only, com manifesto, hot reload e instalador com checksum.",
    stack: ["QML", "Shell", "JSON", "Markdown"],
    repo: "https://github.com/luizgustavosaraiva/omarchy-ai-memory",
    status: "v1.1.2",
    image: "/omarchy-ai-memory.png",
    featured: true,
  },
  {
    slug: "sendro",
    number: "02",
    title: "Sendro",
    kicker: "product foundation · public",
    year: "2026",
    summary:
      "Base de uma plataforma B2B para organizar despacho de entregas, da criação da solicitação ao proof-of-delivery.",
    detail:
      "Monorepo pnpm + Turborepo com API Fastify/tRPC, autenticação, dashboard SSR, regras de pricing, Stripe Connect e contratos compartilhados com Zod. A documentação do projeto separa claramente o que está entregue do que ainda é roadmap.",
    stack: ["TypeScript", "Fastify", "tRPC", "Drizzle", "PostgreSQL", "pnpm"],
    repo: "https://github.com/luizgustavosaraiva/sendro",
    status: "M001–M004",
    featured: true,
  },
  {
    slug: "get-pull-requests-commits",
    number: "03",
    title: "PR Commits Action",
    kicker: "developer tooling · public",
    year: "2024",
    summary:
      "Uma GitHub Action pequena e explícita para coletar os commits do pull request atual durante checks de CI.",
    detail:
      "O objetivo não é abstrair o GitHub inteiro: é entregar o contexto certo para o próximo step do workflow, com uma superfície pequena, documentada e fácil de adopter.",
    stack: ["TypeScript", "GitHub Actions", "Node.js"],
    repo: "https://github.com/luizgustavosaraiva/get-pull-requests-commits",
    status: "open source",
    featured: true,
  },
  {
    slug: "enviou-metrics",
    number: "04",
    title: "Enviou Metrics",
    kicker: "operational tool · public repo",
    year: "2022",
    summary:
      "Uma ferramenta web para acompanhamento de métricas, criada para transformar dados operacionais em uma leitura mais rápida.",
    detail:
      "Um experimento concreto de produto interno: interface web, dados de operação e implantação automatizada em um repositório pequeno e fácil de entender.",
    stack: ["TypeScript", "HTML", "GitHub Actions"],
    repo: "https://github.com/luizgustavosaraiva/enviou-metrics",
    status: "shipped",
  },
  {
    slug: "ig-news",
    number: "05",
    title: "iG News",
    kicker: "editorial product · experiment",
    year: "2021",
    summary:
      "Uma plataforma editorial com feed de notícias, assinatura e CMS — um laboratório de produto full-stack.",
    detail:
      "Exploração de frontend, autenticação, pagamentos e conteúdo headless em um projeto com Next.js, Prismic, Stripe, Supabase e SCSS.",
    stack: ["Next.js", "Prismic", "Stripe", "Supabase", "SCSS"],
    repo: "https://github.com/luizgustavosaraiva/ig.news",
    status: "learning lab",
  },
  {
    slug: "letmeask",
    number: "06",
    title: "Letmeask",
    kicker: "realtime product · experiment",
    year: "2021",
    summary:
      "Um espaço de perguntas e respostas em tempo real, construído para aprender a montar produto do zero.",
    detail:
      "React, Firebase e uma experiência focada em quem pergunta e quem responde. Um bom lembrete de que um projeto pequeno ainda pode ensinar architecture, state e product thinking.",
    stack: ["React", "TypeScript", "Firebase"],
    repo: "https://github.com/luizgustavosaraiva/letmeask",
    status: "1 star",
  },
  {
    slug: "ipanema-admin",
    number: "07",
    title: "Painel administrativo",
    kicker: "admin surface · archive",
    year: "2024",
    summary:
      "Uma superfície administrativa para operar dados com uma camada de controle e uma experiência de uso menos improvisada.",
    detail:
      "Projeto React/TypeScript com foco em telas administrativas, adaptações de dados e uma base para ferramentas internas que precisam ser previsíveis.",
    stack: ["React", "TypeScript", "React Admin"],
    repo: "https://github.com/luizgustavosaraiva/ipanema-admin",
    status: "archive",
  },
  {
    slug: "sorteai",
    number: "08",
    title: "Sorteio",
    kicker: "utility · archive",
    year: "2024",
    summary:
      "Uma utilidade web para sorteios, construída como um exercício direto de interface e deploy.",
    detail:
      "Um repositório de Learn by shipping: TypeScript, React, CSS e o ciclo completo de levar uma ideia pequena até um link público.",
    stack: ["TypeScript", "React", "CSS"],
    repo: "https://github.com/luizgustavosaraiva/sorteai",
    status: "archive",
  },
];

export const contributions: Contribution[] = [
  {
    date: "2026-09",
    type: "issue",
    title: "Omarchy plugin marketplace",
    description:
      "Submissão e ciclo de verificação do AI Memory como bar widget, incluindo documentação de instalação, dependências e segurança do instalador.",
    href: "https://github.com/omacom/omarchy-plugin-marketplace/issues/7178",
    metric: "2 issues",
  },
  {
    date: "2026-04",
    type: "pull request",
    title: "SquadFoundry CLI",
    description:
      "Quatro PRs mergeados para deixar a inicialização, a descoberta de comandos e o bridge do Claude mais resilientes em diferentes hosts e shells.",
    href: "https://github.com/cubocompany/squadfoundry/pulls?q=is%3Apr+author%3Aluizgustavosaraiva",
    metric: "4 merged PRs",
  },
  {
    date: "2026-04",
    type: "issue",
    title: "Graphify installation report",
    description:
      "Identifiquei e reportei uma lacuna entre a mensagem de sucesso do instalador e os arquivos/comandos que não apareciam no ambiente.",
    href: "https://github.com/Graphify-Labs/graphify/issues/378",
    metric: "reproduzível",
  },
  {
    date: "2026-04",
    type: "commit run",
    title: "OpenGem / codebase work",
    description:
      "Um bloco de implementação em um repositório público da Cubo, com 44 commits registrados no mesmo período.",
    href: "https://github.com/cubocompany/opengem",
    metric: "44 commits",
  },
];

export const stack = [
  { name: "TypeScript", level: "core" },
  { name: "React / Next.js", level: "core" },
  { name: "Node.js / Fastify", level: "core" },
  { name: "PostgreSQL / Drizzle", level: "working" },
  { name: "QML / Linux tooling", level: "working" },
  { name: "C# / .NET", level: "foundation" },
];

export const notes = [
  {
    id: "read-only",
    date: "2026-09",
    label: "product / interface",
    title: "Read-only é uma decisão de produto",
    body: "O painel do AI Memory não muta a wiki. Restringir a superfície deixou a integração mais segura e a experiência mais barata de explicar.",
    href: "https://github.com/luizgustavosaraiva/omarchy-ai-memory",
  },
  {
    id: "contract",
    date: "2026-04",
    label: "architecture / monorepo",
    title: "Um monorepo é um contrato",
    body: "No Sendro, schemas compartilhados, fronteiras de app e verificações de workspace transformam a arquitetura em decisões que podem ser testadas.",
    href: "https://github.com/luizgustavosaraiva/sendro",
  },
  {
    id: "small-surface",
    date: "2024-10",
    label: "tooling / CI",
    title: "A melhor automação tem uma superfície pequena",
    body: "A PR Commits Action existe para resolver um único ponto do workflow. O valor está no contrato simples, não em adicionar mais uma plataforma.",
    href: "https://github.com/luizgustavosaraiva/get-pull-requests-commits",
  },
];
