import React from 'react';
import {
  useGame,
  Player,
  Ground,
  Platform,
  GameoverModal,
  AssetDescriptor,
  useAnimGif,
} from '../../../index';

const containerStyle: React.CSSProperties = {
  fontFamily: 'sans-serif',
  color: 'white',
  height: '100vh',
  margin: 0,
  background: 'url(/assets/background.png)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};

const assetsToPreload: AssetDescriptor[] = [
  { key: 'player', src: '/assets/mario_idle_custom.gif', type: 'image' },
  {
    key: 'player_running',
    src: '/assets/mario_running_custom.gif',
    type: 'image',
  },
  {
    key: 'jumping',
    src: '/assets/jumping_custom.gif',
    type: 'image',
  },
  {
    key: 'jumping_audio',
    src: '/assets/jump.wav',
    type: 'audio',
  },
  {
    key: 'soundtrack_audio',
    src: '/assets/soundtrack.wav',
    type: 'audio',
  },
];

export default function Game() {
  const groundRef = React.useRef(null as unknown as HTMLDivElement);
  const playerRef = React.useRef(null as unknown as HTMLDivElement);
  const [ready, setReady] = React.useState(false);
  const [started, setStarted] = React.useState(false);

  const { physics, objects, dom, ctx, loop, assets } = useGame({
    assetsToPreload,
    init: () => {
      objects.addAll([
        {
          name: 'player',
          pos: { x: 0, y: dom.getScreenHeight() },
          element: playerRef.current,
        },
        {
          name: 'ground',
          pos: { x: 0, y: dom.getScreenHeight() * 0.1 },
          element: groundRef.current,
        },
      ]);
      setReady(true);
    },
    update: ({ getFrameSinceStart, destroy }) => {
      // Variables
      const player = objects.get('player');
      const isCollidingAnyElement = physics.isCollidingOnAnyElement(
        'player',
        objects.getPlatforms()
      );
      const isJumping = player?.jumping?.isJumping;

      // Methods
      const applyAnim = () => {
        if (
          (player?.moving === 'left' && isCollidingAnyElement) ||
          (player?.moving === 'right' && isCollidingAnyElement)
        ) {
          setAnimAssetKey('player_running');
        }
      };

      const applyMovements = () => {
        // Movements x
        if (player?.moving === 'left') {
          if (!physics.isCollidingScreenLeft('player'))
            physics.movingObjectLeft('player', 3);
        } else if (player?.moving === 'right') {
          physics.movingObjectRight('player', 3);
        }

        if (player?.jumping?.isJumping) {
          physics.jump('player', isCollidingAnyElement);
          setAnimAssetKey('jumping');
        }

        if (player?.moving === 'idle' && !isJumping) {
          setAnimAssetKey('player');
        }
      };

      const applyPhysics = () => {
        // Apply gravity if player is not jumping or colliding
        physics.setGravityToObject(
          'player',
          -8,
          isJumping || isCollidingAnyElement
        );
      };

      const applyContext = () => {
        if (physics.isCollidingScreenBottom('player')) {
          ctx.setGameStatus('game_over');
          loop.destroy();
        }
      };

      applyPhysics();
      applyMovements();
      applyAnim();
      applyContext();

      const frame = getFrameSinceStart();
      console.log(frame);
      if (frame && frame > 2000) {
        destroy();
      }
    },
  });
  const { animSrc, setAnimAssetKey } = useAnimGif('player');

  return (
    <>
      {/*       <div style={{ position: 'absolute' }}>
        <button
          onClick={() => {
            loop.destroy();
          }}
        >
          Stop Looping
        </button>
      </div> */}
      {!ready && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ color: 'white' }}>Loading Game...</div>
        </div>
      )}
      {ready && !started && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgb(0, 0, 0, 0.5)',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ color: 'white' }}>
            <button
              onClick={() => {
                setStarted(true);
                assets.play('soundtrack_audio');
              }}
            >
              Start
            </button>
          </div>
        </div>
      )}
      <div
        style={{ ...containerStyle, visibility: ready ? 'visible' : 'hidden' }}
      >
        <Player
          yCompensation='-5px'
          reverseX
          src={animSrc}
          playerRef={playerRef}
          onMovingRight={() => {
            objects.seObjectMovement('player', 'right');
          }}
          onMovingLeft={() => {
            objects.seObjectMovement('player', 'left');
          }}
          onJump={() => {
            assets.play('jumping_audio', 0.5);
            if (!objects.get('player')?.jumping?.isJumping)
              objects.seObjectJumping('player', true);
          }}
          onStopMovingRight={() => {
            setAnimAssetKey('player');
            objects.seObjectMovement('player', 'idle');
          }}
          onStopMovingLeft={() => {
            setAnimAssetKey('player');
            objects.seObjectMovement('player', 'idle');
          }}
        />
        <Ground groundRef={groundRef}>
          <Platform width={'60vw'} />
          <Platform width={'20vw'} marginLeft='100px' />
          <div style={{ position: 'absolute', bottom: '120px' }}>
            <Platform width={'20vw'} marginLeft='100px' />
          </div>
        </Ground>
        {ctx.status === 'game_over' && <GameoverModal />}
      </div>
    </>
  );
}
