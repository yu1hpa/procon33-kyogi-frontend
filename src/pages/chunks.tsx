import Link from "next/link";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";

import Button from "../component/Button";
import Input from "../component/Input";

import styles from "./chunks.module.scss";

import type { Props } from "../types";

type Chunks = {
  chunks: string[];
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

const Chunks = (props: Props) => {
  const [query, setQuery] = useState<string>();
  const [chunks, setChunks] = useState<Chunks>();

  async function fetchChunks(props: Props, query: string) {
    const res = await fetch(`${props.HOST}/problem/chunks?n=${query}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "procon-token": props.PROCON_TOKEN,
      },
    });
    const json = await res.json();
    console.log(json);
    setChunks(json);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onClickForm = () => {
    if (typeof query === "undefined") {
      return;
    }
    fetchChunks(props, query);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.wrapper__input}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              onClickForm();
            }}
          >
            <Input
              type="number"
              value={query}
              onChange={(e) => handleChange(e)}
              placeholder="分割数"
            />
            <Button text="取得" onClick={onClickForm} />
          </form>
        </div>
        {typeof chunks === "undefined" ? (
          <div className={styles.wrapper__center}>
            <p>まだ取得していません</p>
          </div>
        ) : (
          <>
            {chunks.chunks.map((v) => {
              return (
                <div className={styles.wrapper__center} key={v.toString()}>
                  <ul>
                    <li>
                      <div className={styles.chunks}>
                        <Link
                          href={`${props.HOST}/problem/chunks/${v}?token=${props.PROCON_TOKEN}`}
                          download
                        >
                          {v}
                        </Link>
                        <IoMdDownload />
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Chunks;
