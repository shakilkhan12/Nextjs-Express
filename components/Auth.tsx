import { useContext, useEffect } from "react"
import AuthContext, { useSession } from "../context/AuthProvider";
import { useRouter } from "next/router";
const Auth = (Component: any) => {
  // const {auth, loading} = useSession();
  const {auth, loading} = useContext(AuthContext)
  console.log(auth, loading)
      const router = useRouter();
      useEffect(() => {
        console.log('use effect')
        if(!loading && !auth.auth) {  
          router.push('/login')
        }
      }, [auth,loading])
     
     const ComponentWrapper = (props: any) => auth.auth && <Component {...props} />  

     return <ComponentWrapper/>
}

export default Auth