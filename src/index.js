import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import './index.css'
import Routing from './components/Routing'
import { UserDataProvider } from "./hooks/UserDataProvider";
import { useHistory } from "react-router-dom";
import { ProvideAuth } from "./components/Login/useAuth";

function App() {
    
    return (
        <>
        <UserDataProvider>
            <ProvideAuth>
                <div className="wrapper">
                    <Routing/>
                </div>
            </ProvideAuth>
        </UserDataProvider>
        </>
    )    
}



ReactDOM.render(
    <App/>,    
    document.getElementById('root'))