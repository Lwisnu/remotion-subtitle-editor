#!/usr/bin/env python3
"""Transcribe a video with faster-whisper and prepare Remotion assets."""
import argparse
import json
import shutil
from pathlib import Path

from faster_whisper import WhisperModel

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("video", help="Path to the source video")
    parser.add_argument("--language", default="id", help="Speech language (default: id)")
    parser.add_argument("--model", default="small", choices=["tiny", "base", "small", "medium", "large-v3"])
    parser.add_argument("--device", default="cpu", choices=["cpu", "cuda"])
    parser.add_argument("--compute-type", default="int8")
    args = parser.parse_args()

    source = Path(args.video).expanduser().resolve()
    if not source.is_file():
        raise SystemExit(f"Video not found: {source}")

    PUBLIC.mkdir(parents=True, exist_ok=True)
    target = PUBLIC / "source.mp4"
    if source != target.resolve():
        shutil.copy2(source, target)

    print(f"Loading Whisper model: {args.model} ({args.device})")
    model = WhisperModel(args.model, device=args.device, compute_type=args.compute_type)
    segments, info = model.transcribe(str(target), language=args.language, vad_filter=True)

    captions = []
    for segment in segments:
        text = segment.text.strip()
        if text:
            captions.append({
                "start": round(float(segment.start), 3),
                "end": round(float(segment.end), 3),
                "text": text
            })

    duration = max([c["end"] for c in captions], default=0)
    output = {"language": info.language, "duration": duration, "captions": captions}
    (PUBLIC / "captions.json").write_text(
        json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    print(f"Done: {len(captions)} caption segments")
    print(f"Saved: {PUBLIC / 'captions.json'}")
    print(f"Video copied to: {target}")


if __name__ == "__main__":
    main()
