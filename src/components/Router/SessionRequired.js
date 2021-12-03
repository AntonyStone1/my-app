import { Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { getItem } from '../../utils/localStorage'


export const SessionRequired = ({children}) => {
    const {isAuth, user} = useAuth()
    if (getItem(user.name) === user.password && isAuth) {
        return (<>{children}</>)
    }     
    return <Redirect to="/login"/>    
}