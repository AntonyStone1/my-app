import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import Routing from "./components/Router/Routing";
import { UserDataProvider} from './hooks/userData/UserDataProvider'
import { ProvideAuth } from "./hooks/auth/useAuth";
import * as serviceWorker from './hooks/formValidation/serviceWorker'

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

serviceWorker.unregister();