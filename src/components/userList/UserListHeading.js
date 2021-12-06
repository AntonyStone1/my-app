import React from 'react'
import { useAuth } from '../../hooks/useAuth/useAuth'

function UserListHeading() {
  const { logOut } = useAuth()
  return (
    <>
      <div className="user_heading-container">
        <h1 className="user_headt-text">User list</h1>
        <button type="button" className="logout_btn" onClick={() => logOut()}>
          Log Out
        </button>
      </div>
    </>
  )
}

export default UserListHeading
