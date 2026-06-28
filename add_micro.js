const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(cssFile, 'utf8');

// Smooth scroll behavior and initial page fade
if (!css.includes('scroll-behavior: smooth')) {
  css += `\nhtml { scroll-behavior: smooth; }\n`;
}
// Page fade in load
if (!css.includes('page-fade-in')) {
  css += `body { animation: page-fade-in 0.6s ease-out forwards; }\n@keyframes page-fade-in { from { opacity: 0; } to { opacity: 1; } }\n`;
}

// Ripple Effect CSS
if (!css.includes('.ripple')) {
  css += `
.btn-primary, .btn-outline { position: relative; overflow: hidden; }
.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 0.6s linear;
  background: rgba(255, 255, 255, 0.4);
  width: 100px; height: 100px;
  margin-left: -50px; margin-top: -50px;
  pointer-events: none;
}
[data-theme="light"] .ripple {
  background: rgba(0, 0, 0, 0.2);
}
@keyframes ripple {
  to { transform: scale(4); opacity: 0; }
}
`;
}

// Nav Underline CSS
if (!css.includes('.nav-indicator')) {
  css += `
.nav-links { position: relative; }
.nav-indicator {
  position: absolute;
  bottom: -4px;
  height: 2px;
  background: var(--accent-cyan);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  opacity: 1;
}
.navbar { transition: backdrop-filter 0.3s ease, background 0.3s ease; }
.navbar.scrolled {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  background: rgba(13, 13, 20, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
[data-theme="light"] .navbar.scrolled {
  background: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
`;
}

// Card Micro-interactions CSS
if (!css.includes('gradient-border-hover')) {
  css += `
.card:hover, .block-card:hover { background: rgba(255, 255, 255, 0.04); box-shadow: 0 10px 40px rgba(0,0,0,0.15); }
.card::after, .block-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(45deg, var(--accent-cyan), var(--accent-indigo), var(--aurora-3));
  background-size: 200% 200%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.4s ease;
  animation: gradient-border-hover 3s linear infinite;
  pointer-events: none;
  z-index: 2;
}
.card:hover::after, .block-card:hover::after { opacity: 1; }
@keyframes gradient-border-hover { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

.card-icon { transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); display: inline-block; }
.card:hover .card-icon, .block-card:hover .card-icon { transform: scale(1.15) rotate(6deg); }
`;
}

// Generic Links Underline CSS
if (!css.includes('.footer a::after')) {
  css += `
.footer a, p a:not(.btn-primary):not(.btn-outline):not(.nav-logo) { position: relative; text-decoration: none !important; }
.footer a::after, p a:not(.btn-primary):not(.btn-outline):not(.nav-logo)::after {
  content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: currentColor;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.footer a:hover::after, p a:not(.btn-primary):not(.btn-outline):not(.nav-logo):hover::after { width: 100%; }
`;
}

// Button modifications
css = css.replace('.btn-primary:hover { opacity: 0.85; transform: scale(1.03); }', '.btn-primary:hover { opacity: 0.85; transform: scale(1.03) translateY(-3px); box-shadow: 0 4px 15px var(--accent-glow); }');
css = css.replace('.btn-outline:hover { background: var(--accent-glow); transform: scale(1.03); }', '.btn-outline:hover { background: var(--accent-glow); transform: scale(1.03) translateY(-3px); box-shadow: 0 4px 15px var(--accent-glow); }');
css = css.replace('.btn-primary:active { transform: scale(0.98) !important; }', '.btn-primary:active { transform: scale(0.96) translateY(0) !important; box-shadow: none !important; }');
css = css.replace('.btn-outline:active { transform: scale(0.98) !important; }', '.btn-outline:active { transform: scale(0.96) translateY(0) !important; box-shadow: none !important; }');

// Connecting lines animation
if (!css.includes('flow-arrow')) {
  css += `
.flow-arrow, .connection-line { transition: opacity 0.5s ease, transform 0.5s ease; opacity: 0; transform: translateX(-10px); }
.reveal-active .flow-arrow, .reveal-active .connection-line { opacity: 1; transform: translateX(0); }
`;
}

fs.writeFileSync(cssFile, css);

const jsFile = path.join(__dirname, 'main.js');
let js = fs.readFileSync(jsFile, 'utf8');

const microJs = `
  // 9. Premium Micro-Interactions
  if (!prefersReducedMotion) {
    // Nav Slide Indicator
    const navLinksList = document.querySelector('.nav-links');
    if (navLinksList) {
      const indicator = document.createElement('div');
      indicator.className = 'nav-indicator';
      navLinksList.appendChild(indicator);
      
      const links = Array.from(navLinksList.querySelectorAll('a'));
      let activeLink = links.find(l => window.location.href.includes(l.getAttribute('href'))) || links[0];
      
      const updateIndicator = (el) => {
        if (!el) return;
        indicator.style.width = \`\${el.offsetWidth}px\`;
        indicator.style.left = \`\${el.offsetLeft}px\`;
      };
      
      // Delay slightly for fonts
      setTimeout(() => updateIndicator(activeLink), 150);
      window.addEventListener('resize', () => updateIndicator(activeLink));
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => updateIndicator(link));
      });
      navLinksList.addEventListener('mouseleave', () => updateIndicator(activeLink));
    }

    // Scrolled Navbar Blur
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
      }, { passive: true });
    }

    // Ripple Effect on Buttons
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
      btn.addEventListener('mousedown', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = \`\${x}px\`;
        ripple.style.top = \`\${y}px\`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }
`;

if (!js.includes('Premium Micro-Interactions')) {
  js += microJs;
  fs.writeFileSync(jsFile, js);
}

const pricesJsFile = path.join(__dirname, 'prices.js');
let pricesJs = fs.readFileSync(pricesJsFile, 'utf8');

if (!pricesJs.includes('opacity 0.4s ease')) {
  const replaceTarget = `    grid.innerHTML = Object.entries(coins).map(([id, coin]) => {`;
  const replaceWith = `    grid.style.transition = 'opacity 0.4s ease';
    grid.style.opacity = 0;
    setTimeout(() => {
      grid.innerHTML = Object.entries(coins).map(([id, coin]) => {`;
      
  const endTarget = `          </div>
        </div>
      \`;
    }).join('');`;
  const endWith = `          </div>
        </div>
      \`;
    }).join('');
      grid.style.opacity = 1;
    }, 400);`;
    
  if (pricesJs.includes(replaceTarget)) {
    pricesJs = pricesJs.replace(replaceTarget, replaceWith);
    pricesJs = pricesJs.replace(endTarget, endWith);
    fs.writeFileSync(pricesJsFile, pricesJs);
  }
}

console.log('Premium Micro-Interactions injected successfully.');
