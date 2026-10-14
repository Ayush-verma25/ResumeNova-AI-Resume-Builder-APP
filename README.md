# ResumeNova AI Resume Builder

ResumeNova is a MERN application for creating, editing, sharing, and printing
resumes. The React/Vite client is in `client/`; the Express/MongoDB API is in
`server/`.

## Requirements

- Node.js 22.12 or newer
- pnpm 11
- A MongoDB database
- OpenAI-compatible API credentials for AI-assisted writing and resume import
- ImageKit credentials for profile image uploads

## Local development

Install dependencies in each application:

```sh
pnpm --dir server install
pnpm --dir client install
```

Copy the example environment files and add your own values:

```powershell
Copy-Item server\.env.example server\.env
Copy-Item client\.env.example client\.env
```

Start the API and client in separate terminals:

```sh
pnpm --dir server start
pnpm --dir client dev
```

The API defaults to `http://localhost:3000`; the client defaults to
`http://localhost:5173`.

## Environment variables

See `server/.env.example` and `client/.env.example`. Set `VITE_BASE_URL` to the
API origin (without an `/api` suffix). The server appends its database name to
`MONGODB_URI`. Keep real credentials in deployment environment settings or
local ignored `.env` files; never commit them.

## Production checks

```sh
pnpm --dir client lint
pnpm --dir client build
```

Deploy the client and API with their environment variables configured. Set the
client's `VITE_BASE_URL` to the deployed API origin, and configure the API's
`PORT`, `MONGODB_URI`, `JWT_SECRET`, `OPENAI_API_KEY`, `OPENAI_MODEL`, and
`IMAGEKIT_PRIVATE_KEY` values in the server host. `OPENAI_BASE_URL` is optional
for OpenAI-compatible providers.
