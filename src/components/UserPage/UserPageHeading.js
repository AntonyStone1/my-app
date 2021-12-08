import React from 'react'
import { useAuth } from 'hooks/useAuth/useAuth'

function UserPageHeading() {
  const { logOut } = useAuth()
  return (
    <div className="user_container-heading">
      <h1>User Page</h1>
      <button type="button" className="logout_btn" onClick={logOut}>
        Log Out
      </button>
    </div>
  )
}

export default UserPageHeading
