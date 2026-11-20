# Remotion Subtitle Editor

A small Remotion project for adding timed captions to an existing video.

## Features
- Render a source video with timestamped subtitle segments.
- White bold captions with dark backing for readability.
- Optional highlighted words.
- Transcript segments are kept as data, separate from the video composition.

## Setup
```bash
npm install
npm run dev
```

## Add a video and captions
1. Put the source video in the `public` directory.
2. Set `videoSrc` in `src/Root.tsx` to the public video path.
3. Replace the sample caption segments with timestamped transcript text.

## Render
```bash
npm run build
```

The rendered file is written to `out/subtitle-video.mp4`.

## Automatic transcription
This initial commit provides the timed-caption renderer. Speech recognition (for example, Whisper transcription and SRT import) is not included yet and will be added as a separate step.
