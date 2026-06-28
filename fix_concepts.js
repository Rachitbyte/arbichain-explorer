const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'concepts.html');

let html = fs.readFileSync(file, 'utf8');

// The problematic structure looks like this:
// <div class="concept-row"><svg class="svg-concept-icon" ...></svg> <span class="label">Smart Contracts:</span> <i data-lucide="x-circle" class="inline-icon danger"></i> Not supported</div>

// Replace the Bitcoin one
html = html.replace(
  '<div class="concept-row"><svg class="svg-concept-icon" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> <span class="label">Smart Contracts:</span> <i data-lucide="x-circle" class="inline-icon danger"></i> Not supported</div>',
  '<div class="concept-row"><span class="label" style="display:flex;align-items:center;margin-bottom:6px;"><svg class="svg-concept-icon" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Smart Contracts:</span> <span style="display:flex;align-items:center;gap:6px;"><i data-lucide="x-circle" class="inline-icon danger"></i> Not supported</span></div>'
);

// Replace the Ethereum one
html = html.replace(
  '<div class="concept-row"><svg class="svg-concept-icon" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> <span class="label">Smart Contracts:</span> <i data-lucide="check-circle-2" class="inline-icon success"></i> Core feature</div>',
  '<div class="concept-row"><span class="label" style="display:flex;align-items:center;margin-bottom:6px;"><svg class="svg-concept-icon" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> Smart Contracts:</span> <span style="display:flex;align-items:center;gap:6px;"><i data-lucide="check-circle-2" class="inline-icon success"></i> Core feature</span></div>'
);

fs.writeFileSync(file, html);
console.log('Fixed Smart Contracts icons in concepts.html');
