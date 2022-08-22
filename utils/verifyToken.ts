import axios from "axios";
import jwtDecode from "jwt-decode"
const verifyToken = (token: string) => {
    if(token) {
        const decoded: any = jwtDecode(token);
        const expiresIn = new Date(decoded.exp * 1000);
        if(new Date() > expiresIn) {
            try {
            axios.delete('/auth/logout');
            return null;
            } catch (error) {
                console.log(error)
            }
        } else {
            return {token, decoded};
        }
    } else {
        return null
    }  
}
export default verifyToken;