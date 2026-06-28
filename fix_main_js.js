const fs = require('fs');
const path = require('path');

const dir = __dirname;
const jsPath = path.join(dir, 'main.js');
let js = fs.readFileSync(jsPath, 'utf8');

// 1. Move everything after `});` inside the block.
const splitParts = js.split('});\n\n  // 9. Premium Micro-Interactions');
if (splitParts.length === 2) {
  // It was incorrectly appended outside.
  js = splitParts[0] + '\n  // 9. Premium Micro-Interactions' + splitParts[1] + '\n});\n';
} else if (js.includes('});\n  // 9. Premium Micro-Interactions')) {
  const parts = js.split('});\n  // 9. Premium Micro-Interactions');
  js = parts[0] + '\n  // 9. Premium Micro-Interactions' + parts[1] + '\n});\n';
}

// 2. Add Lenis
const lenisJs = `
  // 10. Lenis Smooth Scroll
  if (!prefersReducedMotion && typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical', 
      gestureDirection: 'vertical',
      smooth: true,
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
`;

if (!js.includes('Lenis Smooth Scroll')) {
  js = js.replace(/(\}\);\s*)$/, lenisJs + '\n$1');
}

// 3. Add Cursor
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
      dotX = lerp(dotX, mouseX, 0.8);
      dotY = lerp(dotY, mouseY, 0.8);
      ringX = lerp(ringX, mouseX, 0.2);
      ringY = lerp(ringY, mouseY, 0.2);

      dot.style.transform = \`translate3d(\${dotX}px, \${dotY}px, 0) translate3d(-50%, -50%, 0)\`;
      ring.style.transform = \`translate3d(\${ringX}px, \${ringY}px, 0) translate3d(-50%, -50%, 0)\`;

      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);
  }
`;

if (!js.includes('Custom Premium Cursor')) {
  js = js.replace(/(\}\);\s*)$/, cursorJs + '\n$1');
}

fs.writeFileSync(jsPath, js);
console.log('Fixed main.js successfully.');
