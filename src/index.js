import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.css'
import UserListCapture from "./components/UserListCapture";
import CreateUser from "./components/CreateUser";



const User = () => {
    const [userData, setUserData] = useState([])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/')
        .then(response => response.json())
        .then(res => {
            setUserData(res)
        }) 
    }, [])
    console.log(userData);
    return <CreateUser props={userData}/>
}


function App() {
    return (        
        <div className="wrapper"><UserListCapture/><User/></div>
    )    
}

ReactDOM.render(
    <App/>,    
    document.getElementById('root'))