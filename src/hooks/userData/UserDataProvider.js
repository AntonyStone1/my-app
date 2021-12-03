import React, { useState } from "react";

export const UserContext = React.createContext()

export function UserDataProvider({children}) {
    const [userData, setUserData] = useState([])
    const [isLoaded, setLoaded] = useState(false)    
    
  return <UserContext.Provider value={{userData, setUserData, isLoaded, setLoaded}}>{children}</UserContext.Provider>
}


  
