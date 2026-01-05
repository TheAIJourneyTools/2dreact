// Game Provider
export { GameProvider } from './react/GameContext';

// Game Hooks
export { default as useGame } from './react/hooks/useGame';
export { default as useGameObject } from './react/hooks/useGameObject';
export { default as useGameLoop } from './react/hooks/useGameLoop';
export { default as useGameContext } from './react/hooks/useGameContext';
export { default as useGamePhysics } from './react/hooks/useGamePhysics';
export { default as useGameDom } from './react/hooks/useGameDom';
export { default as useGameAssets } from './react/hooks/useGameAssets';
export { default as useAnimGif } from './react/hooks/useAnimGif';

// Game Components
export { default as GameoverModal } from './react/components/modals/GameoverModal';
// Game Objects
export { default as Ground } from './react/objects/Ground';
export { default as Platform } from './react/objects/Platfom';
export { default as Player } from './react/objects/characters/Player';

// Game Constants
export * as gameConstants from './core/constants';

// Types
export type { AssetDescriptor, AssetType } from './react/hooks/useGameAssets';
