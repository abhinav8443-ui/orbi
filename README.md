# 🎵 Orbi Music Player (Spotify Clone for Personal Use)

A dark-themed Spotify-inspired music player built with React, Vite, Tailwind CSS, and Web Audio API. Designed for personal music listening with offline persistence via IndexedDB, custom in-app track & playlist editing, synced lyrics, and an audio equalizer.

---

## ⚡ Quick Start

### Option 1: One-Click Windows Launcher
Simply double-click:
```bat
start-player.bat
```
This automatically starts the server and opens `http://localhost:5173` in your default browser.

### Option 2: Command Line
```powershell
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## ✨ Features

### 🎧 Audio & Playback
- **Web Audio API Engine**: High-fidelity HTML5 audio element + AudioContext graph.
- **5-Band Graphic Equalizer**: Adjust Sub Bass (60Hz), Bass (250Hz), Mid (1kHz), Upper Mid (4kHz), and Treble (16kHz). Includes presets: *Flat, Bass Boost, Treble Boost, Electronic, Rock, Acoustic, Vocal Boost, Chill*.
- **Real-Time Spectrum Visualizer**: Animated canvas audio frequency analyzer that reacts to your music.
- **MediaSession API Integration**: Hardware media keys (Play/Pause, Next, Prev) and Windows lock screen / notification widget support.
- **Shuffle & Repeat**: Modes for Repeat Off, Repeat All, Repeat One, and true randomized shuffle.
- **Guaranteed Playback**: Includes high quality preloaded royalty-free tracks + Web Audio procedural synthesis fallback so music plays anywhere.

### 📝 In-App Customization ("Change That In App")
- **Drag & Drop Upload**: Drag audio files (`.mp3`, `.wav`, `.flac`, `.ogg`, `.m4a`, `.aac`) directly into the browser window anytime!
- **Automatic Metadata Extraction**: Automatically parses ID3v2 tags (Song title, Artist, Album, embedded APIC Album Art) from uploaded MP3s.
- **In-App Song Details & Lyrics Editor**: Click `...` on any song -> **Edit Details & Lyrics** to update title, artist, album, genre, year, custom cover artwork URL/image, and synced LRC lyrics.
- **Playlist Creator & Editor**: Create custom playlists, click cover art to change photo, rename title, add descriptions, and organize tracks.
- **Permanent Offline Persistence**: Audio files and metadata are stored in browser **IndexedDB**, surviving browser restarts without cloud accounts or limits.
- **Accent Color Themes**: Customize the theme color between *Spotify Green, Neon Purple, Electric Cyan, Sunset Amber, Ruby Crimson, and Rose Pink*.
- **Library Backup & Restore**: Export your entire library metadata and playlists as a JSON file or restore from a previous backup.

### 🎤 Synchronized Scrolling Lyrics
- Press `L` or click the microphone icon in the player bar.
- Synced LRC lyrics highlight line-by-line as the song plays with karaoke glow.
- Click any lyric line to instantly jump playback to that timestamp.

### ⌨️ Keyboard Shortcuts
| Key | Action |
|---|---|
| `Space` | Play / Pause |
| `←` / `→` | Seek backward / forward 5 seconds |
| `Ctrl + ←` / `Ctrl + →` | Previous / Next track |
| `↑` / `↓` | Volume up / down 5% |
| `M` | Mute / Unmute |
| `L` | Toggle Synced Lyrics View |
| `Q` | Toggle Up Next Queue Drawer |
