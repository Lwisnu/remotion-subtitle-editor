import React from 'react';
import {Composition} from 'remotion';
import {SubtitleVideo, subtitleSchema} from './SubtitleVideo';

export const Root: React.FC = () => (
  <Composition
    id="SubtitleVideo"
    component={SubtitleVideo}
    durationInFrames={900}
    fps={30}
    width={1920}
    height={1080}
    schema={subtitleSchema}
    defaultProps={{
      videoSrc: '/sample-video.mp4',
      captions: [
        {start: 0, end: 2.5, text: 'Ganti contoh ini dengan hasil transkripsi.'},
        {start: 2.5, end: 5, text: 'Subtitle akan muncul mengikuti timestamp ucapan.'}
      ],
      highlightWords: []
    }}
  />
);
