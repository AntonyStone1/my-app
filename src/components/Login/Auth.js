import react, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";

export const Auth = () => {
    const history = useHistory()
    const [inputValue, setInputValue] = useState({
        name: '',
        email: ''
    })
    const [authorizedInfo, setAuthorizedInfo] = useState({
        userToken: null,
        isAutorized: false,
    })
    console.log(inputValue);
    function changeHandler(e) {
        setInputValue(prev => ({ ...prev, [e.target.name]: e.target.value}))
    }
    useEffect(() => {
        if (localStorage.getItem('Leanne Graham')) {
            history.push('/home')
        }
    })
    function sendRequest() {
        fetch('https://jsonplaceholder.typicode.com/users/', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        .then((response) => response.json())
        .then((json) => json.forEach(user => {
            if (user.name === inputValue.name && user.email === inputValue.email) {
                setAuthorizedInfo(prev => ({...prev, ...{userToken: user.name, isAutorized: true}}))
                localStorage.setItem(user.name, user.id)
                history.push('/home')
            }
        }))
           
    }
    
    console.log(authorizedInfo);
    return (
        <div className='login-container'>
            <div className='login_heading'>Authorization</div>
            <div className='login_inputs'>
                <label>Name 
                <input type='text' name="name" onChange={changeHandler}/></label>
                <label>Email 
                <input type='email' name="email" onChange={changeHandler}/></label>
            </div>
            <button className='login_btn' onClick={sendRequest}>log In</button>    
        </div>
    )
}