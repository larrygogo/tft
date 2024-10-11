export interface Piece {
  name: string;
  title: string;
  price: string;
  id: string;
  jobs: string[];
  type: PieceType;
}

export interface Job {
  name: string;
  type: JobType;
  id: string;
  bonus: number[];
  scope: number[];
  strength: number[];
}

export type PieceType = 'champion' | 'target' | 'golem';
export type JobType = "classes" | "origins";
