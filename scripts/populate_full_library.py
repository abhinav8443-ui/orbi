import os
import sys
import json
import subprocess
import urllib.request

TRACKS_TO_DOWNLOAD = [
    # --- SEEDHE MAUT ---
    {"id": "sm-luka-chuppi", "query": "Seedhe Maut Luka Chuppi official audio", "cover_name": "sm-nayaab.jpg"},
    {"id": "sm-nanchaku", "query": "Seedhe Maut Nanchaku MC Stan audio", "cover_name": "sm-nayaab.jpg"},
    {"id": "sm-khatta-flow", "query": "Seedhe Maut Khatta Flow KRSNA audio", "cover_name": "sm-lunch-break.jpg"},
    {"id": "sm-namastute", "query": "Seedhe Maut Namastute official audio", "cover_name": "sm-bayaan.jpg"},
    {"id": "sm-11k", "query": "Seedhe Maut 11K Lunch Break audio", "cover_name": "sm-lunch-break.jpg"},
    {"id": "sm-hola-amigo", "query": "Seedhe Maut Hola Amigo KRSNA audio", "cover_name": "sm-lunch-break.jpg"},
    {"id": "sm-tt", "query": "Seedhe Maut TT official audio", "cover_name": "sm-nayaab.jpg"},
    {"id": "sm-shutdown", "query": "Seedhe Maut Shutdown official audio", "cover_name": "sm-lunch-break.jpg"},
    {"id": "sm-batti", "query": "Seedhe Maut Batti official audio", "cover_name": "sm-nayaab.jpg"},
    {"id": "sm-maina", "query": "Seedhe Maut Maina official audio", "cover_name": "sm-nayaab.jpg"},
    {"id": "sm-nayaab", "query": "Seedhe Maut Nayaab official audio", "cover_name": "sm-nayaab.jpg"},

    # --- YEAT ---
    {"id": "yeat-if-we-being-real", "query": "Yeat If We Being Real official audio 2093", "cover_name": "yeat-2093.jpg"},
    {"id": "yeat-turban", "query": "Yeat Turban official audio Up 2 Me", "cover_name": "yeat-turban.jpg"},

    # --- LOVE & LATE NIGHT ---
    {"id": "mitski-my-love-mine-all-mine", "query": "Mitski My Love Mine All Mine official audio", "cover_name": "mitski-love.jpg"},
    {"id": "gigi-perez-sailor-song", "query": "Gigi Perez Sailor Song official audio", "cover_name": "gigi-sailor-song.jpg"},
    {"id": "arctic-monkeys-i-wanna-be-yours", "query": "Arctic Monkeys I Wanna Be Yours official audio", "cover_name": "arctic-monkeys-am.jpg"},
    {"id": "cas-apocalypse", "query": "Cigarettes After Sex Apocalypse official audio", "cover_name": "cas-apocalypse.jpg"},
    {"id": "stephen-sanchez-until-i-found-you", "query": "Stephen Sanchez Until I Found You official audio", "cover_name": "stephen-sanchez.jpg"},
    {"id": "jeff-buckley-lover-you-shouldve-come-over", "query": "Jeff Buckley Lover You Should've Come Over official audio", "cover_name": "jeff-buckley-grace.jpg"},
    {"id": "die-with-a-smile", "query": "Lady Gaga Bruno Mars Die With A Smile official audio", "cover_name": "die-with-a-smile.jpg"},
    {"id": "sweater-weather", "query": "The Neighbourhood Sweater Weather official audio", "cover_name": "sweater-weather.jpg"},

    # --- ARPIT BALA & JAIYASH ---
    {"id": "arpit-maharani", "query": "Arpit Bala Karun Maharani official audio", "cover_name": "arpit-maharani.jpg"},
    {"id": "arpit-gulabo", "query": "Arpit Bala Gulabo official audio", "cover_name": "arpit-maharani.jpg"},
    {"id": "jaiyash-izaam", "query": "Jaiyash Izaam official audio", "cover_name": "jaiyash-izaam.jpg"},
]

AUDIO_DIR = os.path.abspath("public/audio")
COVERS_DIR = os.path.abspath("public/covers")
MUSIC_DIR = os.path.abspath("public/music")

os.makedirs(AUDIO_DIR, exist_ok=True)
os.makedirs(COVERS_DIR, exist_ok=True)
os.makedirs(MUSIC_DIR, exist_ok=True)

print(f"Target audio dir: {AUDIO_DIR}")
print(f"Target covers dir: {COVERS_DIR}")

for track in TRACKS_TO_DOWNLOAD:
    track_id = track["id"]
    query = track["query"]
    target_file = os.path.join(AUDIO_DIR, f"{track_id}.m4a")
    cover_target = os.path.join(COVERS_DIR, track.get("cover_name", f"{track_id}.jpg"))

    if os.path.exists(target_file) and os.path.getsize(target_file) > 100000:
        print(f"[SKIP AUDIO] {track_id} already exists ({os.path.getsize(target_file)} bytes)")
    else:
        print(f"[DOWNLOADING AUDIO] {track_id} with query '{query}'...")
        cmd = [
            "yt-dlp",
            "-f", "140/bestaudio[ext=m4a]/bestaudio",
            f"ytsearch1:{query}",
            "-o", target_file,
            "--no-playlist",
            "--quiet",
            "--no-warnings"
        ]
        try:
            res = subprocess.run(cmd, capture_output=True, text=True)
            if res.returncode == 0 and os.path.exists(target_file):
                print(f" -> SUCCESS: {target_file} ({os.path.getsize(target_file)} bytes)")
            else:
                print(f" -> FAILED: {res.stderr[:200]}")
        except Exception as e:
            print(f" -> ERROR: {e}")

    # Fetch cover art if missing
    if not os.path.exists(cover_target) or os.path.getsize(cover_target) < 1000:
        print(f"[FETCHING COVER] for {track_id} -> {cover_target}...")
        thumb_cmd = [
            "yt-dlp",
            f"ytsearch1:{query}",
            "--skip-download",
            "--write-thumbnail",
            "-o", os.path.join(COVERS_DIR, f"{track_id}.%(ext)s"),
            "--no-playlist",
            "--quiet",
            "--no-warnings"
        ]
        try:
            subprocess.run(thumb_cmd, capture_output=True, text=True)
            # Find generated thumbnail
            for ext in [".jpg", ".webp", ".png"]:
                candidate = os.path.join(COVERS_DIR, f"{track_id}{ext}")
                if os.path.exists(candidate):
                    if candidate != cover_target:
                        # Rename or copy
                        try:
                            if os.path.exists(cover_target):
                                os.remove(cover_target)
                            os.rename(candidate, cover_target)
                        except Exception:
                            pass
                    print(f" -> THUMBNAIL SAVED: {cover_target}")
                    break
        except Exception as e:
            print(f" -> THUMBNAIL ERROR: {e}")

print("=== Library Population Complete ===")
