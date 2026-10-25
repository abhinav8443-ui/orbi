import os
import json
import urllib.request
import urllib.parse

ALBUM_QUERIES = {
    # Yeat
    "yeat-up-2-me": {"term": "Yeat Up 2 Me", "fallback": "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fd/1e/8f/fd1e8ffd-4b32-6f21-c7b5-a29260f6de7f/54391952097.jpg/1000x1000bb.jpg"},
    "yeat-lyfe": {"term": "Yeat Lyfe", "fallback": ""},
    "yeat-2-alive": {"term": "Yeat 2 Alive", "fallback": ""},
    "yeat-2093": {"term": "Yeat 2093", "fallback": ""},
    "yeat-4l": {"term": "Yeat 4L", "fallback": ""},
    "yeat-afterlyfe": {"term": "Yeat AfterLyfe", "fallback": ""},
    "drake-idgaf": {"term": "Drake For All The Dogs", "fallback": ""},

    # 2hollis
    "2hollis-boy": {"term": "2hollis boy", "fallback": ""},
    "2hollis-jeans": {"term": "2hollis jeans", "fallback": ""},
    "2hollis-crush": {"term": "2hollis crush", "fallback": ""},

    # OsamaSon
    "osamason-flex": {"term": "OsamaSon Flex Musix", "fallback": ""},
    "osamason-blonde": {"term": "OsamaSon blonde", "fallback": ""},
    "osamason-ctsv": {"term": "OsamaSon cts-v", "fallback": ""},

    # Nettspend
    "nettspend-drank": {"term": "nettspend drankdrankdrank", "fallback": ""},
    "nettspend-that-one-song": {"term": "nettspend that one song", "fallback": ""},
    "nettspend-shine": {"term": "nettspend shine n peace", "fallback": ""},
    "nettspend-uuu": {"term": "nettspend nothing like uuu", "fallback": ""},

    # Esdeekid
    "esdeekid-4me": {"term": "esdeekid 4 me", "fallback": ""},
    "esdeekid-phantom": {"term": "esdeekid phantom", "fallback": ""},
    "esdeekid-ritz": {"term": "esdeekid ritz", "fallback": ""},

    # Nine Vicious
    "nine-vicious": {"term": "nine vicious demon time", "fallback": ""},
}

COVERS_DIR = os.path.abspath("public/covers")
os.makedirs(COVERS_DIR, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for key, data in ALBUM_QUERIES.items():
    dest_path = os.path.join(COVERS_DIR, f"{key}.jpg")
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 10000:
        print(f"Already have cover for {key}")
        continue

    url = ""
    try:
        q = urllib.parse.quote(data["term"])
        req_url = f"https://itunes.apple.com/search?term={q}&limit=1"
        req = urllib.request.Request(req_url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            results = json.loads(resp.read().decode())
            if results.get("results") and len(results["results"]) > 0:
                raw_art = results["results"][0].get("artworkUrl100", "")
                if raw_art:
                    url = raw_art.replace("100x100bb", "1000x1000bb")
    except Exception as e:
        print(f"Lookup error for {key}: {e}")

    if not url and data.get("fallback"):
        url = data["fallback"]

    if url:
        try:
            req_img = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req_img, timeout=10) as img_resp:
                img_data = img_resp.read()
                with open(dest_path, "wb") as f:
                    f.write(img_data)
                print(f"Downloaded cover for {key} ({len(img_data)} bytes)")
        except Exception as e:
            print(f"Download error for {key}: {e}")
    else:
        print(f"Could not find cover art for {key}")

print("Cover download step finished!")
