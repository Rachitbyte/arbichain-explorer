const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = ['index.html', 'concepts.html', 'prices.html', 'simulator.html'];

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert Lucide CDN
  if (!content.includes('unpkg.com/lucide')) {
    content = content.replace('</head>', '    <script src="https://unpkg.com/lucide@latest"></script>\n</head>');
  }

  // index.html replacements
  content = content.replace(/<div class="card-icon">⚡<\/div>/g, '<div class="card-icon"><i data-lucide="zap"></i></div>');
  content = content.replace(/<div class="card-icon">💸<\/div>/g, '<div class="card-icon"><i data-lucide="coins"></i></div>');
  content = content.replace(/<div class="card-icon">🔒<\/div>/g, '<div class="card-icon"><i data-lucide="shield-check"></i></div>');
  content = content.replace(/<div class="card-icon">🚀<\/div>/g, '<div class="card-icon"><i data-lucide="rocket"></i></div>');
  content = content.replace(/<div class="card-icon">⚙️<\/div>/g, '<div class="card-icon"><i data-lucide="settings"></i></div>');
  content = content.replace(/<div class="card-icon">🔗<\/div>/g, '<div class="card-icon"><i data-lucide="link"></i></div>');
  content = content.replace(/<td>✅ Yes<\/td>/g, '<td><i data-lucide="check-circle-2" class="inline-icon success"></i> Yes</td>');
  content = content.replace(/<div class="card-icon">👤<\/div>/g, '<div class="card-icon"><i data-lucide="user"></i></div>');
  content = content.replace(/<div class="card-icon">📦<\/div>/g, '<div class="card-icon"><i data-lucide="package"></i></div>');
  content = content.replace(/<div class="card-icon">⛓️<\/div>/g, '<div class="card-icon"><i data-lucide="network"></i></div>');
  content = content.replace(/<div class="card-icon">✅<\/div>/g, '<div class="card-icon"><i data-lucide="check-circle-2"></i></div>');

  // concepts.html replacements
  content = content.replace(/❌ Not supported/g, '<i data-lucide="x-circle" class="inline-icon danger"></i> Not supported');
  content = content.replace(/✅ Core feature/g, '<i data-lucide="check-circle-2" class="inline-icon success"></i> Core feature');
  content = content.replace(/<div class="card-icon">🌐<\/div>/g, '<div class="card-icon"><i data-lucide="globe"></i></div>');
  content = content.replace(/<div class="card-icon">🔑<\/div>/g, '<div class="card-icon"><i data-lucide="key"></i></div>');
  content = content.replace(/⚠️ Losing your private key/g, '<i data-lucide="alert-triangle" class="inline-icon warning"></i> Losing your private key');

  // simulator.html replacements
  content = content.replace(/<h3>🔐 Hash<\/h3>/g, '<h3><i data-lucide="shield-ellipsis" class="header-icon"></i> Hash</h3>');
  content = content.replace(/<h3>🎲 Nonce<\/h3>/g, '<h3><i data-lucide="shuffle" class="header-icon"></i> Nonce</h3>');
  content = content.replace(/<h3>⛓️ Chain<\/h3>/g, '<h3><i data-lucide="link-2" class="header-icon"></i> Chain</h3>');
  content = content.replace(/⛏ Mine Block 1/g, '<i data-lucide="hammer" class="btn-icon"></i> Mine Block 1');
  content = content.replace(/⛏ Mine Block 2/g, '<i data-lucide="hammer" class="btn-icon"></i> Mine Block 2');
  content = content.replace(/<h3>💡 The Core Insight<\/h3>/g, '<h3><i data-lucide="lightbulb" class="header-icon"></i> The Core Insight</h3>');

  fs.writeFileSync(filePath, content);
});

// Update main.js
const jsPath = path.join(dir, 'main.js');
let js = fs.readFileSync(jsPath, 'utf8');
if (!js.includes('lucide.createIcons()')) {
  js = js.replace(/document\.addEventListener\('DOMContentLoaded',\s*\(\)\s*=>\s*\{/, "document.addEventListener('DOMContentLoaded', () => {\n  if (typeof lucide !== 'undefined') lucide.createIcons();");
  fs.writeFileSync(jsPath, js);
}

// Update styles.css
const cssPath = path.join(dir, 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Ensure --warning color exists
if (!css.includes('--warning:')) {
  css = css.replace(/--danger:\s*#ef4444;/, '--danger: #ef4444;\n  --warning: #f59e0b;');
}

const lucideStyles = `
/* Lucide Icons Integration */
.card-icon svg {
  width: 32px;
  height: 32px;
  color: var(--accent-cyan);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease;
  will-change: transform, color;
}
.card:hover .card-icon svg, .block-card:hover .card-icon svg, .highlight-box:hover .card-icon svg, .info-card:hover .card-icon svg {
  color: var(--accent-indigo);
  transform: scale(1.1) rotate(5deg);
}
.inline-icon {
  width: 18px;
  height: 18px;
  vertical-align: -4px;
  margin-right: 4px;
}
.inline-icon.success { color: var(--success); }
.inline-icon.danger { color: var(--danger); }
.inline-icon.warning { color: var(--warning); }

.header-icon {
  width: 24px;
  height: 24px;
  vertical-align: -4px;
  margin-right: 8px;
  color: var(--accent-cyan);
}
.btn-icon {
  width: 18px;
  height: 18px;
  vertical-align: -4px;
  margin-right: 6px;
}
`;

if (!css.includes('Lucide Icons Integration')) {
  css += lucideStyles;
  fs.writeFileSync(cssPath, css);
}

console.log('Icons updated to Lucide.');
