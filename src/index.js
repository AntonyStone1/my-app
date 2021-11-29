import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.css'
import UserListHeading from "./components/UserListHeading";
import Routing from './components/Routing'

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
        <UserListHeading/>
        <Routing/>
        </div>
    )    
}

ReactDOM.render(
    <App/>,    
    document.getElementById('root'))