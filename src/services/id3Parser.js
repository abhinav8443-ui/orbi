// Client-side ID3v2 tag and APIC album cover extractor for MP3 / audio files

export async function parseAudioFile(file) {
  return new Promise((resolve) => {
    // Basic fallback metadata from filename
    const cleanName = file.name.replace(/\.[^/.]+$/, '');
    let title = cleanName;
    let artist = 'Unknown Artist';
    let album = 'Local Collection';

    // Check if filename has "Artist - Title" format
    if (cleanName.includes(' - ')) {
      const parts = cleanName.split(' - ');
      artist = parts[0].trim();
      title = parts.slice(1).join(' - ').trim();
    }

    const result = {
      title,
      artist,
      album,
      duration: 0,
      coverArt: null,
    };

    // 1. Get accurate duration using HTML5 Audio element
    const tempUrl = URL.createObjectURL(file);
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.src = tempUrl;

    const cleanupAudio = () => {
      URL.revokeObjectURL(tempUrl);
      audio.src = '';
    };

    audio.onloadedmetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        result.duration = Math.round(audio.duration);
      }
      cleanupAudio();
      readID3Tags();
    };

    audio.onerror = () => {
      cleanupAudio();
      readID3Tags();
    };

    // 2. Read first 512KB for ID3v2 tags
    function readID3Tags() {
      const reader = new FileReader();
      const sliceSize = Math.min(file.size, 512 * 1024);
      const slice = file.slice(0, sliceSize);

      reader.onload = function(e) {
        try {
          const buffer = e.target.result;
          const view = new DataView(buffer);

          // Check for "ID3" identifier at beginning
          if (
            view.getUint8(0) === 0x49 && // 'I'
            view.getUint8(1) === 0x44 && // 'D'
            view.getUint8(2) === 0x33    // '3'
          ) {
            const majorVersion = view.getUint8(3); // 3 for ID3v2.3, 4 for ID3v2.4
            // const flags = view.getUint8(5);
            // Synchsafe integer for header size
            const size = (
              ((view.getUint8(6) & 0x7f) << 21) |
              ((view.getUint8(7) & 0x7f) << 14) |
              ((view.getUint8(8) & 0x7f) << 7) |
              (view.getUint8(9) & 0x7f)
            );

            let offset = 10;
            const maxOffset = Math.min(size + 10, buffer.byteLength - 10);

            while (offset < maxOffset) {
              const frameId = String.fromCharCode(
                view.getUint8(offset),
                view.getUint8(offset + 1),
                view.getUint8(offset + 2),
                view.getUint8(offset + 3)
              );

              // Empty padding reached
              if (frameId.charCodeAt(0) === 0) break;

              let frameSize = 0;
              if (majorVersion === 4) {
                // Synchsafe in v2.4
                frameSize = (
                  ((view.getUint8(offset + 4) & 0x7f) << 21) |
                  ((view.getUint8(offset + 5) & 0x7f) << 14) |
                  ((view.getUint8(offset + 6) & 0x7f) << 7) |
                  (view.getUint8(offset + 7) & 0x7f)
                );
              } else {
                // Big endian 32-bit int in v2.3
                frameSize = view.getUint32(offset + 4);
              }

              if (frameSize <= 0 || offset + 10 + frameSize > buffer.byteLength) {
                break;
              }

              const frameDataOffset = offset + 10;

              // Extract text frames: TIT2 (Title), TPE1 (Artist), TALB (Album)
              if (frameId === 'TIT2') {
                const text = decodeTextFrame(view, frameDataOffset, frameSize);
                if (text) result.title = text;
              } else if (frameId === 'TPE1') {
                const text = decodeTextFrame(view, frameDataOffset, frameSize);
                if (text) result.artist = text;
              } else if (frameId === 'TALB') {
                const text = decodeTextFrame(view, frameDataOffset, frameSize);
                if (text) result.album = text;
              } else if (frameId === 'APIC') {
                // Attached Picture (Album Art)
                const coverUrl = decodePictureFrame(buffer, frameDataOffset, frameSize);
                if (coverUrl) result.coverArt = coverUrl;
              }

              offset += 10 + frameSize;
            }
          }
        } catch (err) {
          console.warn('ID3 parse warning:', err);
        }

        resolve(result);
      };

      reader.onerror = () => resolve(result);
      reader.readAsArrayBuffer(slice);
    }
  });
}

function decodeTextFrame(view, offset, size) {
  try {
    const encoding = view.getUint8(offset);
    const bytes = new Uint8Array(view.buffer, offset + 1, size - 1);
    
    if (encoding === 0) {
      // ISO-8859-1
      let str = '';
      for (let i = 0; i < bytes.length; i++) {
        if (bytes[i] === 0) break;
        str += String.fromCharCode(bytes[i]);
      }
      return str.trim();
    } else if (encoding === 1 || encoding === 2) {
      // UTF-16
      const decoder = new TextDecoder('utf-16');
      return decoder.decode(bytes).replace(/\0/g, '').trim();
    } else if (encoding === 3) {
      // UTF-8
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(bytes).replace(/\0/g, '').trim();
    }
  } catch {
    return null;
  }
  return null;
}

function decodePictureFrame(buffer, offset, size) {
  try {
    const view = new DataView(buffer, offset, size);
    // const encoding = view.getUint8(0);
    let p = 1;

    // Read MIME type (null-terminated ASCII)
    let mimeType = '';
    while (p < size && view.getUint8(p) !== 0) {
      mimeType += String.fromCharCode(view.getUint8(p));
      p++;
    }
    p++; // Skip null byte
    if (!mimeType) mimeType = 'image/jpeg';

    // Picture type (1 byte, e.g. 3 = Cover front)
    p++;

    // Description (terminated by null, may be double null if UTF-16)
    while (p < size && view.getUint8(p) !== 0) {
      p++;
    }
    p++; // Skip null byte

    // The remaining bytes are the raw image data!
    const imageBytes = new Uint8Array(buffer, offset + p, size - p);
    if (imageBytes.length > 0) {
      const blob = new Blob([imageBytes], { type: mimeType });
      return URL.createObjectURL(blob);
    }
  } catch (err) {
    console.warn('Failed to parse APIC image frame:', err);
  }
  return null;
}
