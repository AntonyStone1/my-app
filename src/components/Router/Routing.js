import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Auth from 'components/Auth/Auth'
import UserPage from 'components/UserPage/UserPage'
import axios from 'axios'
import NewAuth from 'components/Auth/Auth'
import AntdUserList from 'components/UserList/AntdUserList'
import useUserData from '../../hooks/userUserData/useUserData'
import UserListHeading from '../UserList/UserListHeading'
import UserPageHeading from '../UserPage/UserPageHeading'
import SessionRequired from './SessionRequired'

export default function Routing() {
  const { setUserData } = useUserData()
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users/')
      .then((response) => setUserData(response.data))
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/login" render={() => <NewAuth />} />
        <Route path="/registration" render={() => <NewAuth />} />
        <SessionRequired>
          <Route exact path="/home">
            <UserListHeading />
            <AntdUserList />
          </Route>
          <Route path="/home/user/:id">
            <UserPageHeading />
            <UserPage />
          </Route>
        </SessionRequired>
      </Switch>
    </Router>
  )
}
