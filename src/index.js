import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.css'
import UserListCapture from "./components/UserListCapture";
import CreateUser from "./components/CreateUser";


const GetUserData = () => {
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
        <div className="wrapper"><UserListCapture/><CreateUser userData={GetUserData()}/></div>
    )    
}

ReactDOM.render(
    <App/>,    
    document.getElementById('root'))