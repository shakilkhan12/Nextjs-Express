import type { NextPage,GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from "next/link"
import { useState } from 'react'
import axios from "axios"
import className from "classnames"
import { useRouter } from 'next/router'
import InputGroup from '../components/InputGroup'
type StateType = {
  email: string,
  password: string,
  username: string,
}
type ErrorsType = {
  [key: string]: string;
}

const Register: NextPage = () => {
  console.log(process.env.NEXT_PUBLIC_BASE_URL)
  // NEXT_PUBLIC_BASE_URL
  const [state, setState] = useState<StateType>({
    username: '',
    email: '',
    password: ''
  })
  const [agreement, setAgreement] = useState(false)
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
        if(!agreement) {
          setErrors({...errors, agreement: 'You must be agree to our terms and conditions!'})
          setLoading(false)
          return;
        }
        try {
          const { data } = await axios.post('/auth/register', state);
          console.log(data)
          setLoading(false)
          router.push('/login')
        } catch (error: any) {
          setLoading(false)
          console.log(error)
          // if(error.message) {
          //   setErrors({message: error.message})
          //   return;
          // }
          setErrors(error?.response?.data ? error.response.data : {})
        }
  }
  console.log(errors)
  return (
    <div>
      <Head>
        <title>Register</title>
        <meta name="description" content="register page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <div className='flex overflow-hidden relative bg-white'>
      <div className='sm:w-36 w-0 h-screen bg-[url(/images/bg.jpg)] bg-full bg-no-repeat bg-cover bg-center'></div>
      <div className='flex flex-col justify-center px-6 w-full sm:w-10/12 md:w-7/12 lg:w-5/12 xl:w-3/12 '>
        <h1 className='text-lg font-medium capitalize mb-2'>sign up</h1>
        <p className='mb-10 text-sm'>By continuing, you are setting up a Reddit account and agree to our User Agreement and Privacy Policy.</p>
        <div className='mb-6 flex items-center'>
            <input type="checkbox" name="" id="aggrement" className='mr-2 cursor-pointer' checked={agreement} onChange={ e => setAgreement(e.target.checked)} />
            <label htmlFor="aggrement" className='text-[13px] cursor-pointer'>I agree to get emails about cool stuff on reddit</label>
        </div>
        <form className='w-full' onSubmit={submitForm}>
          
        <InputGroup classNames="mb-3" type='email' placeholder='email...' value={state.email} onChange={onChange} error={errors?.email} name="email" />
            <InputGroup classNames="mb-3" type='text' placeholder='username...' value={state.username} onChange={onChange} error={errors?.username} name="username" />
            <InputGroup classNames="mb-3" type='password' placeholder='password...' value={state.password} onChange={onChange} error={errors?.password} name="password" />
            <div className='mb-3'>
            <button className="block w-full rounded uppercase font-medium bg-emerald-600 text-white py-3 px-2.5 hover:bg-emerald-800 transition duration-700 cursor-pointer disabled:bg-emerald-400 disabled:cursor-not-allowed text-center" disabled={loading ? true : false}>
              {loading ? <span className='block w-[15px] h-[15px] rounded-full border-2 border-white border-r-transparent m-auto animate-spin'></span> : `sign up`}
            </button>
            </div>
            <span className='block text-rose-600 text-[13px] font-medium mb-2'>{errors?.agreement}</span>
            <span className='block text-rose-600 text-[13px] font-medium mb-2'>{errors?.message}</span>
        </form>
        <small className='text-sm'>
          Already a redditor?
          <Link href="/login">
            <a className='ml-2 text-emerald-600 font-bold uppercase text-xs'>log in</a>
          </Link>
        </small>
      </div>
    </div>
    </div>
  )
}


export default Register;
