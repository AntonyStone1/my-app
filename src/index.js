import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import './index.css'
import Routing from './components/Routing'
import { UserDataProvider } from "./hooks/UserDataProvider";
import { useHistory } from "react-router-dom";

function App() {
    
    return (
        <>
        <UserDataProvider>
            <div className="wrapper">
                <Routing/>
            </div>
        </UserDataProvider>
        </>
    )    
}



ReactDOM.render(
    <App/>,    
    document.getElementById('root'))