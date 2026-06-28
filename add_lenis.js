const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = ['index.html', 'concepts.html', 'prices.html', 'simulator.html'];

htmlFiles.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert Lenis CDN before closing head or before script tags
  if (!content.includes('unpkg.com/lenis')) {
    content = content.replace('</head>', '    <script src="https://unpkg.com/lenis@latest/dist/lenis.min.js"></script>\n</head>');
    fs.writeFileSync(filePath, content);
  }
});

const cssPath = path.join(dir, 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const lenisCss = `
/* Lenis Recommended CSS */
html.lenis, html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}
.lenis.lenis-stopped {
  overflow: hidden;
}
.lenis.lenis-smooth iframe {
  pointer-events: none;
}
`;

if (!css.includes('html.lenis')) {
  css += lenisCss;
  fs.writeFileSync(cssPath, css);
}

const jsPath = path.join(dir, 'main.js');
let js = fs.readFileSync(jsPath, 'utf8');

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
      smoothTouch: false, // Don't enforce smooth scroll on touch, let native take over
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
  fs.writeFileSync(jsPath, js);
}

console.log('Lenis integration complete.');
