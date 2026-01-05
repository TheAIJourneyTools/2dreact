import { useEffect } from 'react';
import useGameLoop from './useGameLoop';
import useGamePhysics from './useGamePhysics';
import useGameObject from './useGameObject';
import useGameDom from './useGameDom';
import useGameContext from './useGameContext';
import useGameAssets, { AssetDescriptor } from './useGameAssets';

export default function useGame({
  update,
  init,
  assetsToPreload,
}: {
  update: ({
    getFrameSinceStart,
    destroy,
  }: {
    getFrameSinceStart: () => number | undefined;
    destroy: () => void | undefined;
  }) => void;
  init: () => void;
  assetsToPreload?: AssetDescriptor[];
}) {
  const { onUpdate, destroy, getFrameSinceStart } = useGameLoop();
  const {
    setGravityToObject,
    isCollidingOnAnyElement,
    isCollidingScreenBottom,
    isCollidingScreenLeft,
    movingObjectLeft,
    movingObjectRight,
    jump,
  } = useGamePhysics();
  const { addAll, getPlatforms, seObjectMovement, get, seObjectJumping } =
    useGameObject();
  const { getScreenHeight } = useGameDom();
  const { ctx } = useGameContext();
  const {
    loaded: loadedAssets,
    getImage,
    getAudio,
    play,
  } = useGameAssets(assetsToPreload);

  useEffect(() => {
    if (!loadedAssets && assetsToPreload) return;

    init();

    onUpdate(() => {
      update({
        getFrameSinceStart,
        destroy,
      });
    });

    return () => {
      destroy();
    };
  }, [loadedAssets]);

  return {
    physics: {
      setGravityToObject,
      isCollidingOnAnyElement,
      isCollidingScreenBottom,
      isCollidingScreenLeft,
      movingObjectLeft,
      movingObjectRight,
      jump,
    },
    objects: { addAll, getPlatforms, seObjectMovement, get, seObjectJumping },
    dom: { getScreenHeight },
    assets: { getImage, getAudio, play },
    loop: { destroy, getFrameSinceStart },
    ctx,
  };
}
