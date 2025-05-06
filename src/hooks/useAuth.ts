import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { loginUser, logoutUser } from "../redux/slices/authSlice"
import { AuthService } from "../services/AuthService"
import { useNavigate } from "react-router"
import { URLS } from '../navigation/CONSTANTS';
type LoginParams = {
    access_token: string,
    refresh_token: string,
    username: string,
}
export const useAuth = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const username = useAppSelector((state) => state.auth.username)
    const doLogin = (params: LoginParams) => {
        dispatch(loginUser(params.username))
        localStorage.setItem("access_token", params.access_token);
        localStorage.setItem("refresh_token", params.refresh_token);
    }
    const doLogout = () => {
        dispatch(logoutUser())
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate(URLS.LOGIN)
    }
    useEffect(() => {
        new AuthService()
            .me()
            .then((response) => {
                // console.log("User data", response)
                if (response.username) {
                    dispatch(loginUser(response.username))
                }
            });
    }, [])

    return { username, doLogin, doLogout }
}