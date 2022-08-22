import axios from "axios";
import { getCustomRoute } from "next/dist/server/server-route-utils";
import { createContext, useState, ReactNode, useEffect, useContext } from "react";
interface Props {
    children: React.ReactNode;
  }
export const AuthContext = createContext({
    token: null,
    auth: {},
    loading: false
} as any);

export const AuthProvider = ({ children }: Props) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [auth, setAuth] = useState({auth: false, user: null, token: null});
    useEffect(() => {
       async function getUser() {
        setLoading(true)
          try {
            const {data}: any = await axios.get('/auth/check');
            console.log('response', data)
            setAuth({...data})
            setLoading(false)
          } catch (error) {
            setLoading(false)
            console.log(error)
          }
        }
        getUser()
    },[])

    return (
        <AuthContext.Provider value={{ auth,setAuth, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useSession = () => useContext(AuthContext);
export default AuthContext;