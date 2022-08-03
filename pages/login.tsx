import type { NextPage,GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from "next/link"
import { useState } from 'react'
import axios from "axios"
import className from "classnames"
import { useRouter } from 'next/router'
import InputGroup from '../components/InputGroup'
type StateType = {
  password: string,
  username: string,
}
type ErrorsType = {
  [key: string]: string;
}

const Login: NextPage = () => {
  const [state, setState] = useState<StateType>({
    username: '',
    password: ''
  })
  const [errors, setErrors] = useState<ErrorsType>({})
  const [loading, setLoading] = useState(false)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }
  const router = useRouter();
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
        e.preventDefault()
        try {
          const { data } = await axios.post('/auth/login', state);
          console.log(data)
          setLoading(false)
          router.push('/')
        } catch (error: any) {
          console.log(error)
          setLoading(false)
          setErrors(error?.response?.data)
        }
  }
  console.log(errors)
  return (
    <div>
      <Head>
        <title>sign in</title>
        <meta name="description" content="Sign In" />
      </Head>

    <div className='flex overflow-hidden relative bg-white'>
      <div className='sm:w-36 w-0 h-screen bg-[url(/images/bg.jpg)] bg-full bg-no-repeat bg-cover bg-center'></div>
      <div className='flex flex-col justify-center px-6 w-full sm:w-10/12 md:w-7/12 lg:w-5/12 xl:w-3/12 '>
        <h1 className='text-lg font-medium capitalize mb-2'>log in</h1>
        <p className='mb-10 text-sm'>By continuing, you are setting up a Reddit account and agree to our User Agreement and Privacy Policy.</p>
        <form className='w-full' onSubmit={submitForm}>
          
            <InputGroup classNames="mb-3" type='text' placeholder='username...' value={state.username} onChange={onChange} error={errors?.username} name="username" />
            <InputGroup classNames="mb-3" type='password' placeholder='password...' value={state.password} onChange={onChange} error={errors?.password} name="password" />
            <div className='mb-3'>
            <button className="block w-full rounded uppercase font-medium bg-emerald-600 text-white py-3 px-2.5 hover:bg-emerald-800 transition duration-700 cursor-pointer disabled:bg-emerald-400 disabled:cursor-not-allowed text-center" disabled={loading ? true : false}>
              {loading ? <span className='block w-[15px] h-[15px] rounded-full border-2 border-white border-r-transparent m-auto animate-spin'></span> : `log in`}
            </button>
            </div>
        </form>
        <small className='text-sm'>
          New to Reddit?
          <Link href="/register">
            <a className='ml-2 text-emerald-600 font-bold uppercase text-xs'>sign up</a>
          </Link>
        </small>
      </div>
    </div>
    </div>
  )
}


export default Login;
