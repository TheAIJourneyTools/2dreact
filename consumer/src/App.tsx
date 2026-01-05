import './App.css';
import { GameProvider } from '@2dreact/library';
import Game from './Game';

function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}

export default App;
