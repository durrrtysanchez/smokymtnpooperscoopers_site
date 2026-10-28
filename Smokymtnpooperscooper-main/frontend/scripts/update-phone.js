const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'src');
const oldPhone = '865-343-1142';
const newPhone = '865-601-2002';

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!/\.(js|jsx|ts|tsx|html|css)$/.test(entry.name)) continue;

    const source = fs.readFileSync(fullPath, 'utf8');
    const updated = source.split(oldPhone).join(newPhone);
    if (updated !== source) fs.writeFileSync(fullPath, updated);
  }
}

walk(root);
console.log(`Phone number set to ${newPhone} for the frontend build.`);
