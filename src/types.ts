export type Props = {
  PROCON_TOKEN: string;
  HOST: string;
};

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

export type AnswerResponse = {
  problem_id: string;
  answers: string[];
  accepted_at: number;
};
