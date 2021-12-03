import { Redirect } from "react-router-dom";
import { useAuth } from "./useAuth";
import useForm from "../formValidation/useForm";


export const Auth = () => {
    const { values, handleChange, handleSubmit } = useForm(login);

    function login() {
        console.log(values);
      }
    const { user, logIn, isAuth, signIn, setUser } = useAuth()

    console.log('Auth', isAuth);
    console.log('User', user);
    

    function changeHandler(e) {        
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value}))
    }
    
    function checkUser() {
        logIn(user.name, user.password)
    }
    function createNewUser() {
        signIn(user.name, user.password)
    } 

    if (isAuth) return <Redirect to='/home'/>

    return (
        <div className='login-container'>
            <h2 className='login_heading'>Authorization</h2>
            <div className='login_inputs'>
                <label>Name 
                <input type='text' name="name" onChange={changeHandler} autoComplete="off"/></label>
                <label>Password 
                <input type='password' name="password" onChange={changeHandler} /></label>
            </div>
            <div className="auth_btns">
                <button className='auth_btn login_btn' onClick={checkUser}>log In</button>
                <button className='auth_btn signin_btn' onClick={createNewUser}>Sign In</button>
            </div>

        </div>
    )
}