import { useEffect, useState } from "react";
import Button from "../component/Button";
import type { Problem } from "../types";
import styles from "./problem.module.scss";
import { Props, AnswerResponse } from "../types";

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
  const [problem, setProblem] = useState<Problem>();
  const [ansresp, setAnsResp] = useState<AnswerResponse>();

  async function fetchProblem(props: Props) {
    const res = await fetch(`${props.HOST}/problem`, {
      method: "get",
      headers: {
        "procon-token": props.PROCON_TOKEN,
      },
    });
    const json: Problem = await res.json();
    setProblem(json);
  }

  useEffect(() => {
    fetchProblem(props);
  }, [props]);

  if (typeof problem === "undefined") {
    return;
  }

  const problemStartAt = new Date(problem.starts_at * 1000).toLocaleTimeString(
    "ja-JP"
  );

  // 問題の回答
  const handleClick = async () => {
    const res = await fetch(`${props.HOST}/problem`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "procon-token": props.PROCON_TOKEN,
      },
      body: JSON.stringify({
        problem_id: problem.id,
        answers: ["01", "02"], // 何かしらで受け取った値を渡す
      }),
    });
    const json: AnswerResponse = await res.json();
    console.log(json);
    setAnsResp(json);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__table}>
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

      <div className={styles.wrapper__answer}>
        <div className={styles.container_answer}>
          <div className={styles.wrapper__button}>
            <Button text="回答する" onClick={handleClick} />
          </div>
          <div className={styles.wrapper__table}>
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
  );
};

export default Problem;
