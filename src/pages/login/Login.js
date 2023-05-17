import {useContext, useRef} from "react";
import "./Login.css";
import { loginCalls } from "../../loginCalls";
import { AuthContext } from "../../contex/AuthContext";

export default function Login() {

    // "useRef()" hooks is used to store a mutable value that does not cause a re-render when updated. We can use useState to but it re-renders.
    const refEmail = useRef();
    const refPassword = useRef();
    //We are destructuring the properties of the AuthContext component that we imported.
    //"user" is the user info we receive if log in was successful.
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleLogin = (event) => {

        //prevents default actions like automatic refreshing of page
        event.preventDefault();
        //We are accessing the value inside the input element. refEmail refers to input element. Check the input element below to understand.
        loginCalls({email: refEmail.current.value, password: refPassword.current.value}, dispatch);    
    }

    console.log(user, isFetching, error)
  return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FaceBook</h3>
                    <span className="loginDesc">Connect with friends and the world around you!!!</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleLogin}>
                        {/* In React, we can add a ref attribute for an element to access it directly in the DOM */}
                        {/* In the code below, we can access both "input" elements by using "refEmail" and "refPassword" respectively */}
                        <input 
                        placeholder="Email" 
                        type="email" 
                        className="loginInput" 
                        ref={refEmail} 
                        required/>
                        <input 
                        placeholder="Password" 
                        type="password" 
                        className="loginInput" 
                        ref={refPassword}
                        minLength="6" 
                        required />
                        <button className="loginButton" disabled={isFetching}>{ isFetching ? "Logging In..."  : "Log In"}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegister">Create New Account</button>
                    </form>
                </div>
            </div>
        </div> 
 )
}
