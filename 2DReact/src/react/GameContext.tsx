import React, { createContext } from 'react';
import { GameContext as GameContextClass } from '../core/clases/GameContext';
export type GameContextValue = {
  ctx: {
    instance: GameContextClass;
    setGameStatus: (status: 'playing' | 'game_over') => void;
    status: 'playing' | 'game_over';
  };
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const ctx = new GameContextClass();
  const [status, setStatus] = React.useState(ctx.status);
  const setGameStatus = (status: 'playing' | 'game_over') => {
    ctx.setStatus(status);
    setStatus(status);
  };
  return (
    <GameContext.Provider
      value={{
        ctx: {
          instance: ctx,
          setGameStatus,
          status,
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContext;
