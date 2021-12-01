import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserPage from "./UserPage";
import UserList from "./UserList";



export default function Routing() {

  return (
    <Router>
      <div> 
        <Switch>
          <Route exact path="/">
            <UserList/>
          </Route>
          
          <Route path='/:id'>
            <UserPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}



