const fs = require('fs');
const path = require('path');

const mainJsPath = path.join(__dirname, 'main.js');
let mainJs = fs.readFileSync(mainJsPath, 'utf-8');

const oldMainJsStr = `  // 5. Scroll Reveals
  const revealElements = document.querySelectorAll('.section, .card, .step, .highlight-box, .insight-box, .simulator-insight');
  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach(el => revealObserver.observe(el));

  // 6. Animated Counters
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
          
          const current = start + (target - start) * easeProgress;
          const hasDecimal = target % 1 !== 0;
          const formatted = hasDecimal ? current.toFixed(1) : Math.floor(current);
          
          el.textContent = \`\${prefix}\${formatted}\${suffix}\`;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = \`\${prefix}\${target}\${suffix}\`;
          }
        };
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));`;

const newMainJsStr = `  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 5. Advanced Premium Scroll Reveals & Load Animations
  if (!prefersReducedMotion) {
    // Initial Load Animations
    const nav = document.querySelector('.site-header');
    if (nav) {
      nav.style.opacity = '0';
      nav.style.transform = 'translateY(-20px)';
      nav.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      requestAnimationFrame(() => {
        setTimeout(() => {
          nav.style.opacity = '1';
          nav.style.transform = 'translateY(0)';
        }, 50);
      });
    }

    const hero = document.querySelector('.hero-content') || document.querySelector('.prices-header') || document.querySelector('.concepts-header');
    if (hero) {
      hero.style.opacity = '0';
      hero.style.transform = 'translateY(30px) scale(0.98)';
      hero.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 150ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 150ms';
      requestAnimationFrame(() => {
        setTimeout(() => {
          hero.style.opacity = '1';
          hero.style.transform = 'translateY(0) scale(1)';
        }, 50);
      });
    }

    // Identify elements to reveal
    const revealSelectors = [
      '.section',
      '.card',
      '.block-card',
      '.step',
      '.highlight-box',
      '.insight-box',
      '.simulator-insight',
      '.concept-row',
      '.table-container',
      'footer',
      '.image-container img',
      '.illustration'
    ];
    
    // Group children of common parents for staggering
    const parentsMap = new Map();
    
    document.querySelectorAll(revealSelectors.join(', ')).forEach(el => {
      if (el === hero || el.closest('.hero-content')) return; // skip hero elements
      
      el.classList.add('reveal');
      
      const parent = el.parentElement;
      if (!parentsMap.has(parent)) {
        parentsMap.set(parent, []);
      }
      parentsMap.get(parent).push(el);
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const parent = el.parentElement;
          const siblings = parentsMap.get(parent);
          if (siblings && siblings.length > 1) {
            const index = siblings.indexOf(el);
            const delay = Math.min(index * 100, 500); // Max 500ms stagger
            el.style.transitionDelay = \`\${delay}ms\`;
          }
          el.classList.add('reveal-active');
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  // 6. Animated Counters
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        
        if (prefersReducedMotion) {
          el.textContent = \`\${prefix}\${target}\${suffix}\`;
          counterObserver.unobserve(el);
          return;
        }
        
        let start = 0;
        const duration = 1500;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease out
          
          const current = start + (target - start) * easeProgress;
          const hasDecimal = target % 1 !== 0;
          const formatted = hasDecimal ? current.toFixed(1) : Math.floor(current);
          
          el.textContent = \`\${prefix}\${formatted}\${suffix}\`;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = \`\${prefix}\${target}\${suffix}\`;
          }
        };
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));`;

mainJs = mainJs.replace(oldMainJsStr, newMainJsStr);
fs.writeFileSync(mainJsPath, mainJs);

const stylesCssPath = path.join(__dirname, 'styles.css');
let stylesCss = fs.readFileSync(stylesCssPath, 'utf-8');

const oldRevealStr = `/* Scroll Reveal Classes */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.reveal-active {
  opacity: 1;
  transform: translateY(0);
}`;

const newRevealStr = `/* Scroll Reveal Classes */
.reveal {
  opacity: 0;
  transform: translateY(30px) scale(0.97);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.reveal.reveal-active {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal {
    opacity: 1 !important;
    transform: none !important;
  }
}`;

stylesCss = stylesCss.replace(oldRevealStr, newRevealStr);

// Button hover logic
stylesCss = stylesCss.replace('.btn-primary:hover { opacity: 0.85; }', '.btn-primary:hover { opacity: 0.85; transform: scale(1.03); }');
stylesCss = stylesCss.replace('.btn-outline:hover { background: var(--accent-glow); }', '.btn-outline:hover { background: var(--accent-glow); transform: scale(1.03); }');

fs.writeFileSync(stylesCssPath, stylesCss);

console.log('Animations updated successfully.');
