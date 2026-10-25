import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('public/audio')
  .map(f => ({ name: f, sizeMb: (fs.statSync(path.join('public/audio', f)).size / (1024 * 1024)).toFixed(2) }))
  .sort((a, b) => b.sizeMb - a.sizeMb);

console.log('Top 5 largest audio files:');
console.log(files.slice(0, 5));
