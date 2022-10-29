import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { n } = req.query;
  const url = `${process.env.HOST}/problem/chunks?n=${n}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "procon-token": process.env.PROCON_TOKEN ?? "",
    },
  });
  console.log(response);
  res.status(response.status).send(await response.text());
}
