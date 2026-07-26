import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/custom.css";
import { Ubuntu_Sans } from "next/font/google";
import Head from "next/head";

const ubuntu = Ubuntu_Sans({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>InvoicePro</title>
      </Head>
      <main className={ubuntu.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
