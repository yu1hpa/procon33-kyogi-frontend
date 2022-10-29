export type Props = {
  PROCON_TOKEN: string;
  HOST: string;
};

export type MatchProps = {
  problems: number;
  bonus_factor: number[];
  penalty: number;
};

export type Problem = {
  id: string;
  chunks: number;
  //本番サーバではstarts_atからstart_atに変更
  start_at: number;
  time_limit: number;
  data: number;
};

export type AnswerResponse = {
  problem_id: string;
  answers: string[];
  accepted_at: number;
};
