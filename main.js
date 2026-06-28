document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') lucide.createIcons();
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
      orb.className = `web3-orb orb-${i}`;
      bgContainer.appendChild(orb);
    }
    
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'web3-mouse-glow';
    bgContainer.appendChild(mouseGlow);

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


    const heroGlow = document.createElement('div');
    heroGlow.className = 'web3-hero-glow';
    bgContainer.appendChild(heroGlow);

    document.body.prepend(bgContainer);
    
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setTimeout(() => mouseGlow.style.opacity = '1', 1000);
      document.addEventListener('mousemove', (e) => {
        if (!window.glowTicking) {
          window.requestAnimationFrame(() => {
            mouseGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
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
        indicator.style.width = `${el.offsetWidth}px`;
        indicator.style.left = `${el.offsetLeft}px`;
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
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }


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

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate3d(-50%, -50%, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate3d(-50%, -50%, 0)`;

      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);
  }

});
