# Premium Portfolio Platform (2026)

A production-grade portfolio web application: Next.js (App Router, TypeScript, Tailwind) frontend
+ Express/MongoDB backend, with a public portfolio, live chat, and a private admin dashboard.

## Structure

```
portfolio-app/
├── client/                 Next.js frontend
│   └── src/
│       ├── app/             App Router routes (public pages + /admin, not linked in nav)
│       ├── components/      Domain-organized UI components
│       │   ├── ui/          Reusable primitives (Button, Card, Input, Modal, Skeleton...)
│       │   ├── layout/      Navbar, Footer, Sidebar
│       │   ├── theme/       Theme + accent color switcher UI
│       │   ├── hero/ about/ skills/ services/ portfolio/ testimonials/ faq/ contact/
│       │   ├── chat/        Messenger-style real-time chat UI
│       │   └── dashboard/   Admin dashboard widgets
│       ├── layouts/         Page-level layout wrappers
│       ├── hooks/           Custom React hooks
│       ├── contexts/        Theme context, Auth context, Socket context
│       ├── services/        API client (axios instance) + per-resource service files
│       ├── utils/           Formatting, validation helpers
│       ├── types/           Shared TypeScript types/interfaces
│       └── constants/       App-wide constants (accent colors, routes, etc.)
│
├── server/                 Express backend
│   └── src/
│       ├── config/          DB connection, cloudinary, env loader
│       ├── models/          Mongoose schemas (User, Project, Testimonial, Message, Chat, etc.)
│       ├── controllers/     Route handler logic
│       ├── routes/          Express routers
│       ├── middlewares/     Auth, error handling, rate limiting, validation
│       ├── validators/      Zod/Joi request schemas
│       ├── utils/           Token signing, email sending, response helpers
│       └── constants/       Enums, error codes
│
├── .gitignore
└── README.md
```

## Setup (once dependencies are installed on your machine)

```bash
# client
cd client && npm install && npm run dev

# server
cd server && npm install && npm run dev
```

Each side has its own `.env.example` — copy to `.env` and fill in real values
(MongoDB URI, JWT secrets, Cloudinary keys, SMTP credentials).

## Build order

We're building this step by step. Progress so far:

- [x] Step 1 — Project scaffold
- [x] Step 2 — Backend foundation: DB connection, User model, JWT utils, auth middleware, runnable server entry point
- [x] Step 3 — Auth API: register/login/refresh/logout/me, Zod validation, rate limiting
- [x] Step 4 — Full backend content layer:
      - Models: Project, Skill, Service, Testimonial, Message, Chat, Hero, About, Experience,
        Education, SocialLink, Settings, Theme
      - Reusable CRUD + singleton controller factories
      - Routes for all of the above, admin-gated mutations via `requireAuth` + `requireRole("admin")`
      - Testimonial spam protection (honeypot + rate limit) and approval workflow
      - Contact form with Nodemailer notification
      - Socket.IO chat (auth, presence, typing, seen receipts) + REST history endpoints
      - `scripts/seedAdmin.js` to create the one admin account (never via public register)
- [x] Step 5 — Frontend: theme system
      - `globals.css`: CSS-variable tokens for dark/light × purple/blue/black (9 combinations)
      - `ThemeContext`: resolves LocalStorage → DB default → hardcoded default, applies
        `data-theme`/`data-accent` on `<html>`, persists on every change
      - No-flash inline script in `layout.tsx` (sets attributes before hydration)
      - `ThemeSwitcher` component (mode toggle + 3 accent swatches), `apiClient` +
        `themeService` for the DB-backed default
      - Runnable placeholder home page wired to the theme system end to end
- [x] Step 6a — Frontend layout shell + Hero section:
      - Fonts: Space Grotesk (display) / Inter (body) / JetBrains Mono (tags), wired via CSS vars
      - `Navbar` (glass, scroll-aware, mobile menu, chat trigger) + `Footer`
      - `Hero`: typing effect (`useTypewriter`), availability badge, Hire Me/Contact/Resume CTAs,
        social links, animated background (grid + drifting gradient blobs + cursor glow),
        loading skeleton, all data-driven from `/api/hero` via TanStack Query
- [x] Step 6b — Remaining public sections, all data-driven via TanStack Query:
      - `About` (photo, biography, achievements, stats)
      - `Skills` (grouped by category, animated progress bars, icon resolver)
      - `Services` (premium cards, features, optional pricing)
      - `Portfolio` (category filter, debounced search, pagination, `ProjectCard`) +
        `/portfolio/[slug]` detail page
      - `Experience` and `Education` (timelines)
      - `Testimonials` (approved list + pagination) + `TestimonialForm` (honeypot spam
        protection, react-hook-form + Zod)
      - `FAQ` (accordion) — added a `Faq` model/routes since the original DB section didn't
        list one even though FAQ is a required page
      - `Contact` form (react-hook-form + Zod + toast feedback)
      - Shared `SectionHeading`, `Container`, `Skeleton` primitives for visual consistency
      - `useDebounce`, `resolveIcon`, `formatMonthYear` utilities
- [x] Step 7 — Chat UI:
      - `AuthContext` — silent session resume via the httpOnly refresh cookie on load,
        login/register/logout
      - `SocketContext` — connects only once authenticated, tears down on logout
      - `ChatUIContext` — open/close state for the floating widget
      - `ChatWidget` — the only login/register surface on the whole site; shows
        `ChatAuthPanel` or `ChatWindow` depending on auth state
      - `ChatWindow` — Messenger-style UI: live messages, typing indicator, online
        presence, seen receipts, image sharing, curated emoji picker
      - Note: chat images currently send as data URLs — swaps to a real Cloudinary
        upload call in Step 9 with no other changes needed
- [x] Step 8 — Admin dashboard (`/admin`, not in nav; `/admin/login` outside the guard):
      - Backend additions: `PATCH /auth/me`, `POST /auth/change-password`, `GET /stats/overview`
      - `AdminGuard` (redirects non-admins), `AdminSidebar`, grouped nav config
      - Generic `AdminCrudPage` (table + create/edit modal) reused for Projects, Skills,
        Services, Experience, Education, Social Links, FAQ — one component, seven pages
      - Generic `AdminSingletonPage` reused for Hero, About, Website Settings, Theme Manager
      - Custom pages for what's genuinely different: Testimonials (approve/reject/delete +
        filter), Contact Messages (mark read/delete), Chat Management (conversation list +
        live reply over the same Socket.IO layer), Profile + Change Password
      - Overview page with live stat cards from `/api/stats/overview`
- [x] Step 9 — Multer + Cloudinary uploads:
      - Backend: `config/cloudinary.js`, Multer memory-storage middlewares (image/video/document,
        with size + MIME-type limits), reusable `uploadBufferToCloudinary` streaming helper,
        `deleteFromCloudinary`, rate-limited `/api/uploads/*` routes (chat-image + avatar open to
        any authenticated user; project-image/video + resume admin-only)
      - Frontend: `uploadService.ts`; chat image button now uploads for real (was a data-URL
        stopgap); `DynamicForm` gained `image`/`file` field types with inline upload +
        preview, wired into Hero (resume), Projects (cover image), About (photo), and
        Profile (avatar)
- [x] Step 10 — SEO + performance polish:
      - `generateMetadata` in `layout.tsx` pulls title/description/keywords/OG image live from
        the admin-editable Settings collection, with a safe static fallback if the API is
        unreachable at build time
      - `robots.ts` (blocks `/admin` from crawling) and a dynamic `sitemap.ts` that includes
        every project slug
      - Server-rendered Person JSON-LD structured data on the home page (present in initial
        HTML, not just client-fetched)
      - `next.config.ts`: disabled `x-powered-by`, AVIF/WebP image formats, tree-shaken
        `react-icons`/`framer-motion` imports
      - Converted the two highest-impact images (project cover, About photo) to `next/image`
        for automatic optimization and lazy loading; left chat/testimonial/avatar images as
        plain `<img>` since those are small, user-generated, and optimization matters far
        less there than build-time-known asset sizing

## Project status

All 10 build steps are complete, plus a follow-up hardening/upgrade pass:

- **Chat privacy fix**: the socket handler previously trusted a client-sent `chatId` when
  writing messages, so a malicious visitor could in theory write into another visitor's
  conversation. Fixed — non-admin senders are now always resolved server-side from their
  own authenticated user id, never from client input. Also switched chat resolution to an
  atomic `findOneAndUpdate` upsert (was find-then-create, which could race) and added a
  DB-level unique constraint on `Chat.visitor`.
- **Production auth upgrade**: Google Sign-In (via Google Identity Services, verified
  server-side with `google-auth-library`), mandatory email OTP verification before chat
  access (enforced on both the REST chat routes and the Socket.IO handshake), forgot/reset
  password (generic response to prevent email enumeration, hashed reset tokens, 30-minute
  expiry), all still surfaced only through the chat modal — except the one unavoidable
  `/reset-password` page, since a password-reset link has to open directly from an email
  client into the browser.
- **Resume download fix**: `<a download>` silently fails cross-origin, and the resume lives
  on Cloudinary — so it was opening in a new tab instead of downloading. Fixed with a
  `toAttachmentUrl` helper that inserts Cloudinary's `fl_attachment` flag, which makes
  Cloudinary itself send `Content-Disposition: attachment`.
- **Premium UI polish pass** (no layout/structure changes): removed the floating-blob +
  cursor-follow-glow hero background (explicitly on the "avoid" list) for a single minimal
  static glow; added a shared `Button`/`ButtonLink` primitive with consistent hover-lift +
  press-scale micro-interactions; a `.card-premium` utility (hover lift + accent border glow)
  applied to Service/Project/Testimonial cards; a `.field` utility for form inputs with a
  smooth focus ring; tightened heading letter-spacing/line-height; smooth-scroll enabled;
  subtle hover motion added to the Hero social icons.
- **Feature batch — Pricing, WhatsApp, Blog, Analytics, Activity Log, PWA, i18n**:
  - Backend: `PricingPlan`, `Post` (blog), `PageView`, `ActivityLog` models; public/admin blog
    routes with slug lookup + view counting; analytics endpoints (pageview, heartbeat, live
    count via in-memory session tracking, day-by-day summary); activity logging wired
    generically into the CRUD/singleton factories so every admin mutation across every
    collection is captured automatically, no per-controller changes needed; `whatsappNumber`
    added to Settings
  - Pricing: `PricingTable` on the home page (only renders once the admin adds plans) +
    `/admin/pricing`
  - WhatsApp: floating button in the navbar, only appears once a number is set in Settings
  - Blog: `/blog` list + `/blog/[slug]` detail, `/admin/blog` — added to nav (anchor links
    were made pathname-aware so `#about` still works correctly when navigating from `/blog`)
  - Analytics: silent `AnalyticsTracker` (pageview + 20s heartbeat, skips `/admin` routes,
    no cookies/fingerprinting) + `/admin/analytics` (live count, day chart, top pages/projects).
    Country data only populates behind Vercel/Cloudflare — no GeoIP without a paid service.
  - `/admin/activity-log` — read-only feed of every admin change
  - PWA: `manifest.json`, placeholder icons (192/512, solid color — swap for real branded
    icons before shipping), a minimal network-first service worker, install metadata
  - i18n: English/Bangla toggle (`LanguageContext`, localStorage-persisted) covering nav
    labels, section headings, and common buttons. Admin-entered content (bios, project
    descriptions, blog posts) is intentionally NOT translated — that's a much larger scope
    than a UI-chrome toggle

What running this for real still requires, none of which is possible inside this sandbox:
`npm install` on both `client/` and `server/`, a MongoDB instance, Cloudinary/SMTP credentials,
a Google Cloud OAuth client ID (`GOOGLE_CLIENT_ID` on the server, `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
on the client — same project), and `node src/scripts/seedAdmin.js` to create your admin login.

## What "everything at once" realistically means here

The full spec (premium UI for 10 pages, a complete admin dashboard, live chat interface, and
animation polish) is too large to hand-write at production quality in a single batch — that's
roughly 60-100 more files of real UI code. What *is* done now is the entire backend: every
model, every route, auth, chat sockets, spam protection, and email notifications. That's a
complete, runnable API. The frontend is scaffolded but the actual page/dashboard/chat UI
components are still Steps 5-10 above, built the same way — a few files at a time, reviewed
as we go, so the design quality holds up.
