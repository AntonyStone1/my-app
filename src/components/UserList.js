import React, { useState, useEffect } from "react";
import UserPage from './UserPage'
import { useHistory} from "react-router-dom";
import useUserData from "../hooks/useUserData";

const UserList = () => {  
  const {userData, setUserData} = useUserData()
  console.log('UserList', userData);
  const history = useHistory();
  const [state, setState] = useState({
      show: false
  });
  const handleClick = (e) => {
    history.push({
      pathname: `/home/user/${e.target.id}`
    })
  };  

  

  const handleClose = () => {
    setState({show: false})
  };
 

  return userData ? (<div className="user_container" >     
    {state.show && (<UserPage onClose={handleClose}/>)}
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
  </div>) : ''
  
  
};

export default UserList;
