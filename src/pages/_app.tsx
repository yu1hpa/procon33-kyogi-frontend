import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/_reset.scss";
import Header from "../component/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
