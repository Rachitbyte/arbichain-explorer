const fs = require('fs');
const path = require('path');

const dir = __dirname;
const cssPath = path.join(dir, 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const svgCss = `
/* Premium SVG Animations & Styles */
@keyframes svg-float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

@keyframes svg-pulse {
  0% { opacity: 0.4; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 0.4; transform: scale(0.95); }
}

@keyframes svg-dash-flow {
  to { stroke-dashoffset: -100; }
}

.svg-hero-net {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin: 24px auto 0;
  display: block;
  animation: svg-float 6s ease-in-out infinite;
  filter: drop-shadow(0 10px 20px rgba(9, 234, 180, 0.2));
}

.svg-hero-net path {
  stroke-dasharray: 10;
  animation: svg-dash-flow 20s linear infinite;
}

.svg-hero-net circle {
  animation: svg-pulse 4s ease-in-out infinite alternate;
}
.svg-hero-net circle:nth-child(even) { animation-delay: -2s; }

.svg-flow-diagram {
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  display: block;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
}
.svg-flow-diagram path {
  stroke-dasharray: 8;
  animation: svg-dash-flow 30s linear infinite;
}

.svg-crypto-logo {
  width: 40px;
  height: 40px;
  margin-right: 16px;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
}
.price-card:hover .svg-crypto-logo {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 8px 16px rgba(9, 234, 180, 0.4));
}

.svg-concept-icon {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 8px;
}

.svg-chain-deco {
  display: block;
  width: 24px;
  height: 60px;
  margin: 0 auto;
  color: var(--border-color);
  opacity: 0.5;
}

/* Background Geometry SVGs */
.bg-geo {
  position: absolute;
  pointer-events: none;
  z-index: 1;
  opacity: 0.15;
}
.bg-geo-1 { top: 15%; left: 10%; width: 120px; animation: svg-float 12s ease-in-out infinite; }
.bg-geo-2 { top: 60%; right: 5%; width: 180px; animation: svg-float 15s ease-in-out infinite reverse; }
.bg-geo-3 { top: 80%; left: 20%; width: 90px; animation: svg-float 10s ease-in-out infinite; }
.bg-geo-4 { top: 30%; right: 15%; width: 150px; animation: svg-float 14s ease-in-out infinite reverse; }
`;

if (!css.includes('Premium SVG Animations')) {
  css += svgCss;
  fs.writeFileSync(cssPath, css);
}

const jsPath = path.join(dir, 'main.js');
let js = fs.readFileSync(jsPath, 'utf8');

const bgGeoInjection = `
    // Geometric SVG Backgrounds
    const geos = [
      '<svg class="bg-geo bg-geo-1" viewBox="0 0 100 100" fill="none" stroke="var(--accent-cyan)" stroke-width="1"><polygon points="50,5 95,25 95,75 50,95 5,75 5,25"/></svg>',
      '<svg class="bg-geo bg-geo-2" viewBox="0 0 100 100" fill="none" stroke="var(--accent-indigo)" stroke-width="1"><circle cx="50" cy="50" r="45"/><circle cx="50" cy="50" r="30"/></svg>',
      '<svg class="bg-geo bg-geo-3" viewBox="0 0 100 100" fill="none" stroke="var(--accent-cyan)" stroke-width="1"><rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)"/></svg>',
      '<svg class="bg-geo bg-geo-4" viewBox="0 0 100 100" fill="none" stroke="var(--accent-indigo)" stroke-width="1"><path d="M10,90 L50,10 L90,90 Z"/></svg>'
    ];
    geos.forEach(geoHTML => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = geoHTML;
      bgContainer.appendChild(wrapper.firstChild);
    });
`;

if (!js.includes('Geometric SVG Backgrounds') && js.includes('bgContainer.appendChild(mouseGlow);')) {
  js = js.replace('bgContainer.appendChild(mouseGlow);', 'bgContainer.appendChild(mouseGlow);\n' + bgGeoInjection);
  fs.writeFileSync(jsPath, js);
}

console.log('CSS and Background SVGs injected.');
