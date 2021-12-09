/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAuth } from 'hooks/useAuth/useAuth'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, Redirect } from 'react-router-dom'
import AuthCSS from './Auth.module.css'

const NewAuth = () => {
  const { logIn, isAuth, signIn } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [wrongPass, setWrongPass] = useState(false)
  const [eyeActive, setEyeActive] = useState(false)
  const inputType = {
    password: 'password',
    text: 'text',
  }
  const location = useLocation()

  const eyeClickHandle = () => {
    setEyeActive((prev) => !prev)
  }
  const onSubmit = (data) => {
    if (location.pathname !== '/login') {
      signIn(data.name, data.password)
    } else {
      logIn(data.name, data.password)
    }
  }

  const loginHandler = () => {
    if (!isAuth) {
      setWrongPass(true)
    }
  }

  if (isAuth) {
    // eslint-disable-next-line react/react-in-jsx-scope
    return <Redirect to="/home" />
  }
  return (
    <div className={AuthCSS.auth_container}>
      <h1 className={AuthCSS.auth_heading}>Authorization</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={AuthCSS.form_container}>
        <label className={AuthCSS.auth_label}>Name</label>
        <input
          {...register('name', {
            required: true,
            maxLength: 20,
            minLength: 3,
            pattern: /^[A-Za-z]+$/i,
          })}
          autoComplete="off"
          className={AuthCSS.auth_input}
        />
        {!wrongPass && errors?.name?.type === 'required' && (
          <p className={AuthCSS.auth_required}>This field is required</p>
        )}
        {!wrongPass && errors?.name?.type === 'maxLength' && (
          <p className={AuthCSS.auth_required}>First name cannot exceed 20 characters</p>
        )}
        {!wrongPass && errors?.name?.type === 'minLength' && (
          <p className={AuthCSS.auth_required}>Password must be at least 3 characters long</p>
        )}
        {!wrongPass && errors?.name?.type === 'pattern' && (
          <p className={AuthCSS.auth_required}>Alphabetical characters only</p>
        )}
        <label className={AuthCSS.auth_label}>
          Password
          <span
            className={!eyeActive ? AuthCSS.pass_eye__open : AuthCSS.pass_eye__close}
            onClick={eyeClickHandle}
          />
          <input
            type={!eyeActive ? inputType.password : inputType.text}
            {...register('password', {
              required: true,
              pattern: /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[0-9a-zA-Z]{8,}/g,
            })}
            className={AuthCSS.auth_input}
            autoComplete="off"
          />
        </label>

        {!wrongPass && errors?.password?.type === 'required' && (
          <p className={AuthCSS.auth_required}>This field is required</p>
        )}
        {!wrongPass && errors?.password?.type === 'pattern' && (
          <p className={AuthCSS.auth_required}>
            Must include at least one capital letter, one number and must be at least 8 characters
            long
          </p>
        )}

        {location.pathname === '/login' ? (
          <>
            {wrongPass && <p className={AuthCSS.auth_required}>Wrong name or password</p>}
            <button type="submit" className={AuthCSS.auth_login_btn} onClick={loginHandler}>
              log In
            </button>
            <div className={AuthCSS.no_acc__heading}>Dont have account?</div>
            <div className={AuthCSS.no_acc__link}>
              <Link to="/registration">Sign Up</Link>
            </div>
          </>
        ) : (
          <input type="submit" value="Sign up" className={AuthCSS.auth_submit_btn} />
        )}
      </form>
    </div>
  )
}

export default NewAuth
