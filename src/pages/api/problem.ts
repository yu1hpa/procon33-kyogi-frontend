import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json({
      id: "qual-1-1",
      chunks: 2,
      starts_at: 1665019861,
      time_limit: 120,
      data: 3,
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
