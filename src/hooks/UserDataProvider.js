import React, {useState, useEffect} from "react";

export const UserContext = React.createContext()



export function UserDataProvider({children}) {
    const [userData, setUserData] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/')
        .then(response => response.json())
        .then(res => {
          return setUserData(res)
        }) 
    }, [])
    console.log('ProviderData', userData);
  return <UserContext.Provider value={{userData, setUserData, isLoaded, setLoaded}}>{children}</UserContext.Provider>
}


  
