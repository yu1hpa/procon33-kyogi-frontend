import useSWR from "swr";

import { fetcher } from "../commons";
import ErrorCard from "../component/ErrorCard";

import styles from "./match.module.scss";

import type { MatchProps, Props } from "../types";

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

const Match = (props: Props) => {
  const { data: match, error } = useSWR<MatchProps, Error>(
    [
      `${props.HOST}/match`,
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

  return (
    <div className={styles.wrapper}>
      {!match ? (
        <p>loading...</p>
      ) : (
        <>
          <div className={styles.wrapper__center}>
            <table className={styles.match_table}>
              <thead>
                <tr>
                  <th colSpan={2}>試合の情報</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>問題数</td>
                  <td>{match.problems}</td>
                </tr>
                <tr>
                  <td>ボーナス係数</td>
                  <td>{match.penalty}</td>
                </tr>
                <tr>
                  <td>変更札に適用される係数</td>
                  <td>
                    [
                    {match.bonus_factor.map((v) => {
                      return [<span key={v.toString()}>{v}</span>];
                    })}
                    ]
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Match;
