import os
import json
import urllib.request

JSON_PATH = os.path.abspath("src/data/downloadedTracks.json")
COVERS_DIR = os.path.abspath("public/covers")
os.makedirs(COVERS_DIR, exist_ok=True)

with open(JSON_PATH, "r", encoding="utf-8") as f:
    tracks = json.load(f)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

updated_tracks = []

for track in tracks:
    track_id = track["id"]
    cover_url = track.get("coverArt", "")
    dest_filename = f"{track_id}.jpg"
    dest_path = os.path.join(COVERS_DIR, dest_filename)
    local_url = f"/covers/{dest_filename}"

    print(f"Extracting official cover for: {track['artist']} - {track['title']} ...", flush=True)

    if cover_url:
        try:
            req = urllib.request.Request(cover_url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = resp.read()
                if len(data) > 1000:
                    with open(dest_path, "wb") as out_f:
                        out_f.write(data)
                    print(f"Saved official cover ({len(data)} bytes) to {dest_filename}")
                    track["coverArt"] = local_url
                else:
                    print(f"Cover response too small for {track_id}")
        except Exception as e:
            print(f"Failed to download {cover_url}: {e}")
            # Try fallback to standard hqdefault if maxres was 404
            if "maxresdefault" in cover_url:
                alt_url = cover_url.replace("maxresdefault.jpg", "hqdefault.jpg").replace("maxresdefault.webp", "hqdefault.jpg")
                try:
                    req_alt = urllib.request.Request(alt_url, headers=headers)
                    with urllib.request.urlopen(req_alt, timeout=15) as resp_alt:
                        data_alt = resp_alt.read()
                        with open(dest_path, "wb") as out_f:
                            out_f.write(data_alt)
                        print(f"Saved fallback official cover ({len(data_alt)} bytes) to {dest_filename}")
                        track["coverArt"] = local_url
                except Exception as e2:
                    print(f"Alt also failed: {e2}")

    updated_tracks.append(track)

# Save updated JSON
with open(JSON_PATH, "w", encoding="utf-8") as f:
    json.dump(updated_tracks, f, indent=2, ensure_ascii=False)

print("\nDone extracting all official song covers!")
