import type { NextPage,GetServerSideProps } from 'next'
import Head from 'next/head'
const Home: NextPage= () => {

  console.log(process.env.NEXT_PUBLIC_BASE_URL)
  return (
    <div>
      <Head>
        <title>Reddit: Dive into anything</title>
        <meta name="description" content="reddit home page" />
      </Head>
    </div>
  )
}



export default Home
// https://youtu.be/60c_aENTUi4?list=PLMhAeHCz8S38HfrRtzfzFD5NTbjgQxcpD&t=637
