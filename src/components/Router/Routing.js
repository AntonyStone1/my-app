import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import UserPage from "../userPage/UserPage";
import UserList from "../../components/userList/UserList";
import useUserData from "../../hooks/userData/useUserData";
import { Auth } from "../../hooks/auth/Auth";
import UserListHeading from '../userList/UserListHeading'
import UserPageHeading from '../userPage/UserPageHeading'
import { useAuth } from "../../hooks/auth/useAuth";
import { SessionRequired } from "./SessionRequired";



export default function Routing() {
  const {setUserData} = useUserData()
  const {isAuth} = useAuth()
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/')
    .then(response => response.json())
    .then(res => {
      return setUserData(res)
    }) 
  }, [])

  return (
    <Router>
        <Switch>
            <Route path='/login' render={() => <Auth/>}/>
          <SessionRequired>
            <Route exact path="/home">
              <UserListHeading/>
              <UserList/>
            </Route>          
            <Route path='/home/user/:id'>
              <UserPageHeading/>
              <UserPage />
            </Route>            
          </SessionRequired>
        </Switch>
    </Router>
  );
}



