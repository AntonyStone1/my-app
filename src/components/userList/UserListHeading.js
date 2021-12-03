import React from "react";
import { useAuth } from '../../hooks/auth/useAuth'


function UserListHeading() {
    const {logOut, isAuth} = useAuth()
    return (
        <>
            <div className="user_heading-container">
                <h1 className="user_headt-text">User list</h1>
                <button className="logout_btn" onClick={() => logOut()}>Log Out</button>
            </div>        
        </>
    )
}

export default UserListHeading