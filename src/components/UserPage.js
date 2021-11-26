import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserList from "./UserList";

const UserPage = () => {
    const {location} = useHistory()
    console.log(location.state.user);
    const [disable, setDisable] = useState({
        mayChange: true
    })
    const [inputValue, setInputValue] = useState({
        userName: location.state.user.name,
        userCompany: location.state.user.company.name,
        userWebsite: location.state.user.website,
    })
    
    function handleStopPropag(e) {
        e.stopPropagation()
    }
    
    function toggleButton() {
        setDisable(prev => ({mayChange: !prev.mayChange}))
    }
    function handleValue(e) {  
        setInputValue(prev => ({ ...prev, [e.target.name]: e.target.value}));
    }
    function SendForm() {
      const newUserData = {
          name: inputValue.userName,
            company: {
              name: inputValue.userCompany
            },
            website: inputValue.userWebsite
          }
      fetch('https://jsonplaceholder.typicode.com/users/' + location.state.user.id, {
        method: 'PUT',
        body: JSON.stringify(newUserData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          toggleButton()
          console.log(json);
        }
      })       
        
    }
  return (
    <div className="user_page-container" >
    <h1 className='user-page-heading'>Home page of {location.state.user.name}</h1>
        <div className="user_page-item" onClick={handleStopPropag}>
        
          <div className="user_info">
          <label>Full name: 
          <input
            onChange={handleValue}
            name='userName'
            type='text'
            value={inputValue.userName} 
            disabled={disable.mayChange}/>
          </label>

            <label>Company: 
            <input 
                onChange={handleValue}
                name='userCompany'
                type='text'
                value={inputValue.userCompany} 
                disabled={disable.mayChange}/>
            </label>

            <label >Website: 
            <input 
                onChange={handleValue}
                name='userWebsite'
                type='text'
                value={inputValue.userWebsite}
                disabled={disable.mayChange}
                />
            </label>
            {!disable.mayChange && <button  onClick={SendForm} className="btn user_save-btn">Save</button>}
          </div>
          <div className="user_edit-btns">
              <button className="btn" onClick={toggleButton}>Edit</button>
          </div>
        </div>
      </div>
  );
};

export default UserPage