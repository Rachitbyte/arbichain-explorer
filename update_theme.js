const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'styles.css');
let css = fs.readFileSync(file, 'utf-8');

const rootStr = `:root {
  --bg-primary:    #0d0d14;   /* deep space black — page background */
  --bg-surface:    #13131f;   /* card / section background */
  --bg-elevated:   #1a1a2e;   /* hover states, elevated cards */
  --accent-cyan:   #09eab4;   /* primary accent — buttons, highlights, borders */
  --accent-indigo: #6366f1;   /* secondary accent — badges, tags */
  --accent-glow:   rgba(9, 234, 180, 0.15); /* glow effect for cards */
  --text-primary:  #f0f0ff;   /* main text */
  --text-muted:    #7a7990;   /* subtext, labels */
  --text-heading:  #ffffff;   /* headings */
  --border:        #1e1e30;   /* card borders */
  --success:       #22c55e;   /* positive price change */
  --danger:        #ef4444;   /* negative price change */
  --valid-block:   #09eab4;   /* valid block indicator */
  --invalid-block: #ef4444;   /* invalid block indicator */
}`;

const newRoot = `:root {
  --bg-primary:    #0d0d14;
  --bg-surface:    #13131f;
  --bg-elevated:   #1a1a2e;
  --accent-cyan:   #09eab4;
  --accent-indigo: #6366f1;
  --accent-glow:   rgba(9, 234, 180, 0.15);
  --text-primary:  #f0f0ff;
  --text-muted:    #7a7990;
  --text-heading:  #ffffff;
  --border:        #1e1e30;
  --success:       #22c55e;
  --danger:        #ef4444;
  --valid-block:   #09eab4;
  --invalid-block: #ef4444;
  --glass-bg: rgba(255, 255, 255, 0.02);
  --glass-border: rgba(255, 255, 255, 0.05);
  --glass-glow: rgba(255, 255, 255, 0.06);
  --ambient-color: rgba(99, 102, 241, 0.08);
  --th-bg: rgba(9, 234, 180, 0.1);
  --tr-even: rgba(255, 255, 255, 0.02);
  --coin-icon-bg: rgba(255, 255, 255, 0.05);
  --error-bg: rgba(239, 68, 68, 0.08);
  --warning-bg: rgba(239, 68, 68, 0.1);
  --btn-text: #0d0d14;
  --badge-bg: rgba(99, 102, 241, 0.15);
  --badge-border: rgba(99, 102, 241, 0.3);
  --success-bg: rgba(9, 234, 180, 0.03);
  --nav-bg: rgba(13, 13, 20, 0.4);
}
[data-theme="light"] {
  --bg-primary:    #f8fafc;
  --bg-surface:    #ffffff;
  --bg-elevated:   #f1f5f9;
  --accent-cyan:   #059669; 
  --accent-indigo: #4f46e5;
  --accent-glow:   rgba(5, 150, 105, 0.15);
  --text-primary:  #334155;
  --text-muted:    #64748b;
  --text-heading:  #0f172a;
  --border:        #e2e8f0;
  --success:       #16a34a;
  --danger:        #dc2626;
  --valid-block:   rgba(5, 150, 105, 0.5);
  --invalid-block: #dc2626;
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.05);
  --glass-glow: rgba(0, 0, 0, 0.03);
  --ambient-color: rgba(79, 70, 229, 0.05);
  --th-bg: rgba(5, 150, 105, 0.05);
  --tr-even: rgba(0, 0, 0, 0.02);
  --coin-icon-bg: rgba(0, 0, 0, 0.04);
  --error-bg: rgba(220, 38, 38, 0.05);
  --warning-bg: rgba(220, 38, 38, 0.05);
  --btn-text: #ffffff;
  --badge-bg: rgba(79, 70, 229, 0.1);
  --badge-border: rgba(79, 70, 229, 0.2);
  --success-bg: rgba(5, 150, 105, 0.03);
  --nav-bg: rgba(255, 255, 255, 0.6);
}
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
.card, .block-card, .navbar, .btn-primary, .btn-outline, .highlight-box, .insight-box, .table-container, table, th, td, .concept-col, .col-header, .concept-row, .tagline, .example-box, .warning-box, .error-box, .step, .simulator-insight, input, .ambient-glow, .badge {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}`;

css = css.replace(rootStr, newRoot);

css = css.replace(/rgba\(99,\s*102,\s*241,\s*0\.08\)/g, 'var(--ambient-color)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.02\)/g, 'var(--glass-bg)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.05\)/g, 'var(--glass-border)');
css = css.replace(/rgba\(255,\s*255,\s*255,\s*0\.06\)/g, 'var(--glass-glow)');
css = css.replace(/rgba\(99,\s*102,\s*241,\s*0\.15\)/g, 'var(--badge-bg)');
css = css.replace(/rgba\(99,\s*102,\s*241,\s*0\.3\)/g, 'var(--badge-border)');
css = css.replace(/rgba\(13,\s*13,\s*20,\s*0\.4\)/g, 'var(--nav-bg)');
css = css.replace(/rgba\(9,\s*234,\s*180,\s*0\.1\)/g, 'var(--th-bg)');
css = css.replace(/rgba\(9,\s*234,\s*180,\s*0\.03\)/g, 'var(--success-bg)');
css = css.replace(/rgba\(239,\s*68,\s*68,\s*0\.03\)/g, 'var(--error-bg)');
css = css.replace(/rgba\(239,\s*68,\s*68,\s*0\.08\)/g, 'var(--error-bg)');
css = css.replace(/rgba\(239,\s*68,\s*68,\s*0\.1\)/g, 'var(--warning-bg)');
css = css.replace(/color:\s*#0d0d14;/g, 'color: var(--btn-text);');

css += `
/* Theme Toggle */
.theme-toggle {
  background: transparent;
  border: none;
  color: var(--text-heading);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 36px;
  height: 36px;
  transition: background 0.2s;
}
.theme-toggle:hover {
  background: var(--glass-bg);
}
.theme-toggle svg {
  position: absolute;
  transition: transform 0.4s ease, opacity 0.4s ease;
}
[data-theme="light"] .sun-icon { transform: rotate(90deg); opacity: 0; }
[data-theme="light"] .moon-icon { transform: rotate(0deg); opacity: 1; }
:root:not([data-theme="light"]) .sun-icon { transform: rotate(0deg); opacity: 1; }
:root:not([data-theme="light"]) .moon-icon { transform: rotate(-90deg); opacity: 0; }
`;

fs.writeFileSync(file, css);
console.log('Theme CSS injected!');
