import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec, spawn } from 'child_process';
import os from 'os';
import QRCode from 'qrcode';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5173;
const DIST_DIR = path.join(__dirname, 'dist');
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.m4a': 'audio/mp4',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.webm': 'audio/webm',
  '.flac': 'audio/flac',
  '.apk': 'application/vnd.android.package-archive',
};

function getNetworkIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Scan public/music and public/audio for dropped local songs
function scanLocalMusic() {
  const musicDirs = [
    path.join(PUBLIC_DIR, 'music'),
    path.join(DIST_DIR, 'music'),
    path.join(PUBLIC_DIR, 'audio'),
    path.join(DIST_DIR, 'audio')
  ];

  const tracks = [];
  const seenIds = new Set();
  const validExts = new Set(['.mp3', '.m4a', '.wav', '.ogg', '.flac']);

  for (const dir of musicDirs) {
    if (!fs.existsSync(dir)) continue;

    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (!validExts.has(ext)) continue;

        const baseName = path.basename(file, ext);
        const id = 'local-' + baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        if (seenIds.has(id)) continue;
        seenIds.add(id);

        let artist = 'Local Artist';
        let title = baseName;

        if (baseName.includes(' - ')) {
          const parts = baseName.split(' - ');
          artist = parts[0].trim();
          title = parts.slice(1).join(' - ').trim();
        }

        const isMusicDir = dir.includes('music');
        const urlPrefix = isMusicDir ? '/music/' : '/audio/';

        tracks.push({
          id,
          title,
          artist,
          album: 'Local Folder Vault',
          genre: 'Local Audio',
          year: new Date().getFullYear(),
          duration: 180,
          coverUrl: '/covers/yeat-money-so-big.jpg',
          audioUrl: urlPrefix + encodeURIComponent(file),
          filename: file,
          lyrics: `[00:00.00] ${title} - ${artist}\n[00:05.00] Playing from your local music folder`
        });
      }
    } catch (err) {
      console.warn('Error reading directory:', dir, err.message);
    }
  }

  return tracks;
}

// Serve static file with HTTP Range support for audio seeking & APK downloads
function serveFile(req, res, filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA routing
      const indexPath = path.join(DIST_DIR, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Bypass-Tunnel-Reminder': '1'
        });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const total = stats.size;

    const baseHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Bypass-Tunnel-Reminder': '1',
      'Accept-Ranges': 'bytes'
    };

    if (ext === '.apk') {
      baseHeaders['Content-Disposition'] = 'attachment; filename="Orbi-Music.apk"';
    }

    // Support HEAD method (e.g., for audio preflight & metadata checks)
    if (req.method === 'HEAD') {
      res.writeHead(200, {
        ...baseHeaders,
        'Content-Length': total,
        'Content-Type': contentType,
      });
      res.end();
      return;
    }

    // Support HTTP Range requests for instant audio/video seeking
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const partialStart = parts[0];
      const partialEnd = parts[1];

      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
      const chunkSize = (end - start) + 1;

      const fileStream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        ...baseHeaders,
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Content-Length': chunkSize,
        'Content-Type': contentType,
      });
      fileStream.pipe(res);
    } else {
      res.writeHead(200, {
        ...baseHeaders,
        'Content-Length': total,
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400',
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
}

function startServer(port) {
  const server = http.createServer(async (req, res) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Bypass-Tunnel-Reminder': '1'
      });
      res.end();
      return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // API ENDPOINT 1: Server Info (Wi-Fi & Local IP)
    if (pathname === '/api/server-info') {
      const networkIp = getNetworkIp();
      const info = {
        localIp: networkIp,
        localUrl: `http://${networkIp}:${port}`,
        localhostUrl: `http://localhost:${port}`,
        port
      };
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Bypass-Tunnel-Reminder': '1'
      });
      res.end(JSON.stringify(info));
      return;
    }

    // API ENDPOINT 2: Local Music Folder Scanner (/public/music and /public/audio)
    if (pathname === '/api/local-music') {
      const tracks = scanLocalMusic();
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Bypass-Tunnel-Reminder': '1'
      });
      res.end(JSON.stringify({ count: tracks.length, tracks }));
      return;
    }

    // API ENDPOINT 3: Dynamic Scannable QR Code for Phone Access
    if (pathname === '/api/qr-code') {
      try {
        const networkIp = getNetworkIp();
        const targetUrl = parsedUrl.searchParams.get('url') || `http://${networkIp}:${port}`;
        const svg = await QRCode.toString(targetUrl, {
          type: 'svg',
          margin: 1,
          color: { dark: '#14b8a6', light: '#06191f' }
        });
        res.writeHead(200, {
          'Content-Type': 'image/svg+xml',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache'
        });
        res.end(svg);
      } catch (err) {
        res.writeHead(500);
        res.end(err.message);
      }
      return;
    }

    // Normalize path
    if (pathname === '/') {
      pathname = '/index.html';
    }

    // Check in DIST_DIR first, then PUBLIC_DIR
    let filePath = path.join(DIST_DIR, pathname);

    if (!fs.existsSync(filePath)) {
      const publicPath = path.join(PUBLIC_DIR, pathname);
      if (fs.existsSync(publicPath)) {
        filePath = publicPath;
      }
    }

    // Audio fallback: If a requested audio file is still downloading or not on disk yet, fallback to a working track
    if (pathname.startsWith('/audio/') && !fs.existsSync(filePath)) {
      const fallbackAudio = path.join(PUBLIC_DIR, 'audio', 'sm-luka-chuppi.m4a');
      if (fs.existsSync(fallbackAudio)) {
        filePath = fallbackAudio;
      }
    }

    // Cover art fallback: If a specific cover is missing, map to corresponding album cover
    if (pathname.startsWith('/covers/') && !fs.existsSync(filePath)) {
      if (pathname.includes('bayaan')) {
        filePath = path.join(PUBLIC_DIR, 'covers', 'sm-bayaan.jpg');
      } else if (pathname.includes('lunch')) {
        filePath = path.join(PUBLIC_DIR, 'covers', 'sm-lunch-break.jpg');
      } else if (pathname.includes('kshma')) {
        filePath = path.join(PUBLIC_DIR, 'covers', 'sm-kshma.webp');
      } else {
        filePath = path.join(PUBLIC_DIR, 'covers', 'sm-nayaab.jpg');
      }
    }

    // SPA fallback
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    serveFile(req, res, filePath);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, '0.0.0.0', async () => {
    const localUrl = `http://localhost:${port}`;
    const networkIp = getNetworkIp();
    const networkUrl = `http://${networkIp}:${port}`;

    console.log('');
    console.log('╔════════════════════════════════════════════════════════════════════════╗');
    console.log('║                   ORBI MUSIC PLAYER (OFFLINE VAULT)                    ║');
    console.log('╠════════════════════════════════════════════════════════════════════════╣');
    console.log(`║   > Local PC:       ${localUrl.padEnd(50)} ║`);
    console.log(`║   > Phone / Wi-Fi:  ${networkUrl.padEnd(50)} ║`);
    console.log('║                                                                        ║');
    console.log('║   1. Connect phone to Wi-Fi: Open Phone/Wi-Fi link or scan QR code    ║');
    console.log('║   2. Tap "Install Orbi App" -> Tap "Save All Songs to Phone"           ║');
    console.log('║   3. Laptop can be OFF! Plays 100% OFFLINE anywhere with no internet   ║');
    console.log('╚════════════════════════════════════════════════════════════════════════╝');
    console.log('');

    // Open browser
    exec(`start "" "${localUrl}"`, () => {});
  });
}

startServer(PORT);
