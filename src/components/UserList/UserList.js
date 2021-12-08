import React from 'react'
import { useHistory } from 'react-router-dom'
import useUserData from '../../hooks/userUserData/useUserData'

const UserList = () => {
  const { userData } = useUserData()
  const history = useHistory()
  const handleClick = (e) => {
    history.push({
      pathname: `/home/user/${e.target.id}`,
    })
  }

  return userData ? (
    <div className="user_container">
      {userData.map((user, index) => (
        <div key={user.id} className="user_item" id={user.id} onClick={handleClick}>
          <p>
            {index + 1} {user.name}
          </p>
          <p>{user.company.name}</p>
          <p>{user.website}</p>
        </div>
      ))}
    </div>
  ) : (
    'loading...'
  )
}

export default UserList
