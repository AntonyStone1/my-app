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
        saveBtn.current.classList.toggle('btn__no-active')
        setDisable(prev => ({mayChange: !prev.mayChange}))
    }
    function handleValue(e) {
        setInputValue({userName: e.target.value})
        console.log(e.target.value);
    }
    return (
      <div className="active_card-container" onClick={handleClose}>
        <div className="active_card-item" onClick={handleStopPropag}>
          <div className="user_info">
          <label>Full name: 
          <input
            onChange={handleValue}
            type='text'
            value={inputValue.userName} 
            disabled={disable.mayChange}/>
          </label>

            <label>Company: 
            <input 
                // onChange={handleValue}
                type='text'
                value={inputValue.userCompany} 
                disabled={disable.mayChange}/>
            </label>

            <label >Website: 
            <input 
                // onChange={handleValue}
                type='text'
                value={inputValue.userWebsite}
                disabled={disable.mayChange}
                />
            </label>
            
            
          </div>
          <div className="user_edit-btns">
              <button className="btn" onClick={clickAnimations}>Edit</button>
              <button ref={saveBtn} className="btn btn__no-active">Save</button>
          </div>
        </div>
      </div>
    );
  };

export default CreateActiveUserCard