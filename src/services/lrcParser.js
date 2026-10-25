// Synced LRC & Plaintext Lyrics Parser

export function parseLyrics(lyricsText, duration = 180) {
  if (!lyricsText || typeof lyricsText !== 'string') return [];

  const lines = lyricsText.trim().split('\n');
  const parsed = [];
  const timeRegex = /\[(\d{2}):(\d{2})(?:\.(\d{2,3}))?\]/g;

  let hasTimestamps = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const matches = [...trimmed.matchAll(timeRegex)];
    if (matches.length > 0) {
      hasTimestamps = true;
      const text = trimmed.replace(timeRegex, '').trim();
      for (const match of matches) {
        const mins = parseInt(match[1], 10);
        const secs = parseInt(match[2], 10);
        const millis = match[3] ? parseInt(match[3].padEnd(3, '0').slice(0, 3), 10) : 0;
        const totalTime = mins * 60 + secs + millis / 1000;
        parsed.push({ time: totalTime, text });
      }
    } else if (!hasTimestamps) {
      // Collect as plain line
      parsed.push({ time: 0, text: trimmed });
    }
  }

  // If no timestamps were found, evenly interpolate timestamps across the track duration
  if (!hasTimestamps && parsed.length > 0) {
    const interval = Math.max(2, (duration * 0.85) / parsed.length);
    return parsed.map((item, idx) => ({
      time: Math.round((5 + idx * interval) * 10) / 10,
      text: item.text,
    }));
  }

  // Sort by timestamp
  return parsed.sort((a, b) => a.time - b.time);
}

// Convert parsed lines back to LRC string format for saving
export function formatLRC(parsedLines) {
  if (!Array.isArray(parsedLines)) return '';
  return parsedLines.map(line => {
    const mins = Math.floor(line.time / 60).toString().padStart(2, '0');
    const secs = Math.floor(line.time % 60).toString().padStart(2, '0');
    const ms = Math.floor((line.time % 1) * 100).toString().padStart(2, '0');
    return `[${mins}:${secs}.${ms}] ${line.text}`;
  }).join('\n');
}
