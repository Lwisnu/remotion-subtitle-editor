import React from 'react';
import {z} from 'zod';
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence
} from 'remotion';

export const subtitleSchema = z.object({
  videoSrc: z.string(),
  captions: z.array(z.object({
    start: z.number(),
    end: z.number(),
    text: z.string()
  })),
  highlightWords: z.array(z.string())
});

type Props = z.infer<typeof subtitleSchema>;

const Caption: React.FC<{text: string; highlights: string[]}> = ({text, highlights}) => {
  const words = text.split(/(\s+)/);
  return (
    <div style={{
      maxWidth: '88%',
      padding: '12px 22px',
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0.62)',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      fontSize: 54,
      fontWeight: 800,
      lineHeight: 1.2,
      textAlign: 'center',
      textShadow: '0 2px 4px rgba(0,0,0,.9)'
    }}>
      {words.map((word, index) => {
        const normalized = word.toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
        const highlighted = highlights.some((item) => item.toLocaleLowerCase() === normalized);
        return <span key={index} style={highlighted ? {color: '#FFD43B'} : undefined}>{word}</span>;
      })}
    </div>
  );
};

export const SubtitleVideo: React.FC<Props> = ({videoSrc, captions, highlightWords}) => (
  <AbsoluteFill style={{backgroundColor: 'black'}}>
    <OffthreadVideo
      src={videoSrc}
      style={{width: '100%', height: '100%', objectFit: 'contain'}}
    />
    {captions.map((caption, index) => (
      <Sequence
        key={index}
        from={Math.max(0, Math.floor(caption.start * 30))}
        durationInFrames={Math.max(1, Math.ceil((caption.end - caption.start) * 30))}
      >
        <AbsoluteFill style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 76
        }}>
          <Caption text={caption.text} highlights={highlightWords} />
        </AbsoluteFill>
      </Sequence>
    ))}
  </AbsoluteFill>
);
