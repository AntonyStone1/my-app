import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.css'
import UserListCapture from "./components/UserListCapture";
import UserList from "./components/UserList";
import BasicExample from './components/BasicExample'

export const GetUserData = () => {
    const [userData, setUserData] = useState([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/')
        .then(response => response.json())
        .then(res => {
            setUserData(res)
        }) 
    }, [])
    return userData
}


function App() {
    return (        
        <div className="wrapper">
        <UserListCapture/>
        {/* <UserList userData={GetUserData()}/> */}
        <BasicExample/>
        </div>
    )    
}

ReactDOM.render(
    <App/>,    
    document.getElementById('root'))