import react, { Children } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "./Login/useAuth";
import localStorage, { getItem } from '../utils/localStorage'


export const SessionRequired = ({children}) => {
    const {isAuth, user} = useAuth()
    if (getItem(user.name) === user.password && isAuth) {
        return (<>{children}</>)
    }     
    return <Redirect to="/login"/>    
}