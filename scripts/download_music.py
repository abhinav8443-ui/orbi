import json
import os
import re
import subprocess
import sys

TRACKS_TO_FETCH = [
    # Yeat Mainstream Hits
    {"id": "yeat-money-so-big", "title": "Monëy so big", "artist": "Yeat", "album": "Up 2 Më", "genre": "Rage / Trap", "query": "yeat money so big official audio"},
    {"id": "yeat-out-the-way", "title": "Out thë way", "artist": "Yeat", "album": "Lyfë", "genre": "Rage / Trap", "query": "yeat out the way official audio"},
    {"id": "yeat-idgaf", "title": "IDGAF (feat. Yeat)", "artist": "Drake, Yeat", "album": "For All The Dogs", "genre": "Hip-Hop / Rage", "query": "drake idgaf feat yeat audio"},
    {"id": "yeat-flawless", "title": "Flawlëss (feat. Lil Uzi Vert)", "artist": "Yeat, Lil Uzi Vert", "album": "Lyfë", "genre": "Rage / Trap", "query": "yeat flawless feat lil uzi vert audio"},
    {"id": "yeat-poppin", "title": "Poppin", "artist": "Yeat", "album": "2 Alivë", "genre": "Rage / Trap", "query": "yeat poppin official audio"},
    {"id": "yeat-get-busy", "title": "Gët Busy", "artist": "Yeat", "album": "Up 2 Më", "genre": "Rage / Trap", "query": "yeat get busy official audio"},
    {"id": "yeat-talk", "title": "Talk", "artist": "Yeat", "album": "Lyfë", "genre": "Rage / Trap", "query": "yeat talk official audio"},
    {"id": "yeat-breathe", "title": "Breathe", "artist": "Yeat", "album": "2093", "genre": "Cyberpunk / Trap", "query": "yeat breathe 2093 audio"},
    {"id": "yeat-sorry-bout-that", "title": "Sorry Bout That", "artist": "Yeat", "album": "4L", "genre": "Rage / Trap", "query": "yeat sorry bout that audio"},
    {"id": "yeat-nun-id-change", "title": "Nun id change", "artist": "Yeat", "album": "AftërLyfe", "genre": "Electronic Trap", "query": "yeat nun id change official audio"},

    # Esdeekid
    {"id": "esdeekid-4-me", "title": "4 me", "artist": "esdeekid", "album": "Singles", "genre": "Underground", "query": "esdeekid 4 me audio"},
    {"id": "esdeekid-phantom", "title": "phantom", "artist": "esdeekid", "album": "Singles", "genre": "Underground", "query": "esdeekid phantom audio"},
    {"id": "esdeekid-ritz", "title": "ritz", "artist": "esdeekid", "album": "Singles", "genre": "Underground", "query": "esdeekid ritz audio"},

    # Nettspend
    {"id": "nettspend-drankdrankdrank", "title": "drankdrankdrank", "artist": "nettspend", "album": "Singles", "genre": "Underground / Plugg", "query": "nettspend drankdrankdrank official audio"},
    {"id": "nettspend-that-one-song", "title": "that one song", "artist": "nettspend", "album": "Singles", "genre": "Underground / Plugg", "query": "nettspend that one song official audio"},
    {"id": "nettspend-shine-n-peace", "title": "shine n peace", "artist": "nettspend", "album": "Singles", "genre": "Underground", "query": "nettspend shine n peace official audio"},
    {"id": "nettspend-nothing-like-uuu", "title": "nothing like uuu", "artist": "nettspend", "album": "Singles", "genre": "Underground", "query": "nettspend nothing like uuu official audio"},

    # 2hollis
    {"id": "2hollis-poster-boy", "title": "poster boy", "artist": "2hollis", "album": "boy", "genre": "Electro-Trap", "query": "2hollis poster boy official audio"},
    {"id": "2hollis-jeans", "title": "jeans", "artist": "2hollis", "album": "boy", "genre": "Electro-Trap", "query": "2hollis jeans official audio"},
    {"id": "2hollis-crush", "title": "crush", "artist": "2hollis", "album": "boy", "genre": "Electro-Trap", "query": "2hollis crush official audio"},

    # OsamaSon
    {"id": "osamason-cts-v", "title": "cts-v", "artist": "OsamaSon", "album": "Flex Musix", "genre": "Underground / Rage", "query": "osamason cts-v official audio"},
    {"id": "osamason-blonde", "title": "blonde", "artist": "OsamaSon", "album": "Flex Musix", "genre": "Underground / Rage", "query": "osamason blonde official audio"},
    {"id": "osamason-kills", "title": "kills", "artist": "OsamaSon", "album": "Flex Musix", "genre": "Underground / Rage", "query": "osamason kills official audio"},
    {"id": "osamason-flxx", "title": "flxx", "artist": "OsamaSon", "album": "Flex Musix", "genre": "Underground / Rage", "query": "osamason flxx official audio"},

    # Nine Vicious
    {"id": "nine-vicious-demon-time", "title": "demon time", "artist": "nine vicious", "album": "Singles", "genre": "Underground", "query": "nine vicious demon time audio"},
]

OUTPUT_DIR = os.path.abspath("public/audio")
os.makedirs(OUTPUT_DIR, exist_ok=True)

results = []

for item in TRACKS_TO_FETCH:
    track_id = item["id"]
    output_filename = f"{track_id}.m4a"
    output_path = os.path.join(OUTPUT_DIR, output_filename)
    public_url = f"/audio/{output_filename}"

    print(f"\nProcessing: {item['artist']} - {item['title']} ...", flush=True)

    # Check if already downloaded
    if os.path.exists(output_path) and os.path.getsize(output_path) > 100000:
        print(f"Already downloaded: {output_path} ({os.path.getsize(output_path)} bytes)")
        item["audioUrl"] = public_url
        item["duration"] = 150
        item["coverArt"] = item.get("coverArt", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80")
        results.append(item)
        continue

    # Download with yt-dlp
    cmd = [
        sys.executable, "-m", "yt_dlp",
        "-f", "ba[ext=m4a]/ba[ext=webm]/ba",
        "--no-playlist",
        "--max-downloads", "1",
        "--print-json",
        "-o", output_path,
        f"ytsearch1:{item['query']}"
    ]

    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        metadata = {}
        for line in proc.stdout.splitlines():
            line = line.strip()
            if line.startswith("{") and line.endswith("}"):
                try:
                    metadata = json.loads(line)
                    break
                except:
                    pass

        duration = metadata.get("duration", 150)
        thumbnail = metadata.get("thumbnail", "")

        item["audioUrl"] = public_url
        item["duration"] = duration
        if thumbnail:
            item["coverArt"] = thumbnail
        else:
            item["coverArt"] = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"

        print(f"Successfully downloaded {item['title']} ({duration}s)", flush=True)
        results.append(item)
    except Exception as e:
        print(f"Error fetching {item['title']}: {e}", flush=True)

# Write results to JSON
output_json_path = os.path.abspath("src/data/downloadedTracks.json")
with open(output_json_path, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"\nCompleted! Saved {len(results)} tracks metadata to {output_json_path}")
