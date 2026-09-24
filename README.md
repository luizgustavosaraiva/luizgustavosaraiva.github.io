# Luiz Gustavo Saraiva — portfolio

Portfólio estático de developer, construído com React, TypeScript e Vite. A linguagem visual usa uma base editorial/terminal — tipografia monoespaçada, frames tracejados, um único acento e páginas curtas — inspirada no estilo de [mdxcn.dev](https://www.mdxcn.dev), sem copiar sua implementação.

## Rodando localmente

```bash
npm install
npm run dev
```

Para validar e gerar a versão de produção:

```bash
npm run check
npm run build
npm run preview
```

O build gera `dist/` e um `404.html` como fallback para as rotas `/work/`, `/docs/`, `/agents/` e `/about/` no GitHub Pages.

## Deploy

O workflow em `.github/workflows/pages.yml` faz o deploy automático para GitHub Pages a cada push na branch principal usando GitHub Actions. O repositório de destino deve ser `luizgustavosaraiva.github.io` para usar a URL canônica:

```text
https://luizgustavosaraiva.github.io
```

## Conteúdo

Os dados públicos e as highlights atuais ficam em `src/data.ts`. O site é deliberadamente estático: não expõe repositórios privados nem faz fetch em runtime. Para atualizar os números, revise o snapshot e a data em `profile.updatedAt`.

A imagem do AI Memory vem do repositório público `omarchy-ai-memory` e é usada como prova visual do projeto.
