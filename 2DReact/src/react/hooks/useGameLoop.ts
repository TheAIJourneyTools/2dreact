import { useEffect, useRef, useCallback } from 'react';
import {
  GameLoop,
  UpdateCallback,
  RenderCallback,
} from '../../core/clases/GameLoop';

export default function useGameLoop(timestep?: number) {
  const loopRef = useRef<GameLoop | null>(null);

  // Store callbacks to avoid re-registering each render
  const updateCallbacksRef = useRef<Set<UpdateCallback>>(new Set());
  const renderCallbacksRef = useRef<Set<RenderCallback>>(new Set());

  // Initialize GameLoop once
  useEffect(() => {
    const loop = new GameLoop(timestep);
    loopRef.current = loop;

    // Register all callbacks in the loop
    updateCallbacksRef.current.forEach((cb) => loop.onUpdate(cb));
    renderCallbacksRef.current.forEach((cb) => loop.onRender(cb));

    loop.start();

    return () => {
      loop.stop();
      loopRef.current = null;
    };
  }, [timestep]);

  // Add an update callback
  const onUpdate = useCallback((cb: UpdateCallback) => {
    updateCallbacksRef.current.add(cb);
    const loop = loopRef.current;
    let remove: (() => void) | undefined;
    if (loop) {
      remove = loop.onUpdate(cb);
    }
    return () => {
      updateCallbacksRef.current.delete(cb);
      remove?.();
    };
  }, []);

  // Add a render callback
  const onRender = useCallback((cb: RenderCallback) => {
    renderCallbacksRef.current.add(cb);
    const loop = loopRef.current;
    let remove: (() => void) | undefined;
    if (loop) {
      remove = loop.onRender(cb);
    }
    return () => {
      renderCallbacksRef.current.delete(cb);
      remove?.();
    };
  }, []);

  // Control functions
  const start = useCallback(() => loopRef.current?.start(), []);
  const stop = useCallback(() => loopRef.current?.stop(), []);
  const pause = useCallback(() => loopRef.current?.pause(), []);
  const resume = useCallback(() => loopRef.current?.resume(), []);
  const destroy = useCallback(() => loopRef.current?.destroy(), []);
  const getFrameSinceStart = useCallback(
    () => loopRef.current?.getFrameSinceStart(),
    []
  );

  return {
    onUpdate,
    onRender,
    start,
    stop,
    pause,
    resume,
    destroy,
    getFrameSinceStart,
  };
}
