import { useContext, useEffect } from "react"
import AuthContext, { useSession } from "../context/AuthProvider";
import { useRouter } from "next/router";
const withAuth = (Component: any) => (props: any) => {
    const {auth, loading} = useSession();
    const router = useRouter();
    useEffect(() => {
      if(!loading && !auth.auth) {  
        router.push('/login')
      }
    }, [auth,loading])
    return <Component {...props} />
}

export default withAuth