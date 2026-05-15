# Dogger — Dog Breed Explorer

A Vue 3 application that lets you browse dog breeds and view a photo of each one.

## Setup

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Features

- **Breed Overview** — displays all main breeds (sub-breeds excluded) in a card grid with a staggered entrance animation.
- **Breed Detail** — shows the breed name and a random photo, fetched from the Dog CEO API. The URL (`/breed/<name>`) survives a browser refresh.
- **TanStack Query caching** — the breed list is cached indefinitely for the session; each breed image is also cached so revisiting a breed shows the same photo.
- **Loading states** — skeleton cards on the overview, a spinner on the detail page.
- **Error states** — friendly message and retry button on both pages if a request fails.
- **Page transitions** — slide-left / slide-right animation between the two routes.
- **Smooth image reveal** — the breed photo fades in after it has fully loaded.
- **UI library** — PrimeVue (Aura theme) provides the design tokens and utility components.

## Tech stack

| Tool | Role |
|---|---|
| Vue 3 + Composition API | Framework |
| Vue Router 4 | Client-side routing |
| TanStack Query for Vue | Data fetching & caching |
| PrimeVue 4 | UI component library |
| Vite | Build tool |
| Dog CEO API | Public dog breed data |
