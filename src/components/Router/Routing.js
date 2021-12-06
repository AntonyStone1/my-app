import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth from 'components/Auth/Auth'
import UserList from 'components/UserList1/UserList'
import UserPage from 'components/UserPage2/UserPage'
import useUserData from '../../hooks/userUserData/useUserData'
import UserListHeading from '../UserList1/UserListHeading'
import UserPageHeading from '../UserPage2/UserPageHeading'
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
