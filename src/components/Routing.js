import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserPage from "./UserPage";
import UserList from "./UserList";
import { GetUserData } from "..";

export default function Routing() {
  return (
    <Router>
      <div> 
        <Switch>
          <Route exact path="/">
            <UserList userData={GetUserData()}/>
          </Route>
          
          <Route path='/:id'>
            <UserPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



