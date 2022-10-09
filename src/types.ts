export type Match = {
  problems: number;
  bonus_factor: number[];
  penalty: number;
};

export type Problem = {
  id: string;
  chunks: number;
  starts_at: number;
  time_limit: number;
  data: number;
};
