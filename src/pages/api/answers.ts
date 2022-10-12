import { NextApiRequest, NextApiResponse } from "next";

import { AnswerResponse } from "../../types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let answers: AnswerResponse | undefined;
  if (req.method === "GET") {
    res.status(200).json({
      answers: answers,
    });
  }

  if (req.method === "POST") {
    res.status(200).json({
      problem_id: req.body.problem_id,
      answers: req.body.answers,
      accepted_at: Date.now(),
    });
  }
}
