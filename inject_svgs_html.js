const fs = require('fs');
const path = require('path');
const dir = __dirname;

const heroSVG = `
  <svg class="svg-hero-net" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Connections -->
    <path d="M50,100 L150,50 L250,120 L350,80" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round"/>
    <path d="M50,100 L120,150 L250,120 L300,160" stroke="var(--accent-indigo)" stroke-width="2" stroke-linecap="round"/>
    <path d="M150,50 L200,20 L350,80" stroke="rgba(9, 234, 180, 0.4)" stroke-width="1.5" stroke-dasharray="4"/>
    <!-- Nodes -->
    <circle cx="50" cy="100" r="8" fill="var(--bg-color)" stroke="var(--accent-cyan)" stroke-width="3"/>
    <circle cx="150" cy="50" r="12" fill="var(--bg-color)" stroke="var(--accent-indigo)" stroke-width="3"/>
    <circle cx="120" cy="150" r="10" fill="var(--bg-color)" stroke="var(--accent-cyan)" stroke-width="3"/>
    <circle cx="250" cy="120" r="16" fill="var(--bg-color)" stroke="var(--accent-cyan)" stroke-width="4"/>
    <circle cx="350" cy="80" r="10" fill="var(--bg-color)" stroke="var(--accent-indigo)" stroke-width="3"/>
    <circle cx="300" cy="160" r="8" fill="var(--bg-color)" stroke="var(--accent-cyan)" stroke-width="3"/>
    <circle cx="200" cy="20" r="6" fill="var(--bg-color)" stroke="var(--accent-indigo)" stroke-width="2"/>
    <!-- Inner Pulses -->
    <circle cx="150" cy="50" r="4" fill="var(--accent-cyan)"/>
    <circle cx="250" cy="120" r="6" fill="var(--accent-indigo)"/>
  </svg>
`;

const flowDiagramSVG = `
  <svg class="svg-flow-diagram" viewBox="0 0 800 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="50" y="50" width="120" height="50" rx="8" stroke="var(--accent-cyan)" stroke-width="2" fill="rgba(9,234,180,0.05)"/>
    <text x="110" y="80" fill="currentColor" font-size="14" font-family="Space Grotesk" text-anchor="middle" font-weight="600">Users</text>
    
    <path d="M170,75 L300,75" stroke="var(--accent-indigo)" stroke-width="2"/>
    <circle cx="235" cy="75" r="4" fill="var(--accent-cyan)"/>
    
    <rect x="300" y="50" width="160" height="50" rx="8" stroke="var(--accent-indigo)" stroke-width="2" fill="rgba(79,70,229,0.05)"/>
    <text x="380" y="80" fill="currentColor" font-size="14" font-family="Space Grotesk" text-anchor="middle" font-weight="600">Sequencer (L2)</text>
    
    <path d="M460,75 L600,75" stroke="var(--accent-cyan)" stroke-width="2"/>
    <circle cx="530" cy="75" r="4" fill="var(--accent-indigo)"/>
    
    <rect x="600" y="50" width="150" height="50" rx="8" stroke="currentColor" stroke-width="2" stroke-opacity="0.2" fill="none"/>
    <text x="675" y="80" fill="currentColor" font-size="14" font-family="Space Grotesk" text-anchor="middle" font-weight="600">Ethereum (L1)</text>
  </svg>
`;

// 1. Update index.html
let indexHTML = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
if (!indexHTML.includes('svg-hero-net')) {
  indexHTML = indexHTML.replace('<div class="hero-stats">', heroSVG + '\n          <div class="hero-stats">');
  indexHTML = indexHTML.replace('<h2>How Arbitrum Processes Transactions</h2>', '<h2>How Arbitrum Processes Transactions</h2>\n        ' + flowDiagramSVG);
  fs.writeFileSync(path.join(dir, 'index.html'), indexHTML);
}

// 2. Update simulator.html
let simHTML = fs.readFileSync(path.join(dir, 'simulator.html'), 'utf8');
if (!simHTML.includes('svg-chain-deco')) {
  const chainDeco = `<svg class="svg-chain-deco" viewBox="0 0 24 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12,0 L12,60" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/></svg>`;
  simHTML = simHTML.replace('</form>\n          </div>\n          \n          <div class="simulator-card block-card" id="block2">', '</form>\n          </div>\n          ' + chainDeco + '\n          <div class="simulator-card block-card" id="block2">');
  fs.writeFileSync(path.join(dir, 'simulator.html'), simHTML);
}

// 3. Update concepts.html
let conceptHTML = fs.readFileSync(path.join(dir, 'concepts.html'), 'utf8');
if (!conceptHTML.includes('svg-concept-icon')) {
  const vaultSVG = `<svg class="svg-concept-icon" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
  const ethSVG = `<svg class="svg-concept-icon" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" stroke-width="2"><polygon points="12 2 19 12 12 16 5 12 12 2"></polygon><polygon points="12 17 19 13 12 22 5 13 12 17"></polygon></svg>`;
  
  conceptHTML = conceptHTML.replace(/<span class="label">Smart Contracts:<\/span>/g, vaultSVG + ' <span class="label">Smart Contracts:</span>');
  conceptHTML = conceptHTML.replace(/<span class="label">Security:<\/span>/g, ethSVG + ' <span class="label">Security:</span>');
  fs.writeFileSync(path.join(dir, 'concepts.html'), conceptHTML);
}

// 4. Update prices.js
let pricesJS = fs.readFileSync(path.join(dir, 'prices.js'), 'utf8');
if (!pricesJS.includes('svg-crypto-logo')) {
  const btcLogo = `<svg class="svg-crypto-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#F7931A"/><path d="M22.5 13.9c.2-1.3-.8-2-2.1-2.4l.4-1.7-1.3-.3-.4 1.7c-.3-.1-.7-.2-1-.2l.4-1.7-1.3-.3-.4 1.7c-.3-.1-.6-.1-1-.2l-2.2-.5-.4 1.7s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.3c0 .1.1.2.2.2-.1-.1-.1-.1-.2-.2l-1.1 4.5c-.1.3-.3.4-.7.3 0 0-1.2-.3-1.2-.3l-.8 1.9 2.1.5c.3.1.7.2 1 .2l-.4 1.8 1.3.3.4-1.8c.4.1.7.2 1 .3l-.4 1.8 1.3.3.4-1.7c1.8.4 3.1.2 3.6-1.4.4-1.3-.1-2-1-2.4.7-.2 1.2-.6 1.4-1.5zM17.4 20c-.5 2-3.8 1-4.9.7l.9-3.5c1.1.3 4.5.7 4 2.8zm.4-5c-.4 1.8-3 .9-3.8.7l.8-3.2c.8.2 3.4.6 3 2.5z" fill="#FFF"/></svg>`;
  const ethLogo = `<svg class="svg-crypto-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#627EEA"/><path d="M16 4L9 15.6L16 19.7L23 15.6L16 4Z" fill="#FFF" fill-opacity="0.8"/><path d="M16 19.7L9 15.6L16 27L23 15.6L16 19.7Z" fill="#FFF" fill-opacity="0.4"/></svg>`;
  
  pricesJS = pricesJS.replace("icon: '₿'", `icon: '${btcLogo}'`);
  pricesJS = pricesJS.replace("icon: 'Ξ'", `icon: '${ethLogo}'`);
  fs.writeFileSync(path.join(dir, 'prices.js'), pricesJS);
}

console.log('HTML and JS SVGs injected successfully.');
