import React from 'react';
import {Composition} from 'remotion';
import captionsData from '../public/captions.json';
import {SubtitleVideo, subtitleSchema} from './SubtitleVideo';

export const Root: React.FC = () => (
  <Composition
    id="SubtitleVideo"
    component={SubtitleVideo}
    durationInFrames={Math.max(1, Math.ceil((captionsData.duration || 30) * 30))}
    fps={30}
    width={1920}
    height={1080}
    schema={subtitleSchema}
    defaultProps={{
      videoSrc: '/source.mp4',
      captions: captionsData.captions,
      highlightWords: []
    }}
  />
);
