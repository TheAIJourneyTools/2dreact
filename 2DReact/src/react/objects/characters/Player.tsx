import { useEffect, useState } from 'react';

export default function Player({
  playerRef,
  width = 40,
  onMovingRight,
  onMovingLeft,
  onJump,
  onStopMovingRight,
  onStopMovingLeft,
  src,
  reverseX,
  yCompensation,
}: {
  playerRef: React.RefObject<HTMLDivElement>;
  width?: number;
  onMovingRight?(): void;
  onMovingLeft?(): void;
  onJump?(): void;
  onStopMovingRight?(): void;
  onStopMovingLeft?(): void;
  src?: string;
  reverseX?: boolean;
  yCompensation?: string;
}) {
  const [reverseOnDirection, setReverseOnDirection] = useState<
    boolean | undefined
  >(undefined);
  useEffect(() => {
    const handleKeyDown = (e: { preventDefault(): unknown; code: string }) => {
      e.preventDefault();
      if (e.code === 'ArrowRight') {
        onMovingRight?.();
        if (reverseX) {
          setReverseOnDirection(false);
        }
      }

      if (e.code === 'ArrowLeft') {
        onMovingLeft?.();
        if (reverseX) {
          setReverseOnDirection(true);
        }
      }

      if (e.code === 'Space') {
        onJump?.();
      }
    };

    const handleKeyUp = (e: { code: string }) => {
      if (e.code === 'ArrowRight') {
        onStopMovingRight?.();
      }
      if (e.code === 'ArrowLeft') {
        onStopMovingLeft?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div
      ref={playerRef}
      style={{
        position: 'absolute',
        transform: reverseOnDirection ? 'scaleX(-1)' : 'scaleX(1)',
      }}
    >
      {src ? (
        <img
          src={src}
          alt='player'
          width={width}
          style={{ position: 'relative', bottom: yCompensation }}
        />
      ) : (
        <div
          style={{
            width: `${width}px`,
            height: '40px',
            background: 'lightblue',
            borderRadius: '10px',
          }}
        />
      )}
    </div>
  );
}
