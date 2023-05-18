import { useRef, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Register.css";
import Axios from "axios";


export default function Register() {

    const baseURL = process.env.REACT_APP_API_URL;

    const refUserName = useRef();
    const refEmail = useRef();
    const refPassword = useRef();
    const refPasswordAgain = useRef();
    const navigate = useNavigate();

    const [registeredUserInfo, setRegisteredUserInfo] = useState({});
    
    const handleRegister = async (event) => {

        //prevents default actions like automatic refreshing of page
        event.preventDefault();
      
        // if both passwords do not mathc, we give a little pop up
        if(refPassword.current.value !== refPasswordAgain.current.value){
            //using "setCustomValidity" function, we can set our validity
            refPasswordAgain.current.setCustomValidity("passwords don't match");
        }
        //if they match, we will send a post request to post the data to our database
        else{

            setRegisteredUserInfo({ userName: refUserName.current.value,
                                    email: refEmail.current.value,
                                    password: refPassword.current.value
                                  })

            try{
                 await Axios.post( baseURL + "auth/register", registeredUserInfo )
                 
                 //if everything is good, we redirect/navigate to "/login"
                 navigate("/login");
                }

            catch(err){
                 console.log(err);
                }    
         }
         
    }

  return (
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FaceBook</h3>
                    <span className="loginDesc">Connect with friends and the world around you!!!</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleRegister}>

                        <input placeholder="Username" type="text" className="loginInput" ref={refUserName} required />
                        <input placeholder="Email" type="email" className="loginInput" ref={refEmail} required />
                        <input placeholder="Password" type="password" className="loginInput" ref={refPassword} minLength="6" required/>
                        <input placeholder="Password again" type="password" className="loginInput" ref={refPasswordAgain} required/>

                            {/* <button className="loginButton">Log In</button> */}
                        <button className="loginRegister" type="submit">Create a new account</button>
                        <Link to="/login">
                            <div className="haveAccoutContainer">
                                <span className="haveAccount">Already have an Account? Log In</span>
                            </div>
                        </Link>

                    </form>
                </div>
            </div>
        </div> 
 )
}
