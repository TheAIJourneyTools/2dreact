import { GameObjects } from '../../core/clases/GameObjects';

export default function useGameObject() {
  const gameObjects = GameObjects.getInstance();

  return {
    addAll: gameObjects.addAll.bind(gameObjects),
    getPlatforms: gameObjects.getPlatforms.bind(gameObjects),
    seObjectMovement: gameObjects.setMovement.bind(gameObjects),
    seObjectJumping: gameObjects.setJumping.bind(gameObjects),
    get: gameObjects.get.bind(gameObjects),
  };
}
