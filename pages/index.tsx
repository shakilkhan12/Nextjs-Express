import type { NextPage,GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Offline, Online } from "react-detect-offline";
import dayjs from "dayjs"
import {decode} from 'html-entities';
import { FaRegCommentAlt,FaShare } from "react-icons/fa"
import {BsBookmark} from "react-icons/bs"
import relativeTime from "dayjs/plugin/relativeTime"
import { HomeProps } from '../interfaces/HomeProps'
import { url } from "../utils/utils"

dayjs.extend(relativeTime)
const Home: NextPage<HomeProps>= ({posts}) => {

  return (
    <>
      <Head>
        <title>Reddit: Dive into anything</title>
        <meta name="description" content="reddit home page" />
      </Head>
      <Offline>
        <div className="w-full md:max-w-5xl mt-20 px-8 mx-auto">
          <p className='bg-rose-100 p-4 rounded text-rose-700 font-medium'>You are offline check you internet connection</p>
        </div>
      </Offline>
      <div className="w-full md:max-w-5xl mt-20 px-8 mx-auto">
       <div className='flex'>
       {/* Posts feed */}
       <div className='w-[70%] bg-gray-100'>
        {posts.length > 0 && posts.map(post => {
          const url = `/r/${post.sub.name}/${post.identifier}/${post.slug}`
          return(
          <div key={post._id} className="bg-white flex mb-4 rounded">
          {/* Vote section */}
          <div className='w-10 text-center bg-gray-200 rounded-l'>
            <p>V</p>
          </div>
          {/* Post section */}
          <div className='w-full p-2'>
            <div className='flex items-center'>
              <Link href={`/r/${post.sub.name}`}>
                <>
                <Image src="https://i.pravatar.cc/" className='rounded-full cursor-pointer' width={20} height={20} />
                <a className='text-xs font-bold hover:underline ml-1.5 cursor-pointer'>
                  r/{post.sub.name}
                </a>
                </>
              </Link>
              <p className='text-xs text-gray-600 flex items-center'>
               <span className='inline-block w-[4px] h-[4px] bg-gray-500 rounded-full mx-1'></span> Posted by
               <Link href={`/u/${post.user.username}`}>
                <a className='hover:underline mx-1'>u/{post.user.username}</a>
               </Link>
               <Link href={`${url}`}>
                <a className='mx-1'>{dayjs(post.createdAt).fromNow()}</a>
               </Link>
              </p>
            </div>
            <Link href={url}>
              <a className='my-1 text-lg font-medium'>{post.title}</a>
            </Link>
            <p className='my-1 text-sm'>{decode(post.body)}</p>
            <div className='flex'>
              <Link href={url}>
                <a className='flex items-center'>
                  <div className='flex items-center mr-2 p-1.5 text-gray-500 rounded cursor-pointer hover:bg-gray-100'>
                    <FaRegCommentAlt size={13} className="text-gray-400" />
                    <span className='ml-1.5 text-xs font-bold text-gray-400 capitalize'>20 comments</span>
                  </div>
                </a>
              </Link>
              <div className='flex items-center mr-2 p-1.5 text-gray-500 rounded cursor-pointer hover:bg-gray-100'>
                    <FaShare size={13} className="text-gray-400" />
                    <span className='ml-1.5 text-xs font-bold text-gray-400 capitalize'>share</span>
                  </div>
              <div className='flex items-center mr-2 p-1.5 text-gray-500 rounded cursor-pointer hover:bg-gray-100'>
                    <BsBookmark size={13} className="text-gray-400" />
                    <span className='ml-1.5 text-xs font-bold text-gray-400 capitalize'>save</span>
                  </div>
            </div>
          </div>
          </div>
        )})}
       </div>
       {/* Sidebar */}
       </div>
      </div>
    </>
  )
}
export const getServerSideProps: GetServerSideProps = async () => {
     const response = await fetch(`${url}/posts`);
      const posts = await response.json();
      console.log(posts)
      return {
        props: {
          posts
        }
      }
}
export default Home
// https://youtu.be/NeSrhfs9I34?list=PLMhAeHCz8S38HfrRtzfzFD5NTbjgQxcpD&t=1783
