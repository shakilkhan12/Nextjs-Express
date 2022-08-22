import { useSession } from "../context/AuthProvider"
import { useEffect } from "react"
import { useRouter } from "next/router";

const Auth = (Component: any) => (props: any) => {
  const {auth, loading} = useSession();
  const router = useRouter();
  console.log('High order component', auth.auth)
  useEffect(() => {
    console.log('use effect')
    if(!loading && !auth.auth) {  
      router.push('/login')
    }
  }, [auth,loading])
  return auth.auth && <Component {...props} /> 
}

export default Auth
