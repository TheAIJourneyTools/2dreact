import { useEffect, useState, useCallback } from 'react';
import { AssetManager } from '../../core/clases/AssetManager';

export type AssetType = 'image' | 'audio';

export type AssetDescriptor = {
  key: string;
  src: string;
  type: AssetType;
};

export default function useGameAssets(assets: AssetDescriptor[] | undefined) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const manager = AssetManager.getInstance();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!assets) {
        return;
      }
      try {
        await manager.loadAssets(assets);
        if (!cancelled) {
          setLoaded(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err as Error);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  // ---------- getters ----------
  const getImage = useCallback(
    (key: string) => manager.get<HTMLImageElement>(key),
    [manager]
  );

  const getAudio = useCallback(
    (key: string) => manager.get<AudioBuffer>(key),
    [manager]
  );

  const has = useCallback((key: string) => manager.has(key), [manager]);

  const play = (key: string, volume?: number) => {
    manager.playAudio(getAudio(key), volume);
  };

  return {
    loaded,
    error,
    getImage,
    getAudio,
    play,
    has,
  };
}
