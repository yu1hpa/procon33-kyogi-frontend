import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res
      .status(200)
      .json({ problems: 2, bonus_factor: [1.2, 1.1, 1], penalty: 100 });
  }
}
