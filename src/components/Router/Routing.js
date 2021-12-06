import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth from 'components/Auth/Auth'
import UserList from 'components/UserList/UserList'
import UserPage from 'components/UserPage/UserPage'
import useUserData from '../../hooks/userUserData/useUserData'
import UserListHeading from '../UserList/UserListHeading'
import UserPageHeading from '../UserPage/UserPageHeading'
import SessionRequired from './SessionRequired'

export default function Routing() {
  const { setUserData } = useUserData()
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/')
      .then((response) => response.json())
      .then((res) => setUserData(res))
  }, [])

  return (
    <Router>
      <Switch>
        <Route path="/login" render={() => <Auth />} />
        <SessionRequired>
          <Route exact path="/home">
            <UserListHeading />
            <UserList />
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
