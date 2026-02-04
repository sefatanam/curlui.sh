# 🚀 Cloudflare Workers Deployment Guide

This guide will help you deploy your Terminal Web Interface using Cloudflare Workers, enabling curl detection while keeping your website on GitHub Pages.

## 📋 Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/sign-up) (Free plan works!)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed
- Your website deployed on GitHub Pages at `https://sefatanam.github.io/curlui.sh`

## 🛠️ Installation

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

### Step 2: Authenticate with Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

## 🚀 Deployment Steps

### Step 3: Deploy the Worker

From your project directory, run:

```bash
wrangler deploy
```

This will deploy your worker to Cloudflare's edge network.

### Step 4: Configure Routes (Custom Domain - Optional)

If you have a custom domain, add it to `wrangler.toml`:

```toml
routes = [
  { pattern = "curlui.sh/*", zone_name = "curlui.sh" }
]
```

Then redeploy:

```bash
wrangler deploy
```

### Step 5: Test Your Deployment

**Test in browser:**
```
https://curlui-sh.YOUR_SUBDOMAIN.workers.dev
```

**Test with curl:**
```bash
curl https://curlui-sh.YOUR_SUBDOMAIN.workers.dev
```

You should see the beautiful terminal output! 🎉

## 🌐 Connecting to Your Domain

### Option A: Use workers.dev subdomain (Free)
Your worker is automatically available at:
```
https://curlui-sh.YOUR_SUBDOMAIN.workers.dev
```

### Option B: Custom Domain (Recommended)

1. Add your domain to Cloudflare
2. Create a DNS record pointing to your worker
3. Configure the route in `wrangler.toml`

Example DNS configuration:
```
Type: CNAME
Name: curlui.sh
Target: curlui-sh.YOUR_SUBDOMAIN.workers.dev
Proxy: Enabled (Orange cloud)
```

## 🔧 How It Works

```
┌─────────────────┐
│  User Request   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  Cloudflare Worker      │
│  ┌───────────────────┐  │
│  │ Check User-Agent  │  │
│  └─────────┬─────────┘  │
│            │            │
│    ┌───────┴───────┐    │
│    ▼               ▼    │
│ ┌──────────┐  ┌────────┐│
│ │  curl    │  │browser ││
│ │ detected │  │detected││
│ └────┬─────┘  └───┬────┘│
│      │            │     │
│      ▼            ▼     │
│  Terminal     GitHub    │
│  Output       Pages     │
└─────────────────────────┘
```

## 📝 File Structure

```
curlui.sh/
├── index.html           # Your website (GitHub Pages)
├── stylex.css          # Styles
├── worker.js           # Cloudflare Worker script
├── wrangler.toml       # Cloudflare configuration
├── terminal-plugin.js  # Dev server plugin (local use)
├── vite.config.js      # Vite config (local use)
└── DEPLOY.md           # This file
```

## 🧪 Testing Locally

Before deploying, test locally:

```bash
wrangler dev
```

Then test:
```bash
# Terminal output
curl http://localhost:8787

# Browser (should proxy to GitHub)
open http://localhost:8787
```

## 🔄 Updating Your Worker

After making changes to `worker.js`:

```bash
wrangler deploy
```

## 🐛 Troubleshooting

### Worker not deploying?
- Check your Cloudflare account permissions
- Ensure you're logged in: `wrangler whoami`

### Getting HTML instead of terminal?
- Check that curl User-Agent is being detected
- Test with explicit curl: `curl -v https://your-worker-url`

### GitHub Pages not loading?
- Verify the GITHUB_PAGES_URL in worker.js
- Check that your GitHub Pages site is public

## 📝 Environment Variables (Optional)

Add secrets or environment variables:

```bash
wrangler secret put SECRET_NAME
```

Then access in worker.js:
```javascript
const secret = env.SECRET_NAME;
```

## 🎯 Next Steps

1. ✅ Deploy your worker
2. ✅ Test both browser and curl access
3. ✅ (Optional) Set up custom domain
4. ✅ Share your creation!

## 📚 Additional Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/commands/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

**Crafted with ❤️ by @sefatanam with kimi-k2.5 🤖**
