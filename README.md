# Remotion Subtitle Editor

Local Linux workflow for generating Indonesian subtitles with Whisper and rendering them into an MP4 with Remotion.

## Requirements

- Node.js 18.19+ (Node 20 LTS recommended)
- Python 3.10+
- FFmpeg installed and available on PATH

## Install

```bash
npm install
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Generate Indonesian subtitles

Put your source video anywhere on your computer, then run:

```bash
source .venv/bin/activate
python scripts/transcribe.py "/path/to/your-video.mp4" --language id --model small
```

The script copies the video to `public/source.mp4` and writes timestamped speech segments to `public/captions.json`.

For a faster but less accurate model use `--model base`. For better accuracy (and more memory/time) use `--model medium`.

## Preview and render

```bash
npm run dev
```

Open Remotion Studio to preview. Render with:

```bash
npm run render
```

Output: `out/subtitle-video.mp4`.

## Notes

- Whisper runs locally, so the video and audio do not need to be uploaded to a third-party transcription website.
- Check the transcript before publishing: names, slang, noisy audio, and overlapping speakers may need correction.
- The current subtitle renderer uses bold white text with a dark translucent background.
