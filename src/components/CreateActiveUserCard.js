import React, { useRef, useState } from "react";


const CreateActiveUserCard = ({ user, onClose }) => {
    const [disable, setDisable] = useState({
        mayChange: true
    })
    const [inputValue, setInputValue] = useState({
        userName: user.name,
        userCompany: user.company.name,
        userWebsite: user.website,
    })
    const saveBtn = useRef()

    function handleStopPropag(e) {
        e.stopPropagation()
    }
    function handleClose() {
        onClose()
    }

    function clickAnimations() {
        saveBtn.current.classList.toggle('btn__hidden')
        setDisable(prev => ({mayChange: !prev.mayChange}))
    }
    function handleValue(e) {  
        setInputValue(prev => ({ ...prev, [e.target.name]: e.target.value}));
    }
    async function sendForm() {
        const newUserData = {
            name: inputValue.userName,
              company: {
                name: inputValue.userCompany
              },
              website: inputValue.userWebsite
            }
        
        console.log(user.id);
        await fetch('https://jsonplaceholder.typicode.com/users/' + user.id, {
            method: 'PUT',
            body: JSON.stringify(newUserData),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
    }

    return (        
      <div className="active_card-container" onClick={handleClose}>
        <div className="active_card-item" onClick={handleStopPropag}>
        <span className="close_btn" onClick={handleClose}></span>
          <div className="user_info">
          <form>
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
            <button  onClick={sendForm} ref={saveBtn} className="btn user_save-btn btn__hidden">Save</button>
            </form>
          </div>
          <div className="user_edit-btns">
              <button className="btn" onClick={clickAnimations}>Edit</button>
              
          </div>
        </div>
      </div>
    );
  };

export default CreateActiveUserCard