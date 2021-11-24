import React, { useState } from "react";
import CreateActiveUserCard from './CreateActiveUserCard'


const CreateUser = ({ userData }) => {
  const [state, setState] = useState({
      show: false,
      userPassed: null,
  });
  const handleClick = (user) => {
    setState(prev => ({show: !prev.show, userPassed: prev.show ? null : user}))

  };

  return (
    <div className="user_container" >
     {state.show && (<CreateActiveUserCard user={state.userPassed} onClose={handleClick}/>)}

      {userData.map((user, index) => (
        <div
          key={user.id}
          className="user_item"
          onClick={() => handleClick(user)}
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

export default CreateUser;
