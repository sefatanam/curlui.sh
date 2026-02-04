// Cloudflare Worker for Terminal Web Interface
// Detects curl requests and serves terminal output, otherwise proxies to GitHub Pages

const GITHUB_PAGES_URL = 'https://sefatanam.github.io/curlui.sh';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('user-agent') || '';
    
    // Detect curl, wget, httpie, or other CLI clients
    const isCliClient = /^(curl|wget|httpie|fetch|powershell)/i.test(userAgent);
    
    if (isCliClient) {
      // Return terminal output for CLI clients
      return new Response(generateTerminalOutput(), {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache'
        }
      });
    }
    
    // Proxy to GitHub Pages for browser requests
    const githubUrl = new URL(url.pathname + url.search, GITHUB_PAGES_URL);
    const modifiedRequest = new Request(githubUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    
    try {
      const response = await fetch(modifiedRequest);
      
      // Create new response with CORS headers if needed
      const newHeaders = new Headers(response.headers);
      newHeaders.set('X-Proxy-By', 'Cloudflare-Worker');
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    } catch (error) {
      return new Response(`Error fetching from GitHub Pages: ${error.message}`, {
        status: 502,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};

function generateTerminalOutput() {
  const ANSI = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    gray: '\x1b[90m'
  };
  
  const { bold, cyan, green, yellow, blue, magenta, gray, dim, reset } = ANSI;
  
  return `
${cyan}╔══════════════════════════════════════════════════════════════════╗${reset}
${cyan}║${reset}                                                                  ${cyan}║${reset}
${cyan}║${reset}   ${bold}${cyan}✦${reset}  ${bold}Welcome to curlui.sh${reset}  ${cyan}✦${reset}                              ${cyan}║${reset}
${cyan}║${reset}                                                                  ${cyan}║${reset}
${cyan}╚══════════════════════════════════════════════════════════════════╝${reset}

${dim}Crafted by ${cyan}@sefatanam${reset} ${dim}with${reset} ${magenta}kimi-k2.5${reset} 🤖

${green}●${reset} ${bold}Status:${reset}     Online and running smoothly
${green}●${reset} ${bold}Version:${reset}    ${yellow}1.0.0${reset}
${green}●${reset} ${bold}Server:${reset}     ${cyan}GitHub Pages + Cloudflare Workers${reset}
${green}●${reset} ${bold}Project:${reset}    ${cyan}curlui.sh${reset}

${gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

${bold}${yellow}⚡ Quick Links${reset}

   ${cyan}→${reset} ${bold}Web Interface${reset}  https://sefatanam.github.io/curlui.sh
   ${cyan}→${reset} ${bold}GitHub${reset}         https://github.com/sefatanam/curlui.sh
   ${cyan}→${reset} ${bold}Documentation${reset}  See README.md

${gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

${bold}${magenta}💡 Pro Tips${reset}

   ${yellow}•${reset} Open ${cyan}https://sefatanam.github.io/curlui.sh${reset} in your browser
   ${yellow}•${reset} Run ${cyan}curl https://sefatanam.github.io/curlui.sh${reset} to see this output
   ${yellow}•${reset} Fork and customize for your own projects

${gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

${bold}${blue}🎨 Terminal Features${reset}

   ${green}✓${reset} ANSI color support
   ${green}✓${reset} UTF-8 box-drawing characters
   ${green}✓${reset} User-Agent detection via Cloudflare Workers
   ${green}✓${reset} Beautiful minimal interface
   ${green}✓${reset} Works seamlessly on GitHub Pages

${gray}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}

${dim}Last updated: ${new Date().toUTCString()}${reset}

${yellow}💬${reset} ${bold}Questions?${reset} Open an issue on GitHub or visit the web interface!

`;
}
