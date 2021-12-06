import React from 'react'
import { Redirect } from 'react-router-dom'
// import T from 'prop-types'
import { useAuth } from '../../hooks/useAuth/useAuth'
import { getItem } from '../../utils/localStorage'

// eslint-disable-next-line react/prop-types
const SessionRequired = ({ children }) => {
  const { isAuth, user } = useAuth()
  if (getItem(user.name) === user.password && isAuth) {
    return <>{children}</>
  }
  return <Redirect to="/login" />
}

// SessionRequired.propTypes = {
//   children: T.node,
// }

export default SessionRequired
