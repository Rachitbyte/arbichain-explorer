const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = ['index.html', 'concepts.html', 'prices.html', 'simulator.html'];
const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const lines = content.split('\n');
  console.log(`\n--- ${file} ---`);
  lines.forEach((line, i) => {
    if (emojiRegex.test(line)) {
      console.log(`${i + 1}: ${line.trim()}`);
    }
  });
});
