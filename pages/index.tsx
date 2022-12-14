import type { NextPage,GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'

import dayjs from "dayjs"
import {decode} from 'html-entities';
import { FaRegCommentAlt,FaShare } from "react-icons/fa"
import {BsBookmark} from "react-icons/bs"
import relativeTime from "dayjs/plugin/relativeTime"
import { HomeProps } from '../interfaces/HomeProps'
import { url } from "../utils/utils"
import Votes from '../components/Votes'
import PostCard from '../components/PostCard'
import verifyToken from '../utils/verifyToken'
import { AuthContext } from '../context/AuthProvider'
import withAuth from '../components/Auth'

dayjs.extend(relativeTime)
const Home: NextPage<HomeProps>= ({posts, token}) => {
  
  const {  setLoading} = useContext(AuthContext)
    const verify = verifyToken(token)
  

  return (
    <>
      <Head>
        <title>Reddit: Dive into anything</title>
        <meta name="description" content="reddit home page" />
      </Head>
     
     
      <div className="w-full md:max-w-5xl mt-20 px-8 mx-auto">
       <div className='flex'>
       {/* Posts feed */}
       <div className='w-[70%] bg-gray-100'>
        {posts.length > 0 && posts.map(post => {
          return (
            <PostCard post={post} key={post._id} />
          )
        })}
       </div>
       {/* Sidebar */}
       </div>
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
     const response = await fetch(`${url}/posts`);
      const posts: HomeProps = await response.json();
      const cookies = context.req.headers.cookie;
      const token = cookies?.split('=')[1];

      return {
        props: {
          posts,
          token: token ? token : null
        }
      }
}
export default withAuth(Home)
// https://youtu.be/NeSrhfs9I34?list=PLMhAeHCz8S38HfrRtzfzFD5NTbjgQxcpD&t=1783
