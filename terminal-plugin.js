// @REVIEW: Terminal interface plugin for curl detection
// Detects curl requests and serves ANSI-colored terminal output instead of HTML

const ANSI_COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  white: '\x1b[37m',
  gray: '\x1b[90m'
};

const color = (text, colorName) => `${ANSI_COLORS[colorName]}${text}${ANSI_COLORS.reset}`;

export default function terminalPlugin() {
  return {
    name: 'terminal-interface',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const userAgent = req.headers['user-agent'] || '';
        
        // Detect curl, wget, or any CLI HTTP client
        const isCliClient = /^(curl|wget|httpie|fetch)/i.test(userAgent) || 
                           req.headers['accept'] === '*/*' && !req.headers['accept-language'];
        
        if (isCliClient) {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          
          const terminalOutput = generateTerminalInterface();
          res.end(terminalOutput);
          return;
        }
        
        next();
      });
    }
  };
}

function generateTerminalInterface() {
  const { bold, cyan, green, yellow, red, blue, magenta, gray, dim, reset } = ANSI_COLORS;
  
  return `
${cyan}╔══════════════════════════════════════════════════════════════════╗${reset}
${cyan}║${reset}                                                                  ${cyan}║${reset}
${cyan}║${reset}   ${bold}${cyan}✦${reset}  ${bold}Welcome to Terminal Web Interface${reset}  ${cyan}✦${reset}                    ${cyan}║${reset}
${cyan}║${reset}                                                                  ${cyan}║${reset}
${cyan}╚══════════════════════════════════════════════════════════════════╝${reset}

${dim}Crafted by ${cyan}@sefatanam${reset} ${dim}with${reset} ${magenta}kimi-k2.5${reset} 🤖

${green}●${reset} ${bold}Status:${reset}     Online and running smoothly
${green}●${reset} ${bold}Version:${reset}    ${yellow}1.0.0${reset}
${green}●${reset} ${bold}Server:${reset}     ${cyan}Vite Development Server${reset}

${gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

${bold}${yellow}⚡ Quick Links${reset}

   ${cyan}→${reset} ${bold}/about${reset}        Learn more about this project
   ${cyan}→${reset} ${bold}/features${reset}     Key features and capabilities  
   ${cyan}→${reset} ${bold}/api${reset}          API documentation
   ${cyan}→${reset} ${bold}/github${reset}       View source on GitHub

${gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

${bold}${magenta}💡 Pro Tips${reset}

   ${yellow}•${reset} Open ${cyan}http://localhost:5173${reset} in your browser
   ${yellow}•${reset} Run ${cyan}npm run dev${reset} to start development server
   ${yellow}•${reset} Run ${cyan}npm run build${reset} to create production build

${gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

${bold}${blue}🎨 Terminal Features${reset}

   ${green}✓${reset} ANSI color support
   ${green}✓${reset} UTF-8 box-drawing characters
   ${green}✓${reset} Curl user-agent detection
   ${green}✓${reset} Beautiful minimal interface

${gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

${dim}Last updated: ${new Date().toLocaleString()}${reset}

${yellow}💬${reset} ${bold}Questions?${reset} Open an issue on GitHub or visit the web interface!

`;
}
