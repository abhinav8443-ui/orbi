import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_TRACKS, INITIAL_PLAYLISTS } from '../src/data/initialLibrary.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

let missingAudio = 0;
let missingCover = 0;

for (const t of INITIAL_TRACKS) {
  const audioPath = path.join(rootDir, 'public', t.audioUrl.replace(/^\//, ''));
  const coverPath = path.join(rootDir, 'public', t.coverUrl.replace(/^\//, ''));

  if (!fs.existsSync(audioPath)) {
    console.error('Missing Audio:', t.id, t.title, '->', audioPath);
    missingAudio++;
  }
  if (!fs.existsSync(coverPath)) {
    console.error('Missing Cover:', t.id, t.title, '->', coverPath);
    missingCover++;
  }
}

console.log(`\nVerification Summary:`);
console.log(`Total Tracks in Library: ${INITIAL_TRACKS.length}`);
console.log(`Total Playlists: ${INITIAL_PLAYLISTS.length}`);
console.log(`Missing Audio Files: ${missingAudio}`);
console.log(`Missing Cover Art Files: ${missingCover}`);
