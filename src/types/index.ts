export type GameState = 'waiting' | 'in-progress' | 'finished';

export type Player = {
  id: string;
  name: string;
  score: number;
};

export type Card = {
  value: string;
  found: boolean;
};

export type Game = {
  id: string;
  creatorId: string;
  players: Player[];
  cards: Card[];
  state: GameState;
  turn: string;
  selectedCards: number[];
};
