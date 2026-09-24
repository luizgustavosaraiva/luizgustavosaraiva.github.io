# Luiz Gustavo Saraiva — profile

Currículo auto-apresentado em uma única página, com linguagem visual de TUI: painéis, hierarquia, sinais agregados e uma navegação por âncoras. A referência de estilo é o sistema do [mdxcn.dev](https://www.mdxcn.dev), não uma cópia de terminal ou de shell.

## O que ele representa

- **GitHub como fonte**: languages, formatos de entrega, integrações, atividade e colaboração.
- **Histórico completo**: o recorte de pull requests considera todos os PRs criados pela conta que ainda estão acessíveis, incluindo estados fechados e repositórios arquivados; repositórios excluídos pelo GitHub não podem ser recuperados.
- **Sem vitrine de projetos**: nenhum repositório, nome de produto ou caso individual é listado.
- **Competências em camadas**: interface, sistemas, dados, automação, integrações e platform craft.
- **Uma página**: `overview`, `capabilities`, `stack`, `trajectory` e `evidence` são seções da mesma interface.
- **TUI, não terminal**: panels, map, meters, activity grid e hierarquia visual; sem prompts ou comandos.

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

O build gera `dist/` e um `404.html` de fallback. O deploy é feito por GitHub Actions em `.github/workflows/pages.yml` e usa a URL canônica:

```text
https://luizgustavosaraiva.github.io
```

## Atualização dos dados

Os sinais agregados ficam em `src/data.ts`. O snapshot público foi revisado em `24 set 2026`; ao atualizar o histórico, revise os números e a data em `profile.updatedAt`.
