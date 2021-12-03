import React, { useState, useContext, createContext } from 'react'
import { setItem, getItem } from '../../utils/localStorage'

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState({
      name: null,
      password: null
  })

  function logIn(userName, pass) {
    if ((getItem(userName) === pass)) {
        return setAuth(true)
        
    }
  }
  
  function signIn(userName, pass) {
    if (userName && pass) {
        setItem(userName, pass )
        logIn(userName, pass)
    }
  }
  function logOut() {
    setAuth(false)
  }

  return {
    user,
    isAuth,
    logIn,
    logOut,
    signIn,
    setUser
  }
}