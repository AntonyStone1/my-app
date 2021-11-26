import React, { useState } from "react";
// import UserCard from './UserCard'
import UserPage from './UserPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

const UserList = ({ userData }) => {
  const history = useHistory()
  const [state, setState] = useState({
      show: false,
      userPassed: null,
  });
  const handleClick = (e, user) => {
    history.push({
      pathname: `/user/${e.target.id}` ,
      state: { user }
    })
  };

  const handleClose = (e) => {
    setState({show: false, userPassed: null})
  };

  return (

    <div className="user_container" >     
      {state.show && (<UserPage user={state.userPassed} onClose={handleClose}/>)}
      { !state.show && (userData.map((user, index) => (        
        <div
          key={user.id}
          className="user_item"
          id={user.id}
          onClick={(e) => handleClick(e, user)}>
          <p>
            {index + 1} {user.name}
          </p>
          <p>{user.company.name}</p>
          <p>{user.website}</p>
        </div>
      )))}
    </div>
  );
};

export default UserList;
