import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserPage from '../UserPage/UserPage'
import useUserData from '../../hooks/userUserData/useUserData'

const UserList = () => {
  const { userData } = useUserData()
  const history = useHistory()
  const [show, setShow] = useState(false)

  const handleClick = (e) => {
    history.push({
      pathname: `/home/user/${e.target.id}`,
    })
  }

  const handleClose = () => {
    setShow(true)
  }

  return userData ? (
    <div className="user_container">
      {show.show ? (
        <UserPage />
      ) : (
        userData.map((user, index) => (
          <div key={user.id} className="user_item" id={user.id} onClick={handleClick}>
            <p>
              {index + 1} {user.name}
            </p>
            <p>{user.company.name}</p>
            <p>{user.website}</p>
          </div>
        ))
      )}
    </div>
  ) : (
    <span>Loading...</span>
  )
}

export default UserList
