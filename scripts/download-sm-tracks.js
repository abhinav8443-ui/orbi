import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_AUDIO = path.join(ROOT_DIR, 'public', 'audio');
const DIST_AUDIO = path.join(ROOT_DIR, 'dist', 'audio');

if (!fs.existsSync(PUBLIC_AUDIO)) fs.mkdirSync(PUBLIC_AUDIO, { recursive: true });
if (!fs.existsSync(DIST_AUDIO)) fs.mkdirSync(DIST_AUDIO, { recursive: true });

const TRACKS = [
  // Nayaab (2022)
  { id: 'sm-toh-kya', q: 'Seedhe Maut Toh Kya official audio' },
  { id: 'sm-choti-soch', q: 'Seedhe Maut Choti Soch official audio' },
  { id: 'sm-godkod', q: 'Seedhe Maut Godkod official audio' },
  { id: 'sm-khoj', q: 'Seedhe Maut Khoj official audio' },
  { id: 'sm-dum-ghutte', q: 'Seedhe Maut Dum Ghutte official audio' },
  { id: 'sm-marne-ke-baad-bhi', q: 'Seedhe Maut Marne Ke Baad Bhi official audio' },
  { id: 'sm-ghar-pe-aao', q: 'Seedhe Maut Ghar Pe Aao official audio' },
  { id: 'sm-hoshiyaar', q: 'Seedhe Maut Hoshiyaar official audio' },
  { id: 'sm-rajdhani', q: 'Seedhe Maut Rajdhani official audio' },
  { id: 'sm-anaadi', q: 'Seedhe Maut Anaadi official audio' },
  { id: 'sm-chiri-udd', q: 'Seedhe Maut Chiri Udd Kaa Udd official audio' },
  { id: 'sm-gandi-soch', q: 'Seedhe Maut Gandi Soch official audio' },

  // Lunch Break (2023)
  { id: 'sm-brand-new', q: 'Seedhe Maut Brand New Sikander Kahlon official audio' },
  { id: 'sm-champion', q: 'Seedhe Maut Champion Lil Bhavi official audio' },
  { id: 'sm-off-beat', q: 'Seedhe Maut Off Beat official audio' },
  { id: 'sm-kavi-kehna', q: 'Seedhe Maut Kavi Kehna Chahte Hain official audio' },
  { id: 'sm-dikkat', q: 'Seedhe Maut Dikkat official audio' },
  { id: 'sm-first-place', q: 'Seedhe Maut First Place official audio' },
  { id: 'sm-peace-of-mind', q: 'Seedhe Maut Peace of Mind official audio' },
  { id: 'sm-taakat', q: 'Seedhe Maut Taakat Sonny Chimienti official audio' },
  { id: 'sm-swah', q: 'Seedhe Maut Swah Badshah official audio' },
  { id: 'sm-fann', q: 'Seedhe Maut Fann Raga official audio' },
  { id: 'sm-asal-g', q: 'Seedhe Maut Asal G Faris Shafi official audio' },
  { id: 'sm-naam-kaam-sheher', q: 'Seedhe Maut Naam Kaam Sheher Ab 17 official audio' },
  { id: 'sm-joint-in-the-booth', q: 'Seedhe Maut Joint In The Booth Rawal Bharg official audio' },
  { id: 'sm-jua', q: 'Seedhe Maut Jua official audio' },
  { id: 'sm-pain', q: 'Seedhe Maut Pain official audio' },
  { id: 'sm-idk', q: 'Seedhe Maut IDK official audio' },
  { id: 'sm-khoon', q: 'Seedhe Maut Khoon official audio' },
  { id: 'sm-chidiya-udd', q: 'Seedhe Maut Chidiya Udd Ritviz official audio' },
  { id: 'sm-akatsuki', q: 'Seedhe Maut Akatsuki Rebel 7 official audio' },
  { id: 'sm-keeda', q: 'Seedhe Maut Keeda official audio' },
  { id: 'sm-focus', q: 'Seedhe Maut Focus official audio' },
  { id: 'sm-baat-aisi-hai', q: 'Seedhe Maut Baat Aisi Hai official audio' },
  { id: 'sm-tofa', q: 'Seedhe Maut Tofa official audio' },
  { id: 'sm-w', q: 'Seedhe Maut W official audio' },
  { id: 'sm-pushpak-vimaan', q: 'Seedhe Maut Pushpak Vimaan official audio' },
  { id: 'sm-lunch-break', q: 'Seedhe Maut Lunch Break official audio' },
  { id: 'sm-fall-off', q: 'Seedhe Maut Fall Off official audio' },
  { id: 'sm-kavi', q: 'Seedhe Maut Kavi official audio' },

  // Bayaan (2018)
  { id: 'sm-gehraiyaan', q: 'Seedhe Maut Gehraiyaan official audio' },
  { id: 'sm-meri-baggi', q: 'Seedhe Maut Meri Baggi official audio' },
  { id: 'sm-shaktimaan', q: 'Seedhe Maut Shaktimaan official audio' },
  { id: 'sm-dehshat', q: 'Seedhe Maut Dehshat official audio' },
  { id: 'sm-edan', q: 'Seedhe Maut Edan official audio' },
  { id: 'sm-keh-chuka', q: 'Seedhe Maut Keh Chuka official audio' },
  { id: 'sm-mazzak', q: 'Seedhe Maut Mazzak official audio' },
  { id: 'sm-uss-din', q: 'Seedhe Maut Uss Din official audio' },
  { id: 'sm-kyurev', q: 'Seedhe Maut Kyurev official audio' },
  { id: 'sm-gandi-aulaad', q: 'Seedhe Maut Gandi Aulaad official audio' },

  // Kshma (2024 EP)
  { id: 'sm-kshma', q: 'Seedhe Maut Kshma official audio' },
  { id: 'sm-bajenge', q: 'Seedhe Maut Bajenge official audio' },
  { id: 'sm-nazarbattu', q: 'Seedhe Maut Nazarbattu official audio' },
  { id: 'sm-bandana-gang', q: 'Seedhe Maut Bandana Gang official audio' },

  // EPs & Cult Hits
  { id: 'sm-ball', q: 'Seedhe Maut Ball official audio' },
  { id: 'sm-seedhe-maut-anthem', q: 'Seedhe Maut Anthem official audio' },
  { id: 'sm-do-guna', q: 'Seedhe Maut Do Guna official audio' },
  { id: 'sm-kranti', q: 'Seedhe Maut Kranti official audio' },
  { id: 'sm-nawazuddin', q: 'Seedhe Maut Nawazuddin official audio' },
  { id: 'sm-101', q: 'Seedhe Maut 101 official audio' },
  { id: 'sm-class-sikh-maut-2', q: 'Class-Sikh Maut Vol II Prabh Deep Seedhe Maut official audio' },
  { id: 'sm-dum-pishaach', q: 'Dum Pishaach Seedhe Maut Karan Kanchan official audio' },
  { id: 'sm-scalp-dem', q: 'Seedhe Maut Scalp Dem Delhi Sultanate official audio' },
  { id: 'sm-mmm', q: 'Seedhe Maut MMM official audio' },
  { id: 'sm-tour-sequence', q: 'Seedhe Maut Tour Sequence official audio' },
  { id: 'sm-nalla-freestyle', q: 'Seedhe Maut Nalla Freestyle official audio' },
  { id: 'sm-hausla', q: 'Seedhe Maut Hausla official audio' },
  { id: 'sm-bhoomi', q: 'Bhoomi Ritviz Seedhe Maut official audio' },
  { id: 'sm-besabar', q: 'Seedhe Maut Besabar official audio' },
  { id: 'sm-panaah', q: 'Seedhe Maut Panaah official audio' },
  { id: 'sm-mazza-aaya', q: 'Seedhe Maut Mazza Aaya official audio' },
  { id: 'sm-nevermind', q: 'Seedhe Maut Nevermind official audio' },
  { id: 'sm-kaanch-ke-ghar', q: 'Seedhe Maut Kaanch Ke Ghar official audio' },
  { id: 'sm-kohra', q: 'Seedhe Maut Kohra official audio' },
  { id: 'sm-natkhat', q: 'Seedhe Maut Natkhat official audio' },
  { id: 'sm-chini', q: 'Seedhe Maut Chini official audio' }
];

async function downloadTrack(track) {
  const destPath = path.join(PUBLIC_AUDIO, `${track.id}.m4a`);
  const distPath = path.join(DIST_AUDIO, `${track.id}.m4a`);

  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 500000) {
    if (!fs.existsSync(distPath)) fs.copyFileSync(destPath, distPath);
    console.log(`[SKIP] Already exists: ${track.id}`);
    return;
  }

  return new Promise((resolve) => {
    console.log(`[DOWNLOAD] Fetching ${track.id}: "${track.q}"...`);
    const args = [
      '-f', '140/bestaudio[ext=m4a]/bestaudio',
      '--no-playlist',
      '--no-warnings',
      '--socket-timeout', '15',
      '-o', destPath,
      `ytsearch1:${track.q}`
    ];

    const proc = spawn('yt-dlp', args, { stdio: 'inherit' });

    proc.on('close', (code) => {
      if (code === 0 && fs.existsSync(destPath)) {
        try {
          fs.copyFileSync(destPath, distPath);
          console.log(`[SUCCESS] Saved ${track.id} (${(fs.statSync(destPath).size / 1024 / 1024).toFixed(2)} MB)`);
        } catch (e) {}
      } else {
        console.warn(`[WARN] Failed to download ${track.id} (code ${code})`);
      }
      resolve();
    });

    proc.on('error', (err) => {
      console.warn(`[ERR] Error downloading ${track.id}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  console.log(`Starting Seedhe Maut discography download (${TRACKS.length} tracks)...`);
  for (let i = 0; i < TRACKS.length; i++) {
    const t = TRACKS[i];
    console.log(`\n--- Progress [${i + 1}/${TRACKS.length}] ---`);
    await downloadTrack(t);
  }
  console.log('\nAll Seedhe Maut tracks download finished!');
}

run();
