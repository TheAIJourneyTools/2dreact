import { AssetManager } from './AssetManager';
import { Dom } from './Dom';
import { GameLoop } from './GameLoop';
import { GameObjects } from './GameObjects';
import { Physics } from './Physics';

export class GameContext {
  type: 'DOM' | 'CANVAS' = 'DOM';
  status: 'playing' | 'game_over' = 'playing';

  readonly assets = AssetManager.getInstance();
  readonly loop = new GameLoop();
  readonly dom = new Dom();
  readonly objects = GameObjects.getInstance();
  readonly physics = new Physics();

  getType(): 'DOM' | 'CANVAS' {
    return this.type;
  }

  setStatus(status: 'playing' | 'game_over') {
    this.status = status;
  }
}
