<div align="center">

<img src="client/public/resumenova-logo.svg" alt="ResumeNova logo" height="70" />

# ResumeNova — AI Resume Builder

**Create, polish, import, share and print professional resumes — with a little help from AI.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22.12+-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_9-47A248?logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI--compatible-LLM-412991?logo=openai&logoColor=white)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Data Models](#data-models)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Known Limitations & Roadmap](#known-limitations--roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**ResumeNova** is a full-stack **MERN** application (MongoDB, Express, React, Node.js) for building resumes in the browser. Users sign up, fill in their details section by section, watch a **live preview** update as they type, switch between templates and accent colours, and then either **download the resume as a PDF** (through the browser's print dialog) or **publish it at a public link**.

AI is built in at two levels:

1. **Writing assistance** — one click rewrites a professional summary or a job description so it is concise, action-oriented and ATS-friendly.
2. **Resume import** — upload an existing PDF resume and the app extracts its text, asks an LLM to convert it into structured data, and opens it in the editor.

The AI layer uses the official `openai` SDK with a configurable base URL, so it works with OpenAI **or any OpenAI-compatible provider**.

---

## Features

| Area | What you get |
| --- | --- |
| **Authentication** | Email/password registration and login, bcrypt-hashed passwords, JWT sessions (7-day expiry), persistent login via `localStorage`. |
| **Dashboard** | Create a resume, upload an existing one, rename and delete resumes, with a card per resume showing its last-updated date. |
| **Step-by-step builder** | Six guided sections — *Personal Info, Summary, Experience, Education, Projects, Skills* — with Previous/Next navigation and a progress bar. |
| **Live preview** | A split-screen layout: the form on the left, the rendered resume on the right, updating instantly. |
| **Templates** | Four templates: `classic`, `modern`, `minimal` and `minimal-image`. |
| **Accent colours** | Eight curated colours (Navy, Slate, Blue, Teal, Forest, Burgundy, Charcoal, Brown) applied across the chosen template. |
| **AI Enhance** | Improve the professional summary and each work-experience description with one click. |
| **AI PDF import** | Upload a PDF resume → text extracted in the browser → parsed to structured JSON by an LLM → saved as a new editable resume. |
| **Profile photo** | Upload a JPEG/PNG photo (max 5 MB). It is cropped to a 300×300 face-focused image via ImageKit, with an optional background-removal toggle. |
| **Public sharing** | Toggle a resume between *Private* and *Public*. Public resumes are viewable without logging in at `/view/:resumeId`, and can be shared using the native Web Share API. |
| **Print / PDF export** | A print stylesheet renders only the resume on a US Letter page with colours preserved — use *Download → Save as PDF*. |
| **Responsive UI** | Tailwind CSS 4 layout that adapts from mobile to desktop. Routes are lazy-loaded for faster first paint. |

---

## Tech Stack

### Frontend — `client/`

| Purpose | Technology |
| --- | --- |
| UI library | React 19 |
| Build tool / dev server | Vite 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Routing | React Router 7 |
| State management | Redux Toolkit + React-Redux (auth slice) |
| HTTP client | Axios |
| Notifications | react-hot-toast |
| Icons | lucide-react |
| PDF → text | react-pdftotext |
| Linting | ESLint 10 (react-hooks, react-refresh) |

### Backend — `server/`

| Purpose | Technology |
| --- | --- |
| Runtime / framework | Node.js (ES modules) + Express 5 |
| Database / ODM | MongoDB + Mongoose 9 |
| Authentication | JSON Web Tokens (`jsonwebtoken`) + `bcrypt` |
| File upload handling | Multer (disk storage, 5 MB limit, JPEG/PNG/WebP only) |
| Image hosting / transforms | ImageKit (`@imagekit/nodejs`) |
| AI | `openai` SDK (any OpenAI-compatible endpoint) |
| Other | `cors`, `dotenv`, `nodemon` (dev) |

### Tooling

- **Package manager:** pnpm 11 (each of `client/` and `server/` has its own lockfile)
- **Hosting:** both apps ship with a `vercel.json` for deployment on Vercel

---

## Architecture

```mermaid
flowchart LR
    subgraph Client["Client — React 19 + Vite"]
        UI["Pages and components"]
        Redux["Redux Toolkit<br/>auth slice"]
        Axios["Axios instance<br/>VITE_BASE_URL"]
    end

    subgraph Server["Server — Express 5"]
        Routes["/api/users<br/>/api/resumes<br/>/api/ai"]
        Auth["JWT auth middleware"]
        Ctrl["Controllers"]
    end

    DB[("MongoDB<br/>via Mongoose")]
    LLM["OpenAI-compatible<br/>LLM provider"]
    IK["ImageKit<br/>image CDN"]

    UI --> Redux
    UI --> Axios
    Axios -->|"REST + JSON / multipart"| Routes
    Routes --> Auth --> Ctrl
    Ctrl --> DB
    Ctrl --> LLM
    Ctrl --> IK
```

The client is a single-page application that talks to the API over REST. The API is stateless: every protected request carries a JWT in the `Authorization` header, and all persistent data lives in MongoDB. Third-party services (LLM provider, ImageKit) are only ever called from the server, so their secrets never reach the browser.

---

## Project Structure

```text
ResumeNova-AI-Resume-Builder-APP/
├── client/                         # React + Vite single-page app
│   ├── public/                     # Logo and favicon (SVG)
│   ├── src/
│   │   ├── app/
│   │   │   ├── store.js            # Redux store
│   │   │   └── features/
│   │   │       └── authSlice.js    # token / user / loading state
│   │   ├── assets/                 # Images + dummy resume data
│   │   ├── components/
│   │   │   ├── home/               # Landing page sections (Hero, Features, Footer…)
│   │   │   ├── templates/          # Classic, Modern, Minimal, MinimalImage
│   │   │   ├── PersonalInfoForm.jsx
│   │   │   ├── ProfessionalSummaryForm.jsx   # AI Enhance (summary)
│   │   │   ├── ExperienceForm.jsx            # AI Enhance (job description)
│   │   │   ├── EducationForm.jsx
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── SkillsForm.jsx
│   │   │   ├── TemplateSelector.jsx
│   │   │   ├── ColorPicker.jsx
│   │   │   ├── ResumePreview.jsx             # Template switch + print CSS
│   │   │   ├── Navbar.jsx
│   │   │   └── Loader.jsx
│   │   ├── configs/api.js          # Axios instance (baseURL = VITE_BASE_URL)
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Public landing page
│   │   │   ├── Layout.jsx          # Auth gate for /app/*
│   │   │   ├── Login.jsx           # Login / Register form
│   │   │   ├── Dashboard.jsx       # Resume list, create, upload, rename, delete
│   │   │   ├── ResumeBuilder.jsx   # Editor + live preview
│   │   │   └── Preview.jsx         # Public, read-only resume view
│   │   ├── App.jsx                 # Routes + session restore
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── vercel.json                 # SPA rewrite rule
│   └── vite.config.js
│
└── server/                         # Express + MongoDB REST API
    ├── configs/
    │   ├── ai.js                   # OpenAI client (apiKey, optional baseURL)
    │   ├── db.js                   # Mongoose connection
    │   ├── imageKit.js             # ImageKit client
    │   └── multer.js               # Upload rules (5 MB, jpeg/png/webp)
    ├── controllers/
    │   ├── userControllers.js      # register, login, profile, list resumes
    │   ├── resumeControllers.js    # create, read, update (+image), delete, public
    │   └── aiControllers.js        # enhance summary / description, import PDF text
    ├── middlewares/
    │   └── authMiddleware.js       # `protect` — verifies the JWT
    ├── models/
    │   ├── User.js
    │   └── Resume.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── resumeRoutes.js
    │   └── aiRoutes.js
    ├── server.js                   # App entry point
    ├── .env.example
    └── vercel.json
```

---

## How It Works

### Client routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Landing page (banner, hero, features, testimonials, call to action, footer). |
| `/app` | Logged-in | Dashboard. If the user is not authenticated, `Layout` renders the login/register form instead. |
| `/app?state=register` / `?state=login` | — | Opens the auth form directly in sign-up or login mode (used by the landing-page buttons). |
| `/app/builder/:resumeId` | Logged-in | The resume editor with live preview. |
| `/view/:resumeId` | Public | Read-only view of a resume, only if its owner made it public. |

### Authentication flow

1. On register/login the API returns `{ token, user }`.
2. The client stores the token in `localStorage` and in the Redux `auth` slice.
3. On every page load, `App.jsx` calls `GET /api/users/data` with the stored token to restore the session. A `401` logs the user out.
4. Protected requests send `Authorization: <token>`; the `protect` middleware verifies it with `JWT_SECRET` and attaches `req.userId`.
5. Every resume query is scoped by `userId`, so a user can only read, update or delete their own resumes.

### Editing and saving a resume

- All form state lives in a single `resumeData` object inside `ResumeBuilder`, which is passed to `ResumePreview` — that is what makes the preview live.
- Clicking **Save Changes** sends a `multipart/form-data` `PUT /api/resumes/update` request containing the resume JSON, and the profile image file if a new one was chosen.
- Dates are stored as `YYYY-MM` strings (from `<input type="month">`) and formatted by the templates for display.

### AI writing assistance

```text
Click “AI Enhance” → POST /api/ai/enhance-pro-sum | /enhance-job-desc
  → server sends a system prompt + the user's text to the LLM
  → plain-text result returned → inserted into the form
```

The server prompts the model to return **only text** (1–2 sentences, action verbs and measurable results where possible, ATS-friendly). If the provider returns HTTP `429`, the API responds with a friendly quota-reached message.

### AI PDF import

```mermaid
sequenceDiagram
    actor U as User
    participant C as React client
    participant S as Express API
    participant L as LLM provider
    participant DB as MongoDB

    U->>C: Choose a PDF and a title
    C->>C: Extract text in the browser (react-pdftotext)
    C->>S: POST /api/ai/upload-resume {title, resumeText}
    S->>L: Chat completion in JSON mode
    L-->>S: Structured resume JSON
    S->>DB: Resume.create(...)
    S-->>C: { resumeId }
    C->>U: Redirect to /app/builder/:resumeId
```

The system prompt instructs the model not to invent data (empty strings/arrays for anything missing) and to return an exact JSON shape matching the `Resume` schema. The server strips any `userId`, `_id` or `public` keys from the model output before saving, and sets the owner from the verified token.

### Profile image upload

1. The browser sends the image inside the save request (`image` field).
2. Multer writes it to a temporary file (JPEG/PNG/WebP only, ≤ 5 MB).
3. The server streams it to ImageKit into the `user-resumes` folder with the transformation `w-300, h-300, fo-face, z-0.75` (and `e-bgremove` if *Remove Background* is on).
4. The temp file is always deleted, and the returned ImageKit URL is saved to `personal_info.image`.

### Sharing and PDF export

- **Public/Private toggle** flips the `public` flag. Only public resumes are returned by `GET /api/resumes/public/:resumeId`.
- **Share** uses `navigator.share` with the link `https://<your-frontend>/view/<resumeId>`.
- **Download** calls `window.print()`. `ResumePreview` injects an `@page { size: letter; margin: 0 }` rule and print CSS that hides everything except `#resume-preview`, so the user can choose *Save as PDF* in the print dialog.

---

## Data Models

```mermaid
erDiagram
    USER ||--o{ RESUME : owns
    USER {
        ObjectId _id
        string name
        string email "unique"
        string password "bcrypt hash"
    }
    RESUME {
        ObjectId _id
        ObjectId userId FK
        string title
        boolean public
        string template
        string accent_color
        string professional_summary
        string[] skills
    }
```

### `User`

| Field | Type | Notes |
| --- | --- | --- |
| `name` | String | Required |
| `email` | String | Required, unique |
| `password` | String | Required, stored as a bcrypt hash (10 salt rounds) |
| `createdAt`, `updatedAt` | Date | Added by Mongoose timestamps |

### `Resume`

| Field | Type | Default |
| --- | --- | --- |
| `userId` | ObjectId → `User` | — |
| `title` | String | `"Untitled Resume"` |
| `public` | Boolean | `false` |
| `template` | String (`classic` \| `modern` \| `minimal` \| `minimal-image`) | `"classic"` |
| `accent_color` | String (hex) | `"#3B82F6"` |
| `professional_summary` | String | `""` |
| `skills` | `[String]` | `[]` |
| `personal_info` | `{ image, full_name, profession, email, phone, location, linkedin, website }` | all `""` |
| `experience` | `[{ company, position, start_date, end_date, description, is_current }]` | `[]` |
| `project` | `[{ name, type, description }]` | `[]` |
| `education` | `[{ institution, degree, field, graduation_date, gpa }]` | `[]` |
| `createdAt`, `updatedAt` | Date | Added by Mongoose timestamps |

> The database name (`resumeNova-ai-resume-builder-app`) is appended to `MONGODB_URI` by `server/configs/db.js`.

---

## API Reference

**Base URL (local):** `http://localhost:3000`  
Protected routes require the header `Authorization: <jwt-token>` (the raw token — no `Bearer ` prefix).

`GET /` returns `Server is live...` and can be used as a simple health check.

### Users — `/api/users`

| Method | Endpoint | Auth | Body | Description |
| --- | --- | :---: | --- | --- |
| `POST` | `/register` | — | `{ name, email, password }` | Create an account. Returns `{ message, token, user }`. |
| `POST` | `/login` | — | `{ email, password }` | Log in. Returns `{ message, token, user }`. |
| `GET` | `/data` | ✅ | — | Get the logged-in user (used to restore a session). |
| `GET` | `/resumes` | ✅ | — | List all resumes belonging to the user. |

### Resumes — `/api/resumes`

| Method | Endpoint | Auth | Body | Description |
| --- | --- | :---: | --- | --- |
| `POST` | `/create` | ✅ | `{ title }` | Create an empty resume. |
| `PUT` | `/update` | ✅ | `multipart/form-data`: `resumeId`, `resumeData` (JSON string), optional `removeBackground`, optional `image` file | Update a resume; uploads the image to ImageKit if provided. |
| `GET` | `/get/:resumeId` | ✅ | — | Get one of the user's own resumes. |
| `DELETE` | `/delete/:resumeId` | ✅ | — | Delete one of the user's own resumes. |
| `GET` | `/public/:resumeId` | — | — | Get a resume **only if** `public === true`. |

### AI — `/api/ai`

| Method | Endpoint | Auth | Body | Description |
| --- | --- | :---: | --- | --- |
| `POST` | `/enhance-pro-sum` | ✅ | `{ userContent }` | Returns `{ enhancedContent }` — an improved professional summary. |
| `POST` | `/enhance-job-desc` | ✅ | `{ userContent }` | Returns `{ enhancedContent }` — an improved job description. |
| `POST` | `/upload-resume` | ✅ | `{ resumeText, title }` | Parses raw resume text with the LLM, creates a resume, returns `{ resumeId }`. |

### Error responses

Errors are returned as JSON `{ "message": "..." }` with `400` (bad request / validation), `401` (missing or invalid token), `404` (not found) or `429` (AI provider quota reached).

---

## Getting Started

### Prerequisites

- **Node.js** 22.12 or newer
- **pnpm** 11 (`npm install -g pnpm`, or use Corepack)
- A **MongoDB** database — local, or a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)
- An **API key** for OpenAI or an OpenAI-compatible provider (needed for AI features)
- An **[ImageKit](https://imagekit.io/)** account (needed for profile photo uploads)

### 1. Clone the repository

```bash
git clone https://github.com/Ayush-verma25/ResumeNova-AI-Resume-Builder-APP.git
cd ResumeNova-AI-Resume-Builder-APP
```

### 2. Install dependencies

Each app manages its own dependencies:

```bash
pnpm --dir server install
pnpm --dir client install
```

### 3. Configure environment variables

Copy the example files and fill in your own values (see [Environment Variables](#environment-variables)).

**macOS / Linux**

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

**Windows (PowerShell)**

```powershell
Copy-Item server\.env.example server\.env
Copy-Item client\.env.example client\.env
```

### 4. Run the app

Open two terminals:

```bash
# Terminal 1 — API (http://localhost:3000)
pnpm --dir server start
```

```bash
# Terminal 2 — client (http://localhost:5173)
pnpm --dir client dev
```

Open **http://localhost:5173**, create an account and start building.

> **Tip:** use `pnpm --dir server server` instead of `start` to run the API with `nodemon` and reload on changes.

---

## Environment Variables

### Server — `server/.env`

| Variable | Required | Description |
| --- | :---: | --- |
| `PORT` | No | Port for the API. Defaults to `3000`. |
| `MONGODB_URI` | ✅ | MongoDB connection string **without a database name or query string** — the server appends `/resumeNova-ai-resume-builder-app` itself. Example: `mongodb://127.0.0.1:27017` or `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net`. |
| `JWT_SECRET` | ✅ | Long, random secret used to sign and verify tokens. |
| `OPENAI_API_KEY` | ✅ for AI | API key for your LLM provider. |
| `OPENAI_MODEL` | ✅ for AI | Model name, e.g. `gpt-4o-mini`. The model must support JSON mode (`response_format: json_object`) for PDF import. |
| `OPENAI_BASE_URL` | No | Set this to use an OpenAI-compatible provider other than OpenAI. |
| `IMAGEKIT_PRIVATE_KEY` | ✅ for photos | ImageKit private API key. |

### Client — `client/.env`

| Variable | Required | Description |
| --- | :---: | --- |
| `VITE_BASE_URL` | ✅ | Origin of the API, **without** a trailing `/api`. Example: `http://localhost:3000`. |

> 🔒 **Never commit real credentials.** Both `.gitignore` files already exclude `.env` and `.env.*` (while keeping `.env.example`). Put production secrets in your hosting provider's environment settings.

---

## Available Scripts

### Client (`pnpm --dir client <script>`)

| Script | Description |
| --- | --- |
| `dev` | Start the Vite dev server with hot reload. |
| `build` | Create an optimised production build in `client/dist`. |
| `preview` | Serve the production build locally. |
| `lint` | Run ESLint over the client code. |

### Server (`pnpm --dir server <script>`)

| Script | Description |
| --- | --- |
| `start` | Run the API with Node (`node server.js`). |
| `server` | Run the API with `nodemon` for auto-restart during development. |

### Pre-release checks

```bash
pnpm --dir client lint
pnpm --dir client build
```

---

## Deployment

Both apps include a `vercel.json`, so they can be deployed as **two separate Vercel projects**:

1. **API (`server/`)** — uses `@vercel/node` and routes every request to `server.js`. Add `MONGODB_URI`, `JWT_SECRET`, `OPENAI_API_KEY`, `OPENAI_MODEL`, `IMAGEKIT_PRIVATE_KEY` (and optionally `OPENAI_BASE_URL`) in the project's environment settings.
2. **Client (`client/`)** — a Vite build with a catch-all rewrite to `/` so client-side routes such as `/app` and `/view/:id` work on refresh. Set `VITE_BASE_URL` to the deployed API origin **before building**, since Vite inlines it at build time.

Remember to allow your client's origin in MongoDB Atlas network access, and to lock down CORS (see below) before going live.

---

## Known Limitations & Roadmap

These are honest notes about the current state of the project and good next steps.

**Security hardening**
- [ ] Restrict CORS to the deployed client origin (currently `cors()` allows all origins).
- [ ] Add rate limiting on `/api/users/*` and especially `/api/ai/*` (each AI call costs money).
- [ ] Consider httpOnly cookies instead of a token in `localStorage`, and the standard `Bearer` scheme for the `Authorization` header.
- [ ] Whitelist the fields accepted by `PUT /api/resumes/update` instead of applying the whole `resumeData` object with `$set`.
- [ ] Validate/sanitise inputs (e.g. with Zod or Joi) and enforce a minimum password policy.

**Product features**
- [ ] Password reset and email verification.
- [ ] OCR support for scanned PDFs — import currently works only for PDFs with selectable text.
- [ ] Server-side PDF generation for consistent output, instead of the browser print dialog (currently US Letter).
- [ ] Duplicate-resume and drag-and-drop section reordering.
- [ ] More templates and font choices.
- [ ] Share-link fallback (copy-to-clipboard) for browsers without the Web Share API.

**Quality**
- [ ] Automated tests (API integration tests, component tests).
- [ ] CI pipeline running lint + build on every pull request.
- [ ] Replace placeholder landing-page content (testimonials, statistics and some feature copy) with real content before launch.

---

## Contributing

Contributions, issues and feature requests are welcome!

1. Fork the repository.
2. Create a feature branch from `development`: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m "Add my feature"`.
4. Make sure `pnpm --dir client lint` and `pnpm --dir client build` pass.
5. Push the branch and open a Pull Request against `development`.

---

## License

The server's `package.json` declares the **ISC** license. Add a `LICENSE` file to the repository root to make the terms explicit.

---

<div align="center">

Built by [@Ayush-verma25](https://github.com/Ayush-verma25)

⭐ If you find this project useful, consider giving it a star!

</div>