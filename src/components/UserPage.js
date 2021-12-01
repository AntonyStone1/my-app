import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import useUserData from "../hooks/useUserData";
import { useHistory} from "react-router-dom";

const UserPage = () => {
    const [disable, setDisable] = useState({
        mayChange: true
    })   

    const Context = useUserData()
    console.log('Page', Context.userData);

    const history = useHistory();

    const [inputValue, setInputValue] = useState({
      name: '',
      company: {
        name: ''
      },
      website: ''
    })

    const { id } = useParams();

    // useEffect(() => {
    //   Context.userData && Context.userData.forEach(user => {
    //     if (user.id === +id) {
    //       console.log('user', user);
    //       setInputValue(user)
    //     }
    //   }) 
    // }, [])    
       
    function handleStopPropag(e) {
        e.stopPropagation()
    }
    
    function toggleButton() {
        setDisable(prev => ({mayChange: !prev.mayChange}))
    }
    useEffect(() => {
      if (Context.isLoaded) {
        setInputValue(Context.userData[id])
        console.log(1);
      } else { 
        fetch('https://jsonplaceholder.typicode.com/users/' + id , {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.json())
        .then((json) => {
          setInputValue(json)
          Context.setLoaded(prev => (!prev))
        })}
        }, [])

    console.log(Context.isLoaded);
    
    function handleValue(e) {
      console.log(e.target.name);
        setInputValue(prev => e.target.name !== 'company' ? 
        { ...prev, [e.target.name]: e.target.value}:        
        { ...prev, company: {name: e.target.value}});
    }
    
    function closeHandle() {
      history.push({
        pathname: `/`
      })
    }

    function SendForm() {
      fetch('https://jsonplaceholder.typicode.com/users/' + id, {
        method: 'PUT',
        body: JSON.stringify(inputValue),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          toggleButton()
          console.log(json);
          Context.setUserData(prev => {
            const arr = prev.map(item => {
              if (item.id === inputValue.id) {
                return Object.assign(item, inputValue)
                
              }
            })
            
          })
          console.log('userData ', Context.userData);
        }
      })
    }
  return (
      <div className="user_page-container" >
      <span className='close_btn' onClick={closeHandle}></span>
      <h1 className='user-page-heading'>Home page of {id}</h1>
      <div className="user_page-item" onClick={handleStopPropag}>
        <div className="user_info">
        <label>Full name: 
        <input
          onChange={handleValue}
          name='name'
          type='text'
          value={inputValue.name}
          disabled={disable.mayChange}
          />
        </label>
          <label>Company: 
          <input 
              onChange={handleValue}
              name='company'
              type='text'
              value={inputValue.company.name}
              disabled={disable.mayChange}
              />
          </label>
          <label >Website: 
          <input 
              onChange={handleValue}
              name='website'
              type='text'
              value={inputValue.website}
              disabled={disable.mayChange}
              />
          </label>
          {!disable.mayChange && <button onClick={SendForm} className="btn user_save-btn">Save</button>}
        </div>
        <div className="user_edit-btns">
            <button className="btn" onClick={toggleButton}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default UserPage