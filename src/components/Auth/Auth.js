/* eslint-disable no-console */
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth/useAuth'
import { getItem } from '../../utils/localStorage'

const Auth = () => {
  const { logIn, isAuth, signIn, setAuth } = useAuth()
  const [inputValue, setInputValue] = useState({
    name: null,
    password: null,
  })

  const changeHandler = (e) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const checkUser = () => {
    logIn(inputValue.name, inputValue.password)
  }
  const createNewUser = () => {
    signIn(inputValue.name, inputValue.password)
  }

  if (isAuth) {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Redirect to="/home" />
  }

  return (
    <div className="login-container">
      <h2 className="login_heading">Authorization</h2>
      <div className="login_inputs">
        <label htmlFor="true">
          Name
          <input type="text" name="name" onChange={changeHandler} autoComplete="off" />
        </label>
        <label htmlFor="true">
          Password
          <input type="password" name="password" onChange={changeHandler} />
        </label>
      </div>
      <div className="auth_btns">
        <button type="button" className="auth_btn login_btn" onClick={checkUser}>
          log In
        </button>
        <button type="button" className="auth_btn signin_btn" onClick={createNewUser}>
          Sign In
        </button>
      </div>
    </div>
  )
}

export default Auth
