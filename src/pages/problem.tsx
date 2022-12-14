import { useState } from "react";
import useSWR from "swr";

import { fetcher } from "../commons";
import Button from "../component/Button";
import ErrorCard from "../component/ErrorCard";
import SuccessCard from "../component/SuccessCard";

import styles from "./problem.module.scss";

import type { Props, Problem, AnswerResponse } from "../types";

type Answers = {
  answers: string[];
};

export const getStaticProps = async () => {
  if (typeof process.env.PROCON_TOKEN === "undefined") {
    return;
  }

  return {
    props: {
      PROCON_TOKEN: process.env.PROCON_TOKEN,
      HOST: process.env.HOST,
    },
  };
};

const Problem = (props: Props) => {
  const [answers, setAnswers] = useState<Answers>();
  const [ansresp, setAnsResp] = useState<AnswerResponse>();
  const [isSendSuccess, setSendSuccess] = useState<boolean>();

  const { data: problem, error } = useSWR<Problem, Error>(
    [
      `${props.HOST}/problem`,
      {
        headers: {
          "procon-token": props.PROCON_TOKEN,
        },
      },
    ],
    fetcher
  );

  if (typeof error !== "undefined") {
    return (
      <div className={styles.wrapper__center}>
        <ErrorCard>{error.message}</ErrorCard>
      </div>
    );
  }

  if (typeof problem === "undefined") return;
  const problemStartAt = new Date(problem.start_at * 1000).toLocaleTimeString(
    "ja-JP"
  );

  // 問題の回答
  const handleClick = async () => {
    if (typeof answers === "undefined") {
      return;
    }
    const res = await fetch(`${props.HOST}/problem`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "procon-token": props.PROCON_TOKEN,
      },
      body: JSON.stringify({
        problem_id: problem.id,
        answers: answers.answers,
      }),
    });
    const json: AnswerResponse = await res.json();
    setAnsResp(json);
  };

  //重ね合わせ数を送信
  const handleClickSendStacknum = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STACKNUM_ENDPOINT}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: problem.data,
        }),
      });
      console.log(res);
      setSendSuccess(true);
    } catch {
      setSendSuccess(false);
    }
  };

  const handleGetAnswers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PREDICT_ENDPOINT}`, {
        method: "get",
      });
      if (res.ok) {
        const json: Answers = await res.json();
        console.log(json);
        setAnswers(json);
      }
    } catch {
      console.log("ansersを取得する際にエラーが発生");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__center}>
          <table className={styles.table__problem}>
            <thead>
              <tr>
                <th colSpan={2}>問題の情報</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>問題ID</td>
                <td>{problem.id}</td>
              </tr>
              <tr>
                <td>分割数</td>
                <td>{problem.chunks}</td>
              </tr>
              <tr>
                <td>開始時間</td>
                <td>{problemStartAt}</td>
              </tr>
              <tr>
                <td>時間制限</td>
                <td>{problem.time_limit}</td>
              </tr>
              <tr>
                <td>重ね合わせ数</td>
                <td>{problem.data}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <div className={styles.wrapper__center}>
            <Button
              text="重ね合わせ数を送信"
              onClick={handleClickSendStacknum}
            />
          </div>
          {typeof isSendSuccess !== "undefined" ? (
            <div className={styles.wrapper__center}>
              {isSendSuccess === true ? (
                <SuccessCard>成功しました</SuccessCard>
              ) : (
                <ErrorCard>失敗しました</ErrorCard>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>

        <div>
          <div className={styles.wrapper__center}>
            <Button text="answersを取得" onClick={handleGetAnswers} />
          </div>
          {typeof answers !== "undefined" ? (
            <div className={styles.wrapper__center}>
              {'{"answers": '}
              {answers.answers.map((v) => {
                return [
                  <span key={v}>
                    {'"'}
                    {v}
                    {'"'}
                  </span>,
                ];
              })}
              {"}"}
            </div>
          ) : (
            <div className={styles.wrapper__center}>
              <p>まだ取得していません</p>
            </div>
          )}
        </div>

        <div className={styles.wrapper__center}>
          <div className={styles.container_answer}>
            <div className={styles.wrapper__button}>
              <Button text="回答する" onClick={handleClick} />
            </div>
            <div className={styles.wrapper__center}>
              {typeof ansresp !== "undefined" ? (
                <table className={styles.table__problem}>
                  <thead>
                    <tr>
                      <th colSpan={2}>レスポンス</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>problem_id</td>
                      <td>{ansresp.problem_id}</td>
                    </tr>
                    <tr>
                      <td>answers</td>
                      <td>
                        [
                        {ansresp.answers.map((v) => {
                          return [<span key={v.toString()}>{v}</span>];
                        })}
                        ]
                      </td>
                    </tr>
                    <tr>
                      <td>accepted_at</td>
                      <td>{ansresp.accepted_at}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>まだ回答してません</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Problem;
