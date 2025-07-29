# Favs

![version](https://vercelbadge.vercel.app/api/BeatrizPedrosa/favs)
![build](https://img.shields.io/badge/build-passing-brightgreen)
![license](https://img.shields.io/github/license/BeatrizPedrosa/favs)
![last commit](https://img.shields.io/github/last-commit/BeatrizPedrosa/favs)
![vercel](https://img.shields.io/badge/deploy-vercel-black)
![next](https://img.shields.io/badge/Next.js-15-blue)
![react](https://img.shields.io/badge/React-19-blue)

Salva as músicas curtidas em uma playlist e limpa a lista de músicas curtidas

---

## Sumário

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts](#script)
- [Uso](#uso)
- [Arquitetura / Estrutura](#arquitetura--estrutura)
- [Licença](#licença)
- [Contato](#contato)

---

## Sobre

Projeto para estudar a comunicação com apis externas

---

## Tecnologias

### Tecnologias principais

| Categoria         | Tecnologias    |
| ----------------- | -------------- |
| **Framework**     | Next.js 15.4.4 |
| **Linguagem**     | TypeScript     |
| **Biblioteca UI** | React 19.1.0   |
| **Estilização**   | TailwindCSS 4  |

### Ferramentas de desenvolvimento

| Propósito                | Bibliotecas/Tools              |
| ------------------------ | ------------------------------ |
| **Transpilação**         | TypeScript                     |
| **Linting (análise)**    | ESLint + eslint-config-next    |
| **Formatação de código** | Prettier                       |
| **Tipos do Node.js**     | @types/node                    |
| **Tipos do React**       | @types/react, @types/react-dom |

---

## Pré-requisitos

- Node.js 20+
- npm 9+

---

## Instalação

Acessar o link de desenvolvedores do [Spotify for Developers](https://developer.spotify.com/), criar o app e pegar os dados:

- SPOTIFY_CLIENT_ID
- SPOTIFY_CLIENT_SECRET

Criar uma conta no [ngrok](https://dashboard.ngrok.com/signup), pois o Spotify exite que a url seja https. Lá terá as instruções para adicionar o token do ngrok ao projeto.

```bash
git clone https://github.com/BeatrizPedrosa/favs.git
cd favs
npm install
npm install -g ngrok
ngrok http 3000
```

A url fornecida pelo ngrok deve ser salva em:

- NEXTAUTH_URL
- SPOTIFY_REDIRECT_URI

Além disso deve ser adicionada no Redirect URIs do Spotify for Developers como no exemplo abaixo:
https://id.ngrok-free.app/api/auth/spotify/callback

Em um segundo terminal rode o projeto:

```bash
npm run dev
```

---

## Script

- `npm run dev` – inicia o servidor em modo desenvolvimento
- `npm run build` – compila o projeto
- `npm run lint` – roda o linter
- `npm run format` – roda o Prettier

---

## Uso

- Acesse a url fornecida pelo ngrok
- Clique no botão "Login com Spotify"
- O sistema vai acessar a conta, criar uma playlist, copiar para ela as músicas curtidas e, por fim, limpar a lista de curtidas.

---

## Arquitetura / Estrutura

### **Estilo da arquitetura**

- **Modular e desacoplada**:
  - `app/` separa rotas, API e layout.
  - `components/` desacopla a UI.
  - `lib/` separa lógica de negócio.
  - `types/` isola tipagens, evitando `any`.

- **Fullstack** (com rota API integrada no Next):
  - Suporte para SSR, Client Components, e rotas de API.
  - Seu projeto manipula a API do Spotify **direto do backend** via `/app/api`.

---

### **Resumo**

- Arquitetura **modular + app router + SSR/SPA**.
- Ideal para projetos fullstack modernos.
- Permite deploy direto na **Vercel**, com **autenticação**, **API**, e **UI integrada**.

```bash
/favs
├── .next/ # Build do Next.js (ignorado no Git)
├── .vscode/ # Configurações do VSCode
├── node_modules/ # Dependências instaladas
├── public/ # Arquivos estáticos públicos (ex: imagens)
├── src/
│ └── app/ # App Router do Next.js
│ ├── api/ # Rotas de API
│ │ └── auth/
│ │ └── spotify/
│ │ └── callback/
│ │ └── route.ts # Callback de auth com Spotify
│ │ └── spotify/
│ │ └── playlist-curtidas/
│ │ └── route.ts # Criação da playlist com curtidas
│ ├── spotify-playlist/ # Página da playlist criada
│ │ └── page.tsx
│ ├── page.tsx # Página inicial do app
│ ├── layout.tsx # Layout padrão
│ └── globals.css # Estilos globais (Tailwind)
├── .env # Variáveis de ambiente reais
├── .env.example # Modelo de variáveis
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── next-env.d.ts # Integração TypeScript + Next.js
```

---

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para detalhes.

---

## Contato

- bcpr@ymail.com
- https://github.com/BeatrizPedrosa

---
