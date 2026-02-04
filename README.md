# Terminal Web Interface

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Terminal-4D4D4D?style=for-the-badge&logo=windows-terminal&logoColor=white" alt="Terminal">
</p>

<p align="center">
  <a href="https://github.com/sefatanam">
    <img src="https://img.shields.io/badge/Crafted%20by-sefatanam-22d3ee?style=for-the-badge&logo=github&logoColor=white" alt="Author">
  </a>
  <a href="https://github.com/opencode-ai">
    <img src="https://img.shields.io/badge/Built%20with-kimi--k2.5-c084fc?style=for-the-badge&logo=openai&logoColor=white" alt="AI">
  </a>
</p>

<p align="center">
  <b>A beautiful website that transforms into a terminal interface when accessed via curl</b>
</p>

<p align="center">
  <sub>✨ Crafted by <strong>sefatanam</strong> with <strong>kimi-k2.5</strong> ✨</sub>
</p>
  
```bash
  curl https://curlui-sh.sefatanam.workers.dev
```
  
<p align="center">

  
  <img width="1800" height="1126" alt="image" src="https://github.com/user-attachments/assets/00be0274-359f-4703-a359-3ec6a1d9a2e1" alt="Terminal Web Interface Preview" />
</p>

## ✨ Features

- 🎨 **Beautiful Terminal Output** - ANSI-colored output with box-drawing characters
- 🔍 **Smart Detection** - Automatically detects curl, wget, and CLI HTTP clients
- ⚡ **Vite Powered** - Lightning-fast development and optimized builds
- 🌐 **Dual Interface** - Web UI for browsers, terminal UI for CLI tools
- 📱 **Responsive Design** - Works beautifully on all devices
- 🎯 **Zero Dependencies** - Pure JavaScript/TypeScript implementation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/terminal-web-interface.git
cd terminal-web-interface

# Install dependencies
npm install

# Start development server
npm run dev
```

### Try It

Open your browser:
```
http://localhost:5173
```

Or use curl in your terminal:
```bash
curl http://localhost:5173
```

## 🎬 Demo

### Web Interface

When you open `http://localhost:5173` in your browser, you'll see a beautiful, modern website with:

- 🌙 Dark theme with gradient accents
- 📱 Responsive card-based layout
- ⚡ Interactive elements and animations
- 🎨 Modern typography using Inter and JetBrains Mono fonts

### Terminal Interface

When you run `curl http://localhost:5173`, you'll see:

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ✦  Welcome to Terminal Web Interface  ✦                       ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝

● Status:     Online and running smoothly
● Version:    1.0.0
● Server:     Vite Development Server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ Quick Links

   → /about        Learn more about this project
   → /features     Key features and capabilities  
   → /api          API documentation
   → /github       View source on GitHub

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Pro Tips

   • Open http://localhost:5173 in your browser
   • Run npm run dev to start development server
   • Run npm run build to create production build
```

## 🏗️ How It Works

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   curl/wget     │────▶│  Vite Dev Server │────▶│ User-Agent      │
│   (CLI Client)  │     │                  │     │ Detection       │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                         │
                              ┌──────────────────────────┘
                              ▼
                    ┌─────────────────┐
                    │  Is CLI Client? │
                    └────────┬────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
   ┌─────────────────┐              ┌─────────────────┐
   │  YES            │              │  NO             │
   │  Return ANSI    │              │  Return HTML    │
   │  colored text   │              │  (Normal page)  │
   │  Content-Type:  │              │  Content-Type:  │
   │  text/plain     │              │  text/html      │
   └─────────────────┘              └─────────────────┘
```

### The Magic Behind It

1. **User-Agent Detection** - The server checks for `curl/`, `wget/`, `HTTPie`, or CLI indicators in the User-Agent header

2. **Content Negotiation** - For CLI clients, the server returns `text/plain` with ANSI escape codes instead of `text/html`

3. **ANSI Formatting** - Terminal output uses:
   - Color codes (`\x1b[36m` for cyan, `\x1b[32m` for green)
   - Bold text (`\x1b[1m`)
   - Box-drawing characters (╔═══╗)
   - UTF-8 emojis ✨

## 🛠️ Project Structure

```
terminal-web-interface/
├── index.html              # Main HTML page
├── stylex.css             # Modern dark-themed CSS
├── terminal-plugin.js     # Vite plugin for terminal detection
├── vite.config.js         # Vite configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

### Key Files

#### `terminal-plugin.js`

The heart of the project. This Vite plugin:

```javascript
// Detects curl requests and serves ANSI-colored terminal output
export default function terminalPlugin() {
  return {
    name: 'terminal-interface',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const userAgent = req.headers['user-agent'] || '';
        
        // Detect CLI clients
        if (/^(curl|wget|httpie)/i.test(userAgent)) {
          res.setHeader('Content-Type', 'text/plain');
          res.end(generateTerminalOutput());
          return;
        }
        
        next();
      });
    }
  };
}
```

## 📝 Customization

### Change Terminal Colors

Edit `terminal-plugin.js`:

```javascript
const ANSI_COLORS = {
  cyan: '\x1b[36m',    // Change to your color
  green: '\x1b[32m',
  // ... more colors
};
```

Available colors: `30-37` (standard), `90-97` (bright)

### Modify Terminal Output

Edit the `generateTerminalInterface()` function in `terminal-plugin.js`:

```javascript
function generateTerminalInterface() {
  return `
    Your custom ASCII art here
    Add your own content
  `;
}
```

### Add New Routes

Extend the plugin to handle different paths:

```javascript
if (req.url === '/api') {
  res.end(generateApiDocs());
  return;
}
```

## 🎨 Color Reference

| Color | ANSI Code | Hex (CSS) | Usage |
|-------|-----------|-----------|-------|
| Cyan | `\x1b[36m` | `#22d3ee` | Headers, links |
| Green | `\x1b[32m` | `#4ade80` | Success, status |
| Yellow | `\x1b[33m` | `#facc15` | Warnings, highlights |
| Red | `\x1b[31m` | `#ff5f56` | Errors |
| Purple | `\x1b[35m` | `#c084fc` | Accent |
| Gray | `\x1b[90m` | `#94a3b8` | Secondary text |

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Crafted with ❤️ by [sefatanam](https://github.com/sefatanam)** - The creative mind behind this project
- **Built with [kimi-k2.5](https://github.com/opencode-ai)** - AI-powered development assistance
- Inspired by [yasp.sh](https://yasp.sh) and similar terminal interfaces
- Built with [Vite](https://vitejs.dev/) for fast development
- Fonts by [Google Fonts](https://fonts.google.com/) (Inter & JetBrains Mono)

## 🔗 Links

- [Live Demo](https://your-demo-url.com)
- [Documentation](https://your-docs-url.com)
- [Report Bug](https://github.com/yourusername/terminal-web-interface/issues)
- [Request Feature](https://github.com/yourusername/terminal-web-interface/issues)

---

<p align="center">
  <b>Crafted with ❤️ by <a href="https://github.com/sefatanam">@sefatanam</a></b>
</p>

<p align="center">
  <i>Built with the assistance of <a href="https://github.com/opencode-ai">kimi-k2.5</a></i> 🤖
</p>

<p align="center">
  <b>Try it now:</b> <code>curl http://localhost:5173</code>
</p>
