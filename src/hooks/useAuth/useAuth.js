import React, { useState, useContext, createContext } from 'react'
import { setItem, getItem } from '../../utils/localStorage'

const authContext = createContext()

// eslint-disable-next-line react/prop-types
export function ProvideAuth({ children }) {
  // eslint-disable-next-line no-use-before-define
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
  const [isAuth, setAuth] = useState(false)
  const [user, setUser] = useState({
    name: null,
    password: null,
  })
  const [haveAccount, setAccount] = useState()

  // eslint-disable-next-line consistent-return
  function logIn(userName, pass) {
    if (getItem(userName) === pass) {
      setUser({
        name: userName,
        password: pass,
      })
      return setAuth(true)
    }
  }

  function signIn(userName, pass) {
    if (userName && pass) {
      setItem(userName, pass)
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
    setUser,
    setAuth,
    haveAccount,
    setAccount,
  }
}
