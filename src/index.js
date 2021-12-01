import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import UserListHeading from "./components/UserListHeading";
import Routing from './components/Routing'
import { UserDataProvider } from "./hooks/UserDataProvider";

function App() {   
    return (
        <>
        <UserDataProvider>
            <div className="wrapper">
                <UserListHeading/>
                <Routing/>
            </div>
        </UserDataProvider>
        </>
    )    
}



ReactDOM.render(
    <App/>,    
    document.getElementById('root'))