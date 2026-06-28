const fs = require('fs');
const path = require('path');

const dir = __dirname;
const cssPath = path.join(dir, 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const cursorCss = `
/* Custom Premium Cursor */
@media (hover: hover) and (pointer: fine) {
  body.custom-cursor {
    cursor: none;
  }
  body.custom-cursor *,
  body.custom-cursor a, 
  body.custom-cursor button, 
  body.custom-cursor .card, 
  body.custom-cursor .block-card, 
  body.custom-cursor .price-card, 
  body.custom-cursor .simulator-card,
  body.custom-cursor .highlight-box {
    cursor: none !important;
  }
}

.cursor-dot {
  position: fixed;
  top: 0; left: 0;
  width: 8px; height: 8px;
  background: var(--accent-cyan);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  opacity: 0;
  transition: opacity 0.3s ease, width 0.3s ease, height 0.3s ease, background 0.3s ease;
  will-change: transform, width, height, opacity, background;
}

.cursor-ring {
  position: fixed;
  top: 0; left: 0;
  width: 32px; height: 32px;
  border: 1px solid var(--accent-cyan);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  opacity: 0;
  transition: opacity 0.3s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
  will-change: transform, width, height, opacity, border-color;
  background-color: rgba(9, 234, 180, 0.1);
}

[data-theme="light"] .cursor-dot { background: var(--accent-indigo); }
[data-theme="light"] .cursor-ring { border-color: var(--accent-indigo); background-color: rgba(79, 70, 229, 0.1); }

/* Hover states */
.cursor-dot.hover {
  width: 4px; height: 4px;
}
.cursor-ring.hover {
  width: 48px; height: 48px;
  background-color: rgba(9, 234, 180, 0.05);
}
[data-theme="light"] .cursor-ring.hover {
  background-color: rgba(79, 70, 229, 0.05);
}

/* Primary btn hover */
.cursor-ring.hover-primary {
  border-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.2);
}
[data-theme="light"] .cursor-ring.hover-primary {
  border-color: var(--accent-cyan);
  background-color: rgba(5, 150, 105, 0.15);
}

/* Active click state */
.cursor-ring.clicking {
  width: 24px; height: 24px;
}
`;

if (!css.includes('.cursor-dot')) {
  css += cursorCss;
  fs.writeFileSync(cssPath, css);
}

const jsPath = path.join(dir, 'main.js');
let js = fs.readFileSync(jsPath, 'utf8');

const cursorJs = `
  // 11. Custom Premium Cursor
  if (!prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.body.classList.add('custom-cursor');
    
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    
    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot.style.opacity === '0' || dot.style.opacity === '') {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    });

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });

    document.addEventListener('mousedown', () => ring.classList.add('clicking'));
    document.addEventListener('mouseup', () => ring.classList.remove('clicking'));

    const interactiveSelectors = 'a, button, .card, .block-card, .price-card, .simulator-card, .highlight-box, input, .nav-logo';
    
    // Use event delegation for hover states
    document.body.addEventListener('mouseover', (e) => {
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        dot.classList.add('hover');
        ring.classList.add('hover');
        if (target.classList.contains('btn-primary')) {
          ring.classList.add('hover-primary');
        }
      }
    });
    
    document.body.addEventListener('mouseout', (e) => {
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        dot.classList.remove('hover');
        ring.classList.remove('hover');
        ring.classList.remove('hover-primary');
      }
    });

    const renderCursor = () => {
      // Linear interpolation for smooth trailing
      dotX = lerp(dotX, mouseX, 0.8);
      dotY = lerp(dotY, mouseY, 0.8);
      ringX = lerp(ringX, mouseX, 0.2);
      ringY = lerp(ringY, mouseY, 0.2);

      // Use translate3d for GPU acceleration and -50% for dynamic centering
      dot.style.transform = \`translate3d(\${dotX}px, \${dotY}px, 0) translate3d(-50%, -50%, 0)\`;
      ring.style.transform = \`translate3d(\${ringX}px, \${ringY}px, 0) translate3d(-50%, -50%, 0)\`;

      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);
  }
`;

if (!js.includes('Custom Premium Cursor')) {
  js = js.replace(/(\}\);\s*)$/, cursorJs + '\n$1');
  fs.writeFileSync(jsPath, js);
}

console.log('Cursor logic injected successfully.');
