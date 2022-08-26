import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axios from 'axios'
import NextNProgress from "nextjs-progressbar";
import Router,{ useRouter } from 'next/router';
import { Offline, Online } from "react-detect-offline";

import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthProvider';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENV === 'production' ? process.env.NEXT_PUBLIC_REMOTE_URL :  process.env.NEXT_PUBLIC_BASE_URL;
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const authRoutes = ['/register', '/login']
  const authRoute = authRoutes.includes(pathname);
  return <>
  <NextNProgress color="#10b981" />
  <Offline>
        <div className="fixed top-0 left-0 right-0 w-full z-10">
          <p className='bg-rose-100 p-4 rounded text-rose-700 font-medium text-center border-b-rose-200 border-b'>You are offline check you internet connection</p>
        </div>
      </Offline>
  <AuthProvider>
   
  {!authRoute && <Navbar />}
  <Component {...pageProps} />

  </AuthProvider>

  </>
}

export default MyApp
