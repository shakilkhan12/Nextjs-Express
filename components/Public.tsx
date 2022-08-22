import { useSession } from "../context/AuthProvider"
import { useEffect } from "react"
import { useRouter } from "next/router";

const Public = (Component: any) => (props: any) => {
  const {auth, loading} = useSession();
  const router = useRouter();
  useEffect(() => {
    if(auth.auth) {
      router.push('/')
    }
  }, [auth,loading])
  return !loading && !auth.auth && <Component {...props} /> 
}

export default Public
