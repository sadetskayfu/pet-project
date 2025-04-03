import { useSelector } from "react-redux"
import { authSelectors } from "../../slice/authSlice"
import { RegisterWindowByEmail } from "./RegisterWindowByEmail"
import { LoginWindowByEmail } from "./LoginWindowByEmail"

export const AuthWindow = () => {
    const authType = useSelector(authSelectors.getAuthType)

    if(authType === 'register-by-email') {
        return <RegisterWindowByEmail />
    }

    if(authType === 'login-by-email') {
        return <LoginWindowByEmail />
    }
}