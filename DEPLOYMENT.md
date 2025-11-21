# Deployment Guide

This document covers how to ship the backend to **Render** and the frontend to **Netlify**.

## 1. Prerequisites

- A MongoDB connection string and a strong JWT secret.
- Render account (Web Service) and Netlify account (Site).
- `pnpm` is the package manager of record (`packageManager: pnpm@10.14.0`).

## 2. Environment Variables

| Location  | File to copy | Variables |
|-----------|--------------|-----------|
| Backend   | `backend/env.example`   | `PORT`, `MONGO_URI`, `JWT_SECRET` |
| Frontend  | `frontend/env.example`  | `VITE_API_BASE_URL` (should point to the Render API URL + `/api`) |

Rename each file to `.env` (or configure directly in the hosting dashboards) and fill in the real values.

## 3. Backend on Render

1. Push the repo to GitHub/GitLab.
2. In Render, create a **Web Service** and connect the repo.
3. When prompted:
   - Runtime: **Node**
   - Build command: `corepack enable pnpm && pnpm install --frozen-lockfile`
   - Start command: `pnpm start`
   - Root Directory: `backend`
4. Add environment variables under **Environment**:
   - `PORT` (Render injects one automatically, but keep `process.env.PORT || 5000` in code)
   - `MONGO_URI`
   - `JWT_SECRET`
5. Deploy. Your public API URL will look like `https://<service-name>.onrender.com`. Append `/api` for frontend usage.

The `render.yaml` file in the repo mirrors these settings so you can switch to Infrastructure as Code later (Render Blueprint deployments).

## 4. Frontend on Netlify

1. Create a new Netlify site from the same repository.
2. Netlify reads `netlify.toml`, which sets:
   - Base directory: `frontend`
   - Build command: `corepack enable pnpm && pnpm install --frozen-lockfile && pnpm run build`
   - Publish directory: `dist`
   - SPA fallback redirect (`/* -> /index.html`).
3. In **Site configuration → Environment variables**, set:
   - `VITE_API_BASE_URL=https://<render-service>.onrender.com/api`
4. Trigger a deploy. Netlify outputs a public URL for the React SPA.

## 5. Post-Deployment Checklist

- [ ] Verify `https://<render-service>.onrender.com/api` returns the health response.
- [ ] Confirm Netlify build succeeds and the SPA loads.
- [ ] Test critical flows (auth, shipment tracking, contact form) against production API.
- [ ] Configure custom domains and HTTPS certificates (Netlify handles certs automatically; map DNS).
- [ ] Optional: add monitoring/log drains (Render) and deploy notifications (Netlify).

