export type GameState = 'waiting' | 'in-progress' | 'finished';

export type Player = {
  id: string;
  name: string;
  score: 0;
};

export type Card = {
  color: string;
  found: boolean;
};
