import React, { useState } from "react";
import UserPage from './UserPage'
import { useHistory} from "react-router-dom";

const UserList = ({ userData }) => {
  const history = useHistory();
  const [state, setState] = useState({
      show: false,
      userPassed: null,
  });
  const handleClick = (e) => {
    history.push({
      pathname: `/${e.target.id}`
    })
  };

  const handleClose = () => {
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
          onClick={(e) => handleClick(e)}
          >
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
