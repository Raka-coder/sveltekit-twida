<h1 align="center">Simple Todo App</h1>

<p align="center">
  A full-stack todo application built with SvelteKit, Drizzle ORM, MySQL, and Better Auth.
</p>

<p align="center">
  <a href="https://svelte.dev/"><img src="https://img.shields.io/badge/SvelteKit-FF3E00?logo=svelte&logoColor=white&style=flat" alt="SvelteKit"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat" alt="TypeScript"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white&style=flat" alt="Tailwind CSS"></a>
  <a href="https://orm.drizzle.team/"><img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?logo=drizzle&logoColor=white&style=flat" alt="Drizzle ORM"></a>
  <a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&style=flat" alt="MySQL"></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat" alt="Docker"></a>
  <a href="https://www.better-auth.com/"><img src="https://img.shields.io/badge/Better_Auth-000000?logo=bcrypt&logoColor=white&style=flat" alt="Better Auth"></a>
</p>

<p align="center">
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/Vitest-6E9F17?logo=vitest&logoColor=white&style=flat" alt="Vitest"></a>
  <a href="https://playwright.dev/"><img src="https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white&style=flat" alt="Playwright"></a>
  <a href="https://eslint.org/"><img src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white&style=flat" alt="ESLint"></a>
  <a href="https://prettier.io/"><img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white&style=flat" alt="Prettier"></a>
  <a href="https://svelte.dev/"><img src="https://img.shields.io/badge/Svelte_5-FF3E00?logo=svelte&logoColor=white&style=flat" alt="Svelte 5"></a>
  <a href="https://inlang.com/m/gerre3mo/paraglide-js-library"><img src="https://img.shields.io/badge/Paraglide_JS-11999E?logo=paraglide&logoColor=white&style=flat" alt="Paraglide JS"></a>
</p>

## Tech Stack

| Layer | Technology |
|---|---|
| <img src="https://img.shields.io/badge/Framework-SvelteKit-FF3E00?logo=svelte&logoColor=white&style=flat" alt="SvelteKit"> | [SvelteKit](https://kit.svelte.dev/) + [Svelte 5](https://svelte.dev/) |
| <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat" alt="TypeScript"> | TypeScript |
| <img src="https://img.shields.io/badge/Styling-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white&style=flat" alt="Tailwind CSS"> | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn-svelte](https://www.shadcn-svelte.com/) |
| <img src="https://img.shields.io/badge/Database-Drizzle_ORM-C5F74F?logo=drizzle&logoColor=white&style=flat" alt="Drizzle ORM"> | MySQL via [Drizzle ORM](https://orm.drizzle.team/) |
| <img src="https://img.shields.io/badge/Auth-Better_Auth-000000?logo=bcrypt&logoColor=white&style=flat" alt="Better Auth"> | [Better Auth](https://www.better-auth.com/) (GitHub OAuth) |
| <img src="https://img.shields.io/badge/Testing-Vitest-6E9F17?logo=vitest&logoColor=white&style=flat" alt="Vitest"> | [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) |
| <img src="https://img.shields.io/badge/i18n-Paraglide_JS-11999E?logo=paraglide&logoColor=white&style=flat" alt="Paraglide JS"> | [Paraglide JS](https://inlang.com/m/gerre3mo/paraglide-js-library) via [inlang](https://inlang.com/) |
| <img src="https://img.shields.io/badge/Linting-ESLint-4B32C3?logo=eslint&logoColor=white&style=flat" alt="ESLint"> | ESLint + Prettier |

## Features

- **Authentication** — Email/password registration & login, GitHub OAuth via Better Auth
- **Task CRUD** — Create, read, update, and delete tasks with title and completion status
- **Bulk Actions** — Complete all tasks or delete all tasks with confirmation dialog
- **Task Filtering** — Filter tasks by status: All, Pending, Completed
- **Dashboard Stats** — Real-time counters for total, pending, and completed tasks
- **Profile Management** — Edit display name with avatar initials
- **Password Change** — Update password from the settings dialog
- **i18n** — Multi-language support (English, Deutsch, Bahasa Indonesia) via Paraglide JS
- **Collapsible Sidebar** — Responsive sidebar with navigation and filter controls
- **Responsive Design** — Mobile-first layout using Tailwind CSS + shadcn-svelte

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [Docker](https://www.docker.com/) & Docker Compose
- [npm](https://www.npmjs.com/) (or pnpm/yarn)

## Getting Started

### 1. Clone & Install

```sh
git clone <repo-url>
cd todo-app
npm install
```

### 2. Environment Variables

Copy the example env file and fill in your values:

```sh
cp .env.example .env
```

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | MySQL connection string | `mysql://root:mysecretpassword@localhost:3306/local` |
| `ORIGIN` | Allowed origin for CSRF protection | - |
| `BETTER_AUTH_SECRET` | Secret for Better Auth (32+ chars) | - |
| `GITHUB_CLIENT_ID` | GitHub OAuth App Client ID | - |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Client Secret | - |

For GitHub OAuth setup, follow the [Better Auth GitHub guide](https://www.better-auth.com/docs/authentication/github).

### 3. Start Database (Docker)

Spin up a local MySQL instance:

```sh
npm run db:start
```

This runs `docker compose up` using `compose.yaml`:

- **Port**: `3306`
- **Root password**: `mysecretpassword`
- **Database**: `local`

Data persists in the `mysqldata` Docker volume between restarts.

### 4. Push Schema

Push the Drizzle schema to the database:

```sh
npm run db:push
```

### 5. Run Dev Server

```sh
npm run dev

# or open in browser
npm run dev -- --open
```

## Database Commands

| Command | Description |
|---|---|
| `npm run db:start` | Start MySQL via Docker Compose |
| `npm run db:push` | Push schema changes to the database |
| `npm run db:generate` | Generate migration files |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:studio` | Open Drizzle Studio (web UI) |

## Authentication

Generate the Better Auth schema after initial setup:

```sh
npm run auth:schema
```

## Testing

```sh
# Run all tests (unit + e2e)
npm run test

# Unit tests only
npm run test:unit

# E2E tests only (installs Playwright browsers if needed)
npm run test:e2e
```

## Linting & Formatting

```sh
# Check lint + format
npm run lint

# Auto-format
npm run format

# Type check
npm run check

# Type check with watch
npm run check:watch
```

## i18n

Machine translate all messages:

```sh
npm run machine-translate
```

## Building for Production

```sh
npm run build
npm run preview
```

The build uses `adapter-auto` by default. See [SvelteKit adapters](https://svelte.dev/docs/kit/adapters) for other deployment targets (Vercel, Netlify, Node, etc.).

## Project Structure

```
src/
├── app.d.ts              # TypeScript declarations
├── app.html              # HTML template
├── hooks.server.ts       # Server hooks
├── lib/
│   └── server/           # Server-only code
│       ├── auth.ts       # Better Auth config
│       └── db/           # Drizzle schema & client
├── paraglide/            # Generated i18n files
└── routes/               # SvelteKit routes
```


