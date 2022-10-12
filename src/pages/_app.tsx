import Header from "../component/Header";

import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/_reset.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
