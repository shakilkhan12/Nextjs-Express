import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios'
import NextNProgress from "nextjs-progressbar";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <NextNProgress color="#10b981" />
  <Component {...pageProps} />
  </>
}

export default MyApp
