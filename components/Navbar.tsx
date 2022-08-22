import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { FiSearch } from "react-icons/fi"
import AuthContext, { useSession } from '../context/AuthProvider'
const Navbar: React.FC = () => {
  const {auth,setAuth, loading} = useSession();
  const router = useRouter();
  const logout = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    };
      try {
        await axios.get('/auth/logout', config)
        setAuth({auth: false, user: null, token: null})
        router.push('/login')
      } catch (error) {
        console.log(error)
      }
  }
  return auth.auth && <nav className='bg-white fixed inset-x-0 top-0 z-10 flex items-center justify-center h-14 shadow-sm px-8'>
  <div className='flex items-center h-14'>
    <Link href={'/'}>
      <a className='block mt-2'>
        <Image src='/images/logo.png' alt='logo' width={90} height={50} />
      </a>
    </Link>
  </div>
  {/* search */}
 
  <div className='flex items-center border rounded pl-1.5 bg-[#f6f7f8] hover:border-emerald-600 focus:border-emerald-600 transition duration-500 mx-auto hover:bg-white focus:bg-white'>
    <FiSearch className='text-gray-400' size={20} />
    <input type="text" name="" id="" className='h-[36px] bg-transparent  py-1 pl-2 pr-3 rounded outline-none w-[450px] placeholder:font-light placeholder:text-sm placeholder:text-gray-500' placeholder='Search Reddit' />
  </div>
  {/* buttons */}
  <div className="flex">
    {!loading && !auth.auth ? <><Link href="/login">
      <a className="w-28  leading-6 py-1 button green hollow mr-4">log in</a>
    </Link>
    <Link href="/register">
      <a className="w-28  leading-6 py-1 button green">sign up</a>
    </Link></> :  <span className='cursor-pointer capitalize text-emerald-600 font-medium text-sm' onClick={logout}>logout</span>}
    
  </div>
 </nav>
}

export default Navbar