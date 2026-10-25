import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_AUDIO = path.join(ROOT_DIR, 'public', 'audio');
const DIST_AUDIO = path.join(ROOT_DIR, 'dist', 'audio');

const MISSING_TRACKS = [
  // Nettspend
  { id: 'nettspend-we-not-like-you', q: 'Nettspend We Not Like You' },
  { id: 'nettspend-2024-freestyle', q: 'Nettspend 2024 Freestyle' },
  { id: 'nettspend-fuck-swag', q: 'Nettspend Fuck Swag' },

  // esdeekid
  { id: 'esdeekid-lv-prada', q: 'esdeekid LV Prada' },
  { id: 'esdeekid-pluggnb-dreams', q: 'esdeekid 40 pluggnb' },

  // Nine Vicious
  { id: 'nine-vicious-carti-flow', q: 'Nine Vicious Carti Flow' },
  { id: 'nine-vicious-vicious', q: 'Nine Vicious Vicious' },
  { id: 'nine-vicious-nightmare', q: 'Nine Vicious Nightmare' },

  // Jaiyash
  { id: 'jaiyash-gawah', q: 'Jaiyash Gawah' },
  { id: 'jaiyash-sitaron-mein', q: 'Jaiyash Sitaron Mein' },
  { id: 'jaiyash-sabotage', q: 'Jaiyash Sabotage' },
  { id: 'jaiyash-ghar', q: 'Jaiyash Ghar' },

  // Arpit Bala
  { id: 'arpit-ik-kudi', q: 'Arpit Bala Ik Kudi' },
  { id: 'arpit-kya-tu-theek-hai', q: 'Arpit Bala Kya Tu Theek Hai' },
  { id: 'arpit-anveshna', q: 'Arpit Bala Anveshna' },

  // Skai
  { id: 'skai-skai-flow', q: 'Skai Flow' },
  { id: 'skai-late-night', q: 'Skai Late Night' },
  { id: 'skai-subzero', q: 'Skai Subzero' },
  { id: 'skai-visions', q: 'Skai Visions' },
  { id: 'skai-altitude', q: 'Skai Altitude' }
];

async function downloadTrack(track) {
  const destPath = path.join(PUBLIC_AUDIO, `${track.id}.m4a`);
  const distPath = path.join(DIST_AUDIO, `${track.id}.m4a`);

  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 100000) {
    if (!fs.existsSync(distPath)) fs.copyFileSync(destPath, distPath);
    console.log(`[SKIP] Already exists: ${track.id}`);
    return;
  }

  // Try SoundCloud first, then YouTube
  for (const prefix of ['scsearch1:', 'ytsearch1:']) {
    const success = await new Promise((resolve) => {
      console.log(`[DOWNLOADING] ${track.id} using ${prefix}...`);
      const args = [
        '--no-playlist',
        '--no-warnings',
        '--socket-timeout', '15',
        '-o', destPath,
        `${prefix}${track.q}`
      ];

      const proc = spawn('yt-dlp', args, { stdio: 'inherit' });

      proc.on('close', (code) => {
        if (code === 0 && fs.existsSync(destPath) && fs.statSync(destPath).size > 50000) {
          try {
            fs.copyFileSync(destPath, distPath);
            console.log(`[SUCCESS] Saved ${track.id} (${(fs.statSync(destPath).size / 1024 / 1024).toFixed(2)} MB)`);
          } catch (e) {}
          resolve(true);
        } else {
          resolve(false);
        }
      });

      proc.on('error', () => resolve(false));
    });

    if (success) return;
  }

  console.warn(`[WARN] Could not download ${track.id}`);
}

async function run() {
  console.log(`Starting SoundCloud/YouTube download of ${MISSING_TRACKS.length} tracks...`);
  for (let i = 0; i < MISSING_TRACKS.length; i++) {
    await downloadTrack(MISSING_TRACKS[i]);
  }
  console.log('All downloads finished!');
}

run();
