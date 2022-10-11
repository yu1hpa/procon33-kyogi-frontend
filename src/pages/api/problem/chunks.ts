import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("chunks");
  console.log(req.query);
  if (typeof req.query === "undefined") {
    res.status(400).json({ error: "NotFound a query" });
    return;
  }
  console.log(Object.keys(req.query).length);
  if (Object.keys(req.query).length !== 1) {
    res.status(400).json({ error: "Check the length if it's correct" });
    return;
  }
  if (req.method === "POST") {
    res.status(200).json({
      chunks: [
        "problem2_f3bb62dda612fc62d16c332331fb784dd5ff4c0d8247d918ef59f9bf427dd547.wav",
        "problem1_8304cf20c797e3ddc3987d211d13adebbea9753c4646244caa6d7ec653c4f7b4.wav",
      ],
    });
  }
}
