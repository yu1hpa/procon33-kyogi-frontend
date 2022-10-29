import https from "https";

import httpProxyMiddleware from "next-http-proxy-middleware";

import type { NextApiRequest, NextApiResponse } from "next";

// ファイルのアップロードなどでmultipart/form-dataを使用するときの設定
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // const proxy = httpProxyMiddleware(req, res, {
  //   target: process.env.HOST,
  //   changeOrigin: true,
  //   headers: {
  //     'procon-token': process.env.PROCON_TOKEN ?? "",
  //   },
  //   pathRewrite: {
  //     '^/api/proxy': '',
  //   },
  //   agent:new https.Agent({
  //     rejectUnauthorized: false
  //   }),
  //   //secure: false,
  //   hostRewrite: "http://www-comm.cs.shinshu-u.ac.jp/netprog/",
  //   protocolRewrite: 'http'
  // })
  // return proxy
  return httpProxyMiddleware(req, res, {
    target: process.env.HOST,
    pathRewrite: [
      {
        patternStr: "^/api/proxy",
        replaceStr: "",
      },
    ],
    headers: {
      "procon-token": process.env.PROCON_TOKEN ?? "",
    },
  });
}
