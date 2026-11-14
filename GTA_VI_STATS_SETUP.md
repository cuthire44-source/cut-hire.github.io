# Cut & Hire: GTA VI channel avatars + tab titles

This patch keeps all GTA VI hover previews, styling, statistics panels and
animations. It fixes the channel-picture loading path and updates the rotating
browser-tab titles to concise, creative messages with emojis.

## Files to replace

Copy the ZIP contents into the Cut & Hire project root, keeping folders:

- `index.html` — enables eager loading for five channel icons and refreshes JS cache
- `assets/js/index.js` — avatar fallback handling and new rotating tab titles
- `scripts/update_gta6_stats.py` — looks up and caches genuine channel avatars
- `.github/workflows/update-gta6-youtube-stats.yml` — commits new avatar images too

Do **not** replace or delete existing video MP4s, thumbnails, your main CSS file,
or `assets/data/gta6-video-stats.json`.

## Required one-time step for Live Server

The HTML cannot guess channel logos. It needs metadata from your five actual
YouTube video links, which the Python updater collects without an API key.

Open a terminal **in the project folder containing `index.html`** and run:

```powershell
python -m pip install -U "yt-dlp[default]"
python .\scripts\update_gta6_stats.py
```

On success the updater writes `assets/data/gta6-video-stats.json` and saves
images under `assets/images/youtube-channel-avatars/`. Refresh Live Server
with `Ctrl+Shift+R`.

If `python` is not available in VS Code even after installing Python, close
and reopen VS Code, or run the installed Python executable by its full path.

If YouTube blocks metadata extraction, real avatars can't be guaranteed.
The updater preserves existing data and the UI displays its neutral placeholder
instead of inventing a logo. A local cached image remains usable offline.

## GitHub Pages

Upload the four updated files, then run **Actions → Refresh GTA VI YouTube
video details (no API key) → Run workflow**. The action now commits channel
avatar image files along with the JSON. GitHub-hosted runners sometimes get
blocked by YouTube; check the workflow log for errors. The webpage also has a
GitHub raw-image fallback if GitHub Pages hasn't republished the new image.

No YouTube API key is needed. View/like counts are snapshots, not live.
