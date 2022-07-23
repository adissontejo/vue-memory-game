export type Player = {
  id: string;
  name: string;
  score: 0;
};

export type Game = {
  id: string;
  players: Player[];
};
