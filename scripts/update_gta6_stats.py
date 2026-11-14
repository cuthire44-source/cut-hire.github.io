#!/usr/bin/env python3
"""Refresh public Cut & Hire GTA VI video metadata using YouTube Data API v3.

Reads YOUTUBE_API_KEY from the environment (GitHub Actions repository secret),
never writes or logs that key, and preserves previously valid values on errors.
The output shape is unchanged for the Cut & Hire website.
"""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlparse
from urllib.request import Request, urlopen

VIDEO_IDS = (
    "a-YFN3ES69M",
    "hqJTNzRkVms",
    "ZUPsRg7i4Bg",
    "UpNCw7eWOng",
    "0qCw4co8QCg",
    "wbYVbvnNbAc",
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
    value = str(value)
    return int(value) if value.isascii() and value.isdecimal() else None


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
            if re.fullmatch(r"/(?:channel/UC[\w-]+|@[\w.\-]+)/?", parsed.path):
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
        print("Existing JSON unreadable; keeping it untouched if the API fails.", file=sys.stderr)
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
            for key in ("views", "likes"):
                val = count_or_none(item.get(key))
                if val is not None:
                    entry[key] = val
            for key in ("title", "channel"):
                val = safe_text(item.get(key))
                if val:
                    entry[key] = val
            channel_url = safe_url(item.get("channelUrl"), "channel")
            if channel_url:
                entry["channelUrl"] = channel_url
            avatar = safe_local_avatar(item.get("avatar"), vid) or safe_url(item.get("avatar"), "avatar")
            if avatar:
                entry["avatar"] = avatar
            source = safe_url(item.get("avatarSource"), "avatar")
            if source:
                entry["avatarSource"] = source
            if entry:
                safe[vid] = entry
    stamp = data.get("updatedAt")
    return {"updatedAt": stamp if isinstance(stamp, str) else None, "videos": safe}


def api_get(endpoint, params, api_key):
    url = "https://www.googleapis.com/youtube/v3/" + endpoint + "?" + urlencode({**params, "key": api_key})
    req = Request(url, headers={"Accept": "application/json", "User-Agent": "CutHireStatsUpdater/2.0"})
    try:
        with urlopen(req, timeout=30) as response:
            blob = response.read(5_000_001)
        if len(blob) > 5_000_000:
            raise RuntimeError("YouTube API response exceeded expected size")
        result = json.loads(blob)
    except HTTPError as exc:
        # Do not print the full URL: it contains the secret key.
        reason = "unknown"
        try:
            detail = json.loads(exc.read(8192))
            reasons = detail.get("error", {}).get("errors", [])
            if isinstance(reasons, list) and reasons:
                reason = str(reasons[0].get("reason", "unknown"))[:70]
        except (ValueError, TypeError, AttributeError):
            pass
        raise RuntimeError(f"YouTube API returned HTTP {exc.code}, reason={reason}") from None
    except (URLError, TimeoutError, OSError) as exc:
        raise RuntimeError(f"YouTube API connection failed ({type(exc).__name__})") from None
    except ValueError:
        raise RuntimeError("YouTube API returned invalid JSON") from None
    if not isinstance(result, dict) or not isinstance(result.get("items"), list):
        raise RuntimeError("YouTube API returned an unexpected response")
    return result["items"]


def api_video_metadata(api_key):
    """One batched video request and one batched channel request for all six."""
    videos = api_get("videos", {"part": "snippet,statistics", "id": ",".join(VIDEO_IDS)}, api_key)
    channels = {}
    channel_ids = set()
    for video in videos:
        if not isinstance(video, dict):
            continue
        snippet = video.get("snippet") or {}
        channel_id = snippet.get("channelId")
        if isinstance(channel_id, str) and re.fullmatch(r"UC[\w-]+", channel_id):
            channel_ids.add(channel_id)
    if channel_ids:
        channel_items = api_get("channels", {"part": "snippet", "id": ",".join(sorted(channel_ids))}, api_key)
        channels = {item["id"]: item.get("snippet") or {} for item in channel_items
                    if isinstance(item, dict) and isinstance(item.get("id"), str)}
    result = {}
    for video in videos:
        if not isinstance(video, dict) or video.get("id") not in VIDEO_IDS:
            continue
        vid = video["id"]
        snippet = video.get("snippet") or {}
        stats = video.get("statistics") or {}
        channel_id = snippet.get("channelId")
        ch = channels.get(channel_id, {})
        thumbnails = ch.get("thumbnails") or {}
        avatar = next((safe_url((thumbnails.get(size) or {}).get("url"), "avatar")
                       for size in ("high", "medium", "default")
                       if safe_url((thumbnails.get(size) or {}).get("url"), "avatar")), None)
        channel_url = ("https://www.youtube.com/channel/" + channel_id
                       if isinstance(channel_id, str) and re.fullmatch(r"UC[\w-]+", channel_id)
                       else None)
        result[vid] = {
            "title": safe_text(snippet.get("title")),
            "channel": safe_text(ch.get("title") or snippet.get("channelTitle")),
            "channelUrl": channel_url,
            "views": count_or_none(stats.get("viewCount")),
            "likes": count_or_none(stats.get("likeCount")),
            "avatarSource": avatar,
        }
    return result


def image_extension(data):
    if data.startswith(b"\xff\xd8\xff"):
        return "jpg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "webp"
    return None


def download_avatar(url, vid):
    if not safe_url(url, "avatar"):
        return None
    req = Request(url, headers={"User-Agent": "Mozilla/5.0", "Accept": "image/jpeg,image/png,image/webp,image/*"})
    try:
        with urlopen(req, timeout=20) as response:
            final = urlparse(response.geturl())
            if final.scheme != "https" or final.hostname not in AVATAR_HOSTS:
                raise RuntimeError("avatar redirected outside approved image hosts")
            data = response.read(MAX_AVATAR_BYTES + 1)
    except (URLError, HTTPError, OSError, TimeoutError) as exc:
        raise RuntimeError(f"Avatar download failed ({type(exc).__name__})") from None
    if not data or len(data) > MAX_AVATAR_BYTES:
        raise RuntimeError("avatar data is empty or unexpectedly large")
    ext = image_extension(data)
    if not ext:
        raise RuntimeError("avatar response is not a supported image")
    AVATAR_DIR.mkdir(parents=True, exist_ok=True)
    output = AVATAR_DIR / f"{vid}.{ext}"
    tmp = output.with_suffix(output.suffix + ".tmp")
    tmp.write_bytes(data)
    tmp.replace(output)
    for other in ("jpg", "png", "webp"):
        candidate = AVATAR_DIR / f"{vid}.{other}"
        if candidate != output and candidate.exists():
            candidate.unlink()
    return output.relative_to(ROOT).as_posix()


def existing_local_avatar(vid):
    for ext in ("jpg", "png", "webp"):
        path = AVATAR_DIR / f"{vid}.{ext}"
        if path.is_file() and path.stat().st_size > 0:
            return path.relative_to(ROOT).as_posix()
    return None


def update_stats(fetcher=api_video_metadata, downloader=download_avatar, now=None):
    api_key = os.environ.get("YOUTUBE_API_KEY", "").strip()
    if not api_key:
        print("Missing YOUTUBE_API_KEY environment variable; no files changed.", file=sys.stderr)
        return 1
    old = load_existing()
    try:
        fetched = fetcher(api_key)
    except (RuntimeError, ValueError, OSError) as exc:
        print(f"Metadata update failed: {exc}. Existing JSON left untouched.", file=sys.stderr)
        return 1
    combined = {vid: dict(value) for vid, value in old["videos"].items()}
    success = 0
    for vid in VIDEO_IDS:
        meta = fetched.get(vid)
        if not isinstance(meta, dict):
            print(f"{vid}: not returned by YouTube; keeping previous values.", file=sys.stderr)
            continue
        entry = dict(combined.get(vid, {}))
        for attr in ("views", "likes"):
            val = count_or_none(meta.get(attr))
            if val is not None:
                entry[attr] = val
        for attr in ("title", "channel"):
            val = safe_text(meta.get(attr))
            if val:
                entry[attr] = val
        link = safe_url(meta.get("channelUrl"), "channel")
        if link:
            entry["channelUrl"] = link
        remote = safe_url(meta.get("avatarSource"), "avatar")
        local = existing_local_avatar(vid)
        if remote:
            previous_source = entry.get("avatarSource")
            entry["avatarSource"] = remote
            if not local or (previous_source and previous_source != remote):
                try:
                    local = downloader(remote, vid) or local
                except (RuntimeError, ValueError, OSError) as exc:
                    print(f"{vid}: {exc}; preserving previous avatar.", file=sys.stderr)
            if local:
                entry["avatar"] = local
            elif not entry.get("avatar"):
                entry["avatar"] = remote
        elif local:
            entry["avatar"] = local
        if entry:
            combined[vid] = entry
            success += 1
            print(f"{vid}: views={entry.get('views','n/a')}, likes={entry.get('likes','n/a')}, channel={entry.get('channel','n/a')}")
    if not success:
        print("No videos updated; original JSON left untouched.", file=sys.stderr)
        return 1
    if combined == old["videos"]:
        print("No changes in public metadata; JSON left unchanged.")
        return 0
    timestamp = now or datetime.now(timezone.utc)
    if isinstance(timestamp, datetime):
        timestamp = timestamp.isoformat(timespec="seconds").replace("+00:00", "Z")
    payload = {"updatedAt": timestamp, "videos": combined}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    tmp = OUTPUT.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp.replace(OUTPUT)
    print(f"Saved statistics for {success} video(s) to {OUTPUT.relative_to(ROOT).as_posix()}")
    return 0


if __name__ == "__main__":
    sys.exit(update_stats())
