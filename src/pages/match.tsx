import styles from "./match.module.scss";
import type { Match } from "../types";

export const getStaticProps = async () => {
  if (typeof process.env.PROCON_TOKEN === "undefined") {
    return;
  }

  const res = await fetch(`${process.env.HOST}/match`, {
    method: "get",
    headers: {
      "procon-token": process.env.PROCON_TOKEN,
    },
  });
  const match: Match = await res.json();
  return { props: match };
};

const Match = (match: Match) => {
  return (
    <div className={styles.wrapper}>
      {typeof match === "undefined" ? (
        <p>loading...</p>
      ) : (
        <>
          <div className={styles.wrapper__table}>
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
