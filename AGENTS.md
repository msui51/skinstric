# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js 16** (App Router) project called "Skinsctric", bootstrapped with `create-next-app`. It uses **npm** as its package manager (`package-lock.json`).

### Key commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (serves on `http://localhost:3000`) |
| Lint | `npm run lint` (runs ESLint with flat config) |
| Build | `npm run build` |
| Production start | `npm start` |

### Notes

- No database, Docker, or external services are required.
- No `.env` file is needed; the app has no environment variable dependencies.
- No test framework is configured yet — there are no automated tests to run.
- The dev server supports hot-reload; editing `app/page.tsx` reflects changes immediately.
