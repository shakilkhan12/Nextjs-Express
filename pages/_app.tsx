import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios'
import NextNProgress from "nextjs-progressbar";
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENV === 'production' ? process.env.NEXT_PUBLIC_REMOTE_URL :  process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login']
  const authRoute = authRoutes.includes(pathname);
  return <>
  <NextNProgress color="#10b981" />
  {!authRoute && <Navbar />}
  <Component {...pageProps} />

  </>
}

export default MyApp
