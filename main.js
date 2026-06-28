document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link based on current page
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === page) {
      link.classList.add('active');
    }
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      if (navLinks) {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen);
      }
    });
  }

  // --- PREMIUM WEB3 AESTHETICS ---

  // 1. Mouse-Follow Global Variables
  document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });

  // 2. Card Tilt & Glow Hover
  const cards = document.querySelectorAll('.card, .block-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      card.style.setProperty('--card-mouse-x', `${x}px`);
      card.style.setProperty('--card-mouse-y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5; 
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });

  // 3. Magnetic Buttons
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  // 4. Smooth Page Transitions
  document.querySelectorAll('a').forEach(a => {
    if(a.hostname === window.location.hostname && a.getAttribute('target') !== '_blank') {
      a.addEventListener('click', (e) => {
        // Only intercept normal left clicks without modifier keys
        if (e.ctrlKey || e.metaKey || e.shiftKey) return;
        e.preventDefault();
        const href = a.href;
        document.body.classList.add('page-exit');
        setTimeout(() => {
          window.location = href;
        }, 300);
      });
    }
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
            el.style.transitionDelay = `${delay}ms`;
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
          el.textContent = `${prefix}${target}${suffix}`;
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
          
          el.textContent = `${prefix}${formatted}${suffix}`;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        };
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // 7. Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
});
