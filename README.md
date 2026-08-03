# fish-3d — Quick Share Instructions

This project uses Vite. To create a temporary public URL so others can access your running app, use `localtunnel`.

1) Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Vite dev server runs on port 5173 by default.

2) In a second terminal, create a public URL (temporary) with `localtunnel`:

```bash
npx localtunnel --port 5173
```

This prints a public URL like `https://abc123.loca.lt` — share that with others.

Alternatively, share the production preview:

```bash
npm run build
npm run preview
# in another terminal
npx localtunnel --port 4173
```

Notes:
- `localtunnel` creates a temporary public URL (expires when the process exits).
- If you want a persistent public URL, consider deploying to Vercel, Netlify, or GitHub Pages.
- For a custom subdomain (when supported) run `npx localtunnel --port 5173 --subdomain yourname`.
