<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1i8OpDnM6yL8aLHJxlQBosiA6-QE22kg-

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create a `.env` from the example and set server-side secrets:

```bash
cp .env.example .env
# edit .env and set GEMINI_API_KEY and PASSWORD (do NOT commit .env)
```

3. Run the app:

```bash
npm install
npm run dev
```

Local AI proxy behavior:
- The app sends AI prompts to `/api/ai-proxy`. For local testing, use Vercel dev or deploy the `functions/` Firebase example and point requests to the deployed function URL.

Deployment notes (Vercel):

- Add `GEMINI_API_KEY` and `PASSWORD` to Vercel project Environment Variables (do not use `VITE_` prefix for private keys).
- Vercel will map `/api/*` to serverless functions placed under `api/` (see `api/ai-proxy.ts`).

Deployment notes (Firebase Hosting + Functions):

- The repo includes a `functions/` example. To deploy with Firebase:

```bash
# from repo root
cd functions
npm install
npm run build
firebase deploy --only functions,hosting
```

Ensure `GEMINI_API_KEY` is set in Firebase config or environment (see Firebase docs).
