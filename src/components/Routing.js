import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import UserPage from "./UserPage";
import UserList from "./UserList";
import useUserData from "../hooks/useUserData";
import { Auth } from "./Login/Auth";
import UserListHeading from './UserListHeading'
import UserPageHeading from './UserPageHeading'
import { useAuth } from "./Login/useAuth";
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



