import Game from './Game';
import { GameProvider } from '../GameContext';
import './index.css';

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
