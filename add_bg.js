const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(cssFile, 'utf8');

// 1. Remove old .ambient-glow CSS
css = css.replace(/\.ambient-glow\s*\{[\s\S]*?\}/g, '');

// 2. Add new CSS Variables to :root and [data-theme="light"]
const rootVars = `  --aurora-1: #09eab4;
  --aurora-2: #6366f1;
  --aurora-3: #c084fc;
  --grid-color: rgba(255, 255, 255, 0.03);
  --mouse-glow-color: rgba(99, 102, 241, 0.4);
  --hero-glow-color: rgba(9, 234, 180, 0.2);`;

const lightVars = `  --aurora-1: #059669;
  --aurora-2: #4f46e5;
  --aurora-3: #9333ea;
  --grid-color: rgba(0, 0, 0, 0.04);
  --mouse-glow-color: rgba(79, 70, 229, 0.25);
  --hero-glow-color: rgba(5, 150, 105, 0.15);`;

css = css.replace(/--nav-bg:\s*rgba\(13, 13, 20, 0\.4\);/, '--nav-bg: rgba(13, 13, 20, 0.4);\n' + rootVars);
css = css.replace(/--nav-bg:\s*rgba\(255, 255, 255, 0\.6\);/, '--nav-bg: rgba(255, 255, 255, 0.6);\n' + lightVars);

// 3. Remove .ambient-glow from transition
css = css.replace(', .ambient-glow', '');

// 4. Append Web3 BG CSS
css += `
/* Premium Web3 Background Engine */
.web3-bg-container {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  z-index: -2;
  overflow: hidden;
  pointer-events: none;
}
.web3-bg-container.paused * {
  animation-play-state: paused !important;
}
.web3-aurora {
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: 
    radial-gradient(circle at 20% 30%, var(--aurora-1) 0%, transparent 40%),
    radial-gradient(circle at 80% 20%, var(--aurora-2) 0%, transparent 40%),
    radial-gradient(circle at 50% 80%, var(--aurora-3) 0%, transparent 50%);
  filter: blur(100px);
  opacity: 0.15;
  animation: aurora-drift 25s ease-in-out infinite alternate;
  will-change: transform;
}
@keyframes aurora-drift {
  0% { transform: rotate(0deg) scale(1); }
  100% { transform: rotate(15deg) scale(1.1); }
}
.web3-grid {
  position: absolute;
  top: -50%; left: -50%; width: 200%; height: 200%;
  background-size: 50px 50px;
  background-image: 
    linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
  opacity: 0.5;
  transform: perspective(600px) rotateX(60deg) translateY(-100px) translateZ(-200px);
  animation: grid-move 15s linear infinite;
  will-change: transform;
}
@keyframes grid-move {
  0% { transform: perspective(600px) rotateX(60deg) translateY(0) translateZ(-200px); }
  100% { transform: perspective(600px) rotateX(60deg) translateY(50px) translateZ(-200px); }
}
.web3-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.2;
  will-change: transform;
}
.orb-0 { width: 300px; height: 300px; background: var(--accent-cyan); top: 10%; left: 15%; animation: float-1 12s infinite alternate ease-in-out; }
.orb-1 { width: 400px; height: 400px; background: var(--accent-indigo); top: 60%; left: 70%; animation: float-2 18s infinite alternate ease-in-out; }
.orb-2 { width: 200px; height: 200px; background: var(--aurora-3); top: 40%; left: 30%; animation: float-3 14s infinite alternate ease-in-out; }
.orb-3 { width: 350px; height: 350px; background: var(--accent-cyan); top: 80%; left: 10%; animation: float-4 22s infinite alternate ease-in-out; }
.orb-4 { width: 250px; height: 250px; background: var(--accent-indigo); top: 20%; left: 80%; animation: float-1 16s infinite alternate ease-in-out; }
.orb-5 { width: 150px; height: 150px; background: var(--aurora-3); top: 50%; left: 50%; animation: float-2 19s infinite alternate ease-in-out; }
@keyframes float-1 { 0% { transform: translate(0, 0); } 100% { transform: translate(30px, -50px); } }
@keyframes float-2 { 0% { transform: translate(0, 0); } 100% { transform: translate(-40px, 40px); } }
@keyframes float-3 { 0% { transform: translate(0, 0); } 100% { transform: translate(50px, 20px); } }
@keyframes float-4 { 0% { transform: translate(0, 0); } 100% { transform: translate(-20px, -60px); } }

.web3-mouse-glow {
  position: absolute;
  top: -200px; left: -200px;
  width: 400px; height: 400px;
  background: radial-gradient(circle, var(--mouse-glow-color) 0%, transparent 60%);
  opacity: 0;
  pointer-events: none;
  border-radius: 50%;
  will-change: transform, opacity;
  transition: opacity 0.3s;
}
.web3-hero-glow {
  position: absolute;
  top: 5%; left: 50%;
  width: 600px; height: 600px;
  transform: translateX(-50%);
  background: radial-gradient(circle, var(--hero-glow-color) 0%, transparent 70%);
  opacity: 0.25;
  filter: blur(80px);
  animation: hero-pulse 8s infinite alternate ease-in-out;
  pointer-events: none;
  will-change: transform, opacity;
}
@keyframes hero-pulse {
  0% { transform: translateX(-50%) scale(1); opacity: 0.2; }
  100% { transform: translateX(-50%) scale(1.1); opacity: 0.35; }
}
@media (prefers-reduced-motion: reduce) {
  .web3-bg-container * { animation: none !important; transition: none !important; }
}
`;
fs.writeFileSync(cssFile, css);

const jsFile = path.join(__dirname, 'main.js');
let js = fs.readFileSync(jsFile, 'utf8');

// Remove the old global mousemove listener that was used for ambient-glow
js = js.replace(/\/\/\s*1\.\s*Mouse-Follow Global Variables\s*document\.addEventListener\('mousemove', \(e\) => \{\s*document\.documentElement\.style\.setProperty\('--mouse-x', \`\$\{e\.clientX\}px\`\);\s*document\.documentElement\.style\.setProperty\('--mouse-y', \`\$\{e\.clientY\}px\`\);\s*\}\);/, '');

const web3BgJS = `
  // 8. Premium Web3 Background Engine
  if (!prefersReducedMotion) {
    const bgContainer = document.createElement('div');
    bgContainer.className = 'web3-bg-container';
    
    const aurora = document.createElement('div');
    aurora.className = 'web3-aurora';
    bgContainer.appendChild(aurora);
    
    const grid = document.createElement('div');
    grid.className = 'web3-grid';
    bgContainer.appendChild(grid);
    
    for (let i = 0; i < 6; i++) {
      const orb = document.createElement('div');
      orb.className = \`web3-orb orb-\${i}\`;
      bgContainer.appendChild(orb);
    }
    
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'web3-mouse-glow';
    bgContainer.appendChild(mouseGlow);

    const heroGlow = document.createElement('div');
    heroGlow.className = 'web3-hero-glow';
    bgContainer.appendChild(heroGlow);

    document.body.prepend(bgContainer);
    
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setTimeout(() => mouseGlow.style.opacity = '1', 1000);
      document.addEventListener('mousemove', (e) => {
        if (!window.glowTicking) {
          window.requestAnimationFrame(() => {
            mouseGlow.style.transform = \`translate(\${e.clientX}px, \${e.clientY}px)\`;
            window.glowTicking = false;
          });
          window.glowTicking = true;
        }
      });
    }
    
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        bgContainer.classList.add('paused');
      } else {
        bgContainer.classList.remove('paused');
      }
    });
  }
`;

js = js.replace('  // 7. Theme Toggle', web3BgJS + '\n  // 7. Theme Toggle');
fs.writeFileSync(jsFile, js);

console.log('Web3 Animated Background applied successfully.');
