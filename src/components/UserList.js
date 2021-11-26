import React, { useState } from "react";
import UserCard from './UserCard'


const UserList = ({ userData }) => {
  const [state, setState] = useState({
      show: false,
      userPassed: null,
  });
  const handleClick = (e) => {
    setState({show: true, userPassed: userData.find(el => String(el.id) === e.currentTarget.id)})
  };

  const handleClose = () => {
    setState({show: false, userPassed: null})
  };

  return (
    <div className="user_container" >
     {state.show && (<UserCard user={state.userPassed} onClose={handleClose}/>)}

      {userData.map((user, index) => (
        <div
          key={user.id}
          className="user_item"
          id={user.id}
          onClick={handleClick}
        >
          <p>
            {index + 1} {user.name}
          </p>
          <p>{user.company.name}</p>
          <a href="#">{user.website}</a>
        </div>
      ))}
    </div>
  );
};

export default UserList;
