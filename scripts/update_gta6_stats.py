#!/usr/bin/env python3
"""Refresh public GTA VI YouTube metadata and cache real channel avatars.

No YouTube Data API key is needed. yt-dlp extracts video metadata and channel
pages. Avatar files are saved locally for reliable display on Live Server;
remote YouTube URLs remain as fallbacks for GitHub Pages deployments.
If a fetch fails, previously verified information is kept.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

VIDEO_IDS = (
    "a-YFN3ES69M",
    "hqJTNzRkVms",
    "ZUPsRg7i4Bg",
    "UpNCw7eWOng",
    "0qCw4co8QCg",
)
ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "assets/data/gta6-video-stats.json"
AVATAR_DIR = ROOT / "assets/images/youtube-channel-avatars"
AVATAR_HOSTS = {"yt3.ggpht.com", "yt3.googleusercontent.com", "yt3.google.com"}
YOUTUBE_HOSTS = {"youtube.com", "www.youtube.com", "m.youtube.com"}
MAX_AVATAR_BYTES = 2_000_000


def count_or_none(value):
    if isinstance(value, bool) or not isinstance(value, (str, int)):
        return None
    txt = str(value)
    return int(txt) if txt.isascii() and txt.isdecimal() else None


def safe_text(value, limit=180):
    if not isinstance(value, str):
        return None
    value = " ".join(value.split()).strip()
    return value[:limit] if value else None


def safe_url(value, kind):
    if not isinstance(value, str) or len(value) > 1500:
        return None
    try:
        parsed = urlparse(value)
        if parsed.scheme != "https" or not parsed.hostname:
            return None
        host = parsed.hostname.lower()
        if kind == "avatar":
            return value if host in AVATAR_HOSTS else None
        if kind == "channel" and host in YOUTUBE_HOSTS:
            if re.match(r"^/(?:channel/UC[\w-]+|@[\w.\-]+)(?:/|$)", parsed.path):
                return value
    except ValueError:
        pass
    return None


def safe_local_avatar(value, video_id):
    if not isinstance(value, str):
        return None
    match = re.fullmatch(
        rf"assets/images/youtube-channel-avatars/{re.escape(video_id)}\.(?:jpg|png|webp)",
        value,
    )
    return value if match else None


def load_existing():
    empty = {"updatedAt": None, "videos": {}}
    if not OUTPUT.exists():
        return empty
    try:
        data = json.loads(OUTPUT.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        print("Existing metadata JSON unreadable; preserving nothing from it.", file=sys.stderr)
        return empty
    if not isinstance(data, dict):
        return empty
    safe = {}
    videos = data.get("videos", {})
    if isinstance(videos, dict):
        for vid in VIDEO_IDS:
            item = videos.get(vid)
            if not isinstance(item, dict):
                continue
            entry = {}
            for attr in ("views", "likes"):
                value = count_or_none(item.get(attr))
                if value is not None:
                    entry[attr] = value
            for attr in ("title", "channel"):
                val = safe_text(item.get(attr))
                if val:
                    entry[attr] = val
            channel_url = safe_url(item.get("channelUrl"), "channel")
            if channel_url:
                entry["channelUrl"] = channel_url
            avatar = safe_local_avatar(item.get("avatar"), vid) or safe_url(item.get("avatar"), "avatar")
            if avatar:
                entry["avatar"] = avatar
            avatar_source = safe_url(item.get("avatarSource"), "avatar")
            if avatar_source:
                entry["avatarSource"] = avatar_source
            if entry:
                safe[vid] = entry
    stamp = data.get("updatedAt")
    return {"updatedAt": stamp if isinstance(stamp, str) else None, "videos": safe}


def run_ytdlp(url, timeout=95, extra=(), channel=False):
    cmd = [
        sys.executable, "-m", "yt_dlp",
        "--dump-single-json", "--skip-download", "--no-progress",
        "--socket-timeout", "15", "--retries", "1",
    ]
    if not channel:
        cmd.append("--no-playlist")
    cmd += [*extra, url]
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout, check=False)
    if proc.returncode:
        message = next(
            (line.strip() for line in proc.stderr.splitlines() if "ERROR:" in line),
            "yt-dlp extraction failed",
        )
        raise RuntimeError(message[:230])
    data = json.loads(proc.stdout)
    if not isinstance(data, dict):
        raise ValueError("unexpected yt-dlp response")
    return data


def extract_metadata(video_id):
    info = run_ytdlp("https://www.youtube.com/watch?v=" + video_id)
    if info.get("id") != video_id:
        raise ValueError("yt-dlp returned a different video")
    return info


class AvatarMetaParser(HTMLParser):
    """Pick only og:image pointing at YouTube's real channel-avatar host."""

    def __init__(self):
        super().__init__()
        self.url = None

    def handle_starttag(self, tag, attrs):
        if tag != "meta":
            return
        fields = dict(attrs)
        if fields.get("property") == "og:image" or fields.get("name") == "twitter:image":
            self.url = self.url or safe_url(fields.get("content"), "avatar")


def extract_avatar_from_channel_page(channel_url):
    """Fallback when yt-dlp's channel thumbnails cannot be extracted."""
    req = Request(channel_url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml",
    })
    with urlopen(req, timeout=16) as response:
        final_url = urlparse(response.geturl())
        if final_url.scheme != "https" or final_url.hostname not in YOUTUBE_HOSTS:
            return None
        html = response.read(3_000_000).decode("utf-8", errors="replace")
    parser = AvatarMetaParser()
    parser.feed(html)
    return parser.url


def extract_channel_avatar(channel_url):
    """Read the actual channel's avatar, NOT a video's thumbnail or channel banner."""
    try:
        # Channel root + zero videos is deliberate. /videos with one item can
        # sometimes expose video thumbnails instead of channel artwork.
        info = run_ytdlp(
            channel_url.rstrip("/"), channel=True, timeout=55,
            extra=("--flat-playlist", "--playlist-items", "0"),
        )
        images = info.get("thumbnails") or []
        if isinstance(images, list):
            avatars = []
            for item in images:
                if not isinstance(item, dict):
                    continue
                ident = str(item.get("id", "")).lower()
                url = safe_url(item.get("url"), "avatar")
                if url and "avatar" in ident:
                    # Prefer a cropped channel icon over an uncropped image.
                    rank = 2 if ident == "avatar" else (1 if "avatar" in ident else 0)
                    avatars.append((rank, url))
            if avatars:
                avatars.sort(reverse=True)
                return avatars[0][1]
    except (OSError, subprocess.TimeoutExpired, ValueError, RuntimeError, json.JSONDecodeError) as exc:
        print(f"  Channel metadata lookup failed: {str(exc)[:140]}", file=sys.stderr)
    try:
        return extract_avatar_from_channel_page(channel_url)
    except (OSError, TimeoutError, ValueError) as exc:
        print(f"  Channel page avatar fallback failed: {str(exc)[:140]}", file=sys.stderr)
        return None


def image_extension(image_data):
    if image_data.startswith(b"\xff\xd8\xff"):
        return "jpg"
    if image_data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if image_data[:4] == b"RIFF" and image_data[8:12] == b"WEBP":
        return "webp"
    return None


def download_avatar(avatar_url, video_id):
    """Download the genuine channel icon for offline/Live Server use."""
    if not safe_url(avatar_url, "avatar"):
        return None
    req = Request(avatar_url, headers={
        "User-Agent": "Mozilla/5.0 (compatible; CutHireMetadataUpdater/1.0)",
        "Accept": "image/jpeg,image/png,image/webp,image/*",
    })
    with urlopen(req, timeout=18) as response:
        final = urlparse(response.geturl())
        if final.scheme != "https" or final.hostname not in AVATAR_HOSTS:
            raise ValueError("Channel avatar URL redirected outside YouTube image hosts")
        blob = response.read(MAX_AVATAR_BYTES + 1)
    if not blob or len(blob) > MAX_AVATAR_BYTES:
        raise ValueError("Channel avatar is empty or unexpectedly large")
    ext = image_extension(blob)
    if ext is None:
        raise ValueError("Channel avatar returned invalid image data")
    AVATAR_DIR.mkdir(parents=True, exist_ok=True)
    output = AVATAR_DIR / f"{video_id}.{ext}"
    tmp = output.with_suffix(output.suffix + ".tmp")
    tmp.write_bytes(blob)
    tmp.replace(output)
    for other in ("jpg", "png", "webp"):
        other_file = AVATAR_DIR / f"{video_id}.{other}"
        if other_file != output and other_file.exists():
            other_file.unlink()
    return output.relative_to(ROOT).as_posix()


def existing_local_avatar(video_id):
    for ext in ("jpg", "png", "webp"):
        f = AVATAR_DIR / f"{video_id}.{ext}"
        if f.is_file() and f.stat().st_size > 0:
            return f.relative_to(ROOT).as_posix()
    return None


def update_stats(extractor=extract_metadata, avatar_extractor=extract_channel_avatar,
                 image_downloader=download_avatar, now=None):
    old = load_existing()
    combined = {vid: dict(value) for vid, value in old["videos"].items()}
    success = 0
    avatar_cache = {}
    for vid in VIDEO_IDS:
        try:
            meta = extractor(vid)
            if not isinstance(meta, dict) or meta.get("id") != vid:
                raise ValueError("unexpected or missing video ID")
            new = dict(combined.get(vid, {}))
            for attr, key in (("title", "title"), ("channel", "channel")):
                value = safe_text(meta.get(key) or (meta.get("uploader") if key == "channel" else None))
                if value:
                    new[attr] = value
            link = safe_url(meta.get("channel_url") or meta.get("uploader_url"), "channel")
            if link:
                new["channelUrl"] = link
            for attr, key in (("views", "view_count"), ("likes", "like_count")):
                value = count_or_none(meta.get(key))
                if value is not None:
                    new[attr] = value

            existing_img = existing_local_avatar(vid)
            direct = safe_url(meta.get("channel_thumbnail") or meta.get("channel_avatar"), "avatar")
            remote = direct or safe_url(new.get("avatarSource"), "avatar") or safe_url(new.get("avatar"), "avatar")
            if not existing_img and not remote and link:
                if link not in avatar_cache:
                    avatar_cache[link] = avatar_extractor(link)
                remote = safe_url(avatar_cache[link], "avatar")
            if remote:
                new["avatarSource"] = remote
            if existing_img:
                new["avatar"] = existing_img
            elif remote:
                try:
                    local_img = image_downloader(remote, vid)
                    new["avatar"] = safe_local_avatar(local_img, vid) or remote
                except (OSError, TimeoutError, ValueError) as exc:
                    print(f"{vid}: image download unavailable ({str(exc)[:140]})", file=sys.stderr)
                    new["avatar"] = remote
            if not new:
                raise ValueError("no usable metadata returned")
            combined[vid] = new
            success += 1
            print(f"{vid}: title={new.get('title', 'unavailable')!r}, channel={new.get('channel', 'unavailable')!r}, views={new.get('views', 'unavailable')}, likes={new.get('likes', 'unavailable')}, avatar={'local' if existing_local_avatar(vid) else ('remote' if new.get('avatar') else 'unavailable')}")
        except (OSError, TimeoutError, subprocess.TimeoutExpired, ValueError, RuntimeError, json.JSONDecodeError) as exc:
            print(f"{vid}: failed ({str(exc)[:230]}). Keeping previous values.", file=sys.stderr)
    if not success:
        print("No videos could be updated. Existing JSON left untouched.", file=sys.stderr)
        return 1
    if combined == old["videos"]:
        print("Video metadata unchanged; skipping JSON update.")
        return 0
    stamp = now or datetime.now(timezone.utc)
    if isinstance(stamp, datetime):
        stamp = stamp.isoformat(timespec="seconds").replace("+00:00", "Z")
    payload = {"updatedAt": stamp, "videos": combined}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    tmp = OUTPUT.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp.replace(OUTPUT)
    print(f"Saved public metadata for {len(combined)} GTA VI videos to {OUTPUT}")
    return 0


if __name__ == "__main__":
    sys.exit(update_stats())
