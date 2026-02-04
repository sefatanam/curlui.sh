# 🚀 Quick Start Guide - curlui.sh + Cloudflare Workers

## What You Now Have

✅ **worker.js** - Cloudflare Worker that detects curl and returns terminal output  
✅ **wrangler.toml** - Configuration for deployment  
✅ **DEPLOY.md** - Detailed deployment instructions  
✅ **ANSI-colored terminal output** - Beautiful curl view

## 🎯 Deployment Steps (5 minutes)

### 1. Install Wrangler
```bash
npm install -g wrangler
```

### 2. Login to Cloudflare
```bash
wrangler login
```

### 3. Deploy Worker
```bash
wrangler deploy
```

### 4. Get Your Worker URL
After deployment, you'll see something like:
```
https://curlui-sefatanam.sefatanam.workers.dev
```

### 5. Test It!

**Browser:**
```
https://curlui-sefatanam.sefatanam.workers.dev
→ Shows your beautiful website
```

**Terminal:**
```bash
curl https://curlui-sefatanam.sefatanam.workers.dev
→ Shows terminal output with colors ✨
```

## 🌐 Use Your Own Domain (Optional)

If you want to use `curlui.sh` or another domain:

1. Add domain to Cloudflare
2. Update `wrangler.toml`:
```toml
routes = [
  { pattern = "curlui.sh/*", zone_name = "curlui.sh" }
]
```
3. Redeploy: `wrangler deploy`

## 📁 Project Structure

```
curlui.sh/
├── index.html              # Your website (on GitHub Pages)
├── stylex.css             # Your styles
├── worker.js              # ⭐ NEW: Cloudflare Worker
├── wrangler.toml          # ⭐ NEW: Worker config
├── DEPLOY.md              # ⭐ NEW: Detailed guide
├── terminal-plugin.js     # Local dev only
└── vite.config.js         # Local dev only
```

## 🔧 How It Works

```
User Request
    │
    ├── curl detected ──→ Terminal Output (ANSI colors)
    │
    └── browser detected ──→ Proxy to GitHub Pages ──→ Website
```

## ✨ Features

- ✅ Same URL works for browser AND curl
- ✅ Beautiful ANSI colors in terminal
- ✅ Fast (Cloudflare edge network)
- ✅ Free tier works perfectly
- ✅ Keeps GitHub Pages for hosting

## 🎨 What curl Users See

```
╔══════════════════════════════════════════════════════════════════╗
║   ✦  Welcome to curlui.sh  ✦                                     ║
╚══════════════════════════════════════════════════════════════════╝

Crafted by @sefatanam with kimi-k2.5 🤖

● Status:     Online and running smoothly
● Version:    1.0.0
● Server:     GitHub Pages + Cloudflare Workers

⚡ Quick Links

   → Web Interface  https://sefatanam.github.io/curlui.sh
   → GitHub         https://github.com/sefatanam/curlui.sh

...
```

## 📝 Next Steps

1. **Deploy now**: `wrangler deploy`
2. **Test**: `curl YOUR_WORKER_URL`
3. **Update website**: Change curl command in `index.html` to your worker URL
4. **(Optional)** Set up custom domain

## 🆘 Need Help?

- Read **DEPLOY.md** for detailed instructions
- Check Cloudflare Workers docs: https://developers.cloudflare.com/workers/
- Run `wrangler dev` to test locally first

---

**Ready to deploy? Just run:**
```bash
wrangler login && wrangler deploy
```

**Crafted with ❤️ by @sefatanam with kimi-k2.5 🤖**
