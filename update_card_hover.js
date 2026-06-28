const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'main.js');
let js = fs.readFileSync(jsPath, 'utf8');

const tiltLogic = `  // 2. Card Tilt & Glow Hover
  const cards = document.querySelectorAll('.card, .block-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;  
      
      card.style.setProperty('--card-mouse-x', \`\${x}px\`);
      card.style.setProperty('--card-mouse-y', \`\${y}px\`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5; 
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) translateY(-2px)\`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = \`perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)\`;
    });
  });`;

js = js.replace(tiltLogic, '');
fs.writeFileSync(jsPath, js);

const cssPath = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Remove old hover rules to prevent conflicts
css = css.replace(/\.card:hover[\s\S]*?\{[\s\S]*?\}/g, '');
css = css.replace(/\.block-card:hover[\s\S]*?\{[\s\S]*?\}/g, '');
css = css.replace(/\.price-card:hover[\s\S]*?\{[\s\S]*?\}/g, '');
css = css.replace(/\.simulator-card:hover[\s\S]*?\{[\s\S]*?\}/g, '');
css = css.replace(/\.highlight-box:hover[\s\S]*?\{[\s\S]*?\}/g, '');
css = css.replace(/\.card-icon[\s\S]*?\{[\s\S]*?\}/g, ''); // Will rewrite .card-icon

const cardHoverStyles = `
/* Premium SaaS Card Hover Logic */
.card, .block-card, .price-card, .simulator-card, .info-card, .highlight-box {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, box-shadow;
  cursor: pointer;
  position: relative;
}

.card:hover, .block-card:hover, .price-card:hover, .simulator-card:hover, .info-card:hover, .highlight-box:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(9, 234, 180, 0.15);
  background: rgba(255, 255, 255, 0.05);
}

[data-theme="light"] .card:hover, [data-theme="light"] .block-card:hover, [data-theme="light"] .price-card:hover, [data-theme="light"] .highlight-box:hover {
  box-shadow: 0 20px 40px rgba(5, 150, 105, 0.15);
  background: rgba(0, 0, 0, 0.02);
}

.card-icon, .icon {
  display: inline-block;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.card:hover .card-icon, .block-card:hover .card-icon, .price-card:hover .card-icon, .info-card:hover .card-icon, .card:hover .icon, .highlight-box:hover .icon {
  transform: scale(1.1) rotate(3deg);
}

.card-icon {
  font-size: 32px;
  margin-bottom: 16px;
}
`;

css += cardHoverStyles;
fs.writeFileSync(cssPath, css);

console.log('Cards updated.');
