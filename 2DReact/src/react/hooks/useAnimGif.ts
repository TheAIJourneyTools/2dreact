import { useState } from 'react';
import { AssetManager } from '../../core/clases/AssetManager';

export default function useAnimGif(initialAssetKey: string) {
  const [animSrc, setAnimSrc] = useState<string | undefined>(undefined);

  const assets = AssetManager.getInstance();
  assets.setOnLoaded(() => {
    setAnimSrc(assets.get<HTMLImageElement>(initialAssetKey).src);
  });

  const setAnimAssetKey = (assetkey: string) =>
    setAnimSrc(assets.get<HTMLImageElement>(assetkey).src);

  return {
    animSrc,
    setAnimAssetKey,
  };
}
