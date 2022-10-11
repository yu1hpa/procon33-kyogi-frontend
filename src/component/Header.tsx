import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className="">
      <div className={styles.header_container}>
        <menu className={styles.header}>
          <Link href="/">トップページ</Link>
          <Link href="/match">試合の情報</Link>
          <Link href="/problem">問題の情報</Link>
          <Link href="/chunks">分割データの取得</Link>
        </menu>
      </div>
    </header>
  );
};

export default Header;
