import Head from "next/head";
import Link from "next/link";

import Button from "../component/Button";
import { Props } from "../types";

import styles from "./index.module.scss";

import type { NextPage } from "next";

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

const Home: NextPage<Props> = (props) => {
  const handleClick = async () => {
    try {
      const res = await fetch(`${props.HOST}/test`, {
        headers: {
          "procon-token": props.PROCON_TOKEN,
        },
      });
      if (res.status === 200) {
        console.log(res.statusText);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Head>
        <title>高専プロコン 第33回群馬大会 競技部門</title>
        <meta name="description" content="Procon33 Kyogi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles.wrapper}>
          <div className={styles.wrapper__main}>
            <div className={styles.main}>
              <h1 className={styles.main__h1}>第33回 高専プロコン 競技部門</h1>
              <Link href="https://www.procon.gr.jp/?page_id=78119/">
                <a className={styles.main__link}>群馬大会(2022)</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.wrapper__center}>
          <Button text="/testにリクエスト" onClick={handleClick} />
        </div>
      </main>
    </div>
  );
};

export default Home;
