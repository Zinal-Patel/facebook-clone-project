import Axios from "axios";

export const loginCalls = async (userCredentials, dispatch) => {

    //dispatch triggers the state updates so initially the state will be "LOGIN_START".
    dispatch({type: "LOGIN_START"});

    try{
    
     console.log(userCredentials)

            //when the path is "auth/login", and we have userCredential and if we get success, dispatch triggers the state updates so the state will be "LOGIN_SUCCESS". We store the response which is the user info in "payload"
            const res = await Axios.post("auth/login", userCredentials);
          
            dispatch({type: "LOGIN_SUCCESS", 
            user: res.data});

            console.log(res.data)
        

       }
    catch(err){
             //when the path is "auth/login", and we have userCredential and if we get error, dispatch triggers the state updates so the state will be "LOGIN_FAILURE". We store the error in "payload"
            dispatch({type: "LOGIN_FAILURE", error: err})
       }
}