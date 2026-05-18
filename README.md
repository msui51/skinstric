# Skinsctric

Skinsctric is a skincare-focused web application that presents an AI-powered personalized skincare experience. The app introduces users to the product concept, encourages them to discover the AI experience, and guides them into an interactive testing flow.

## What I built

I built a frontend web app for a skincare brand experience called **Skinsctric**.

The application currently includes:

- A polished landing page with branded messaging
- Interactive CTA flows for **Discover A.I.** and **Take Test**
- Client-side navigation into a `/testing` experience
- A responsive, modern UI built with reusable frontend structure
- Styling focused on a premium skincare/product aesthetic

From the homepage messaging and interaction design, the product is positioned as an AI-driven skincare routine generator that creates highly personalized recommendations based on a user's skin needs.

## Tech stack

### Core technologies

- **Next.js 16** — React framework used to build the application
- **React 19** — component-based UI library powering the frontend
- **TypeScript** — primary language used for application logic and components

### Styling and UI

- **CSS Modules** — component-scoped styling for the app UI
- **CSS** — custom styling for layout, branding, and interaction states
- **react-icons** — icon library dependency for UI enhancements

### Tooling

- **npm** — package manager used in the project
- **ESLint 9** — linting and code quality checks
- **eslint-config-next** — Next.js linting configuration

## Project structure

Key folders and files include:

- `app/` — App Router pages and route-level UI
- `components/` — reusable UI components
- `public/` — static assets
- `app/page.tsx` — homepage implementation
- `package.json` — scripts and dependency definitions

## Available scripts

```bash
npm run dev
npm run build
npm start
npm run lint
```

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser at `http://localhost:3000`

## Language composition

Repository language breakdown:

- **TypeScript:** 57.7%
- **CSS:** 41.6%
- **JavaScript:** 0.7%

## Notes

- Built with the **Next.js App Router** architecture
- Uses client-side interactivity with React hooks like `useState`
- Uses Next.js navigation via `useRouter`
- No database or external backend service is currently required
- No environment variables are currently needed
- No automated test suite is configured yet
