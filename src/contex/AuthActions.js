//While trying to Login, we have 3 actions. we start to login, it can be success or failure.
//Our actions here are "LOGIN_START", "LOGIN_SUCCESS" and "LOGIN_FAILURE". We will refer these actions as "action" and the properties inside it as "action.type" and "action.payload" in our AuthReducer.js file.
//In each case we pass the result as parameter and we return the type of action that occured

//While starting to login, we will get user credentials from the user, which we pass as parameter. We return the type of action that occured, here the type is "LOGIN_START".
export const LoginStart = (userCredentials) => { 
    return ({
              type: "LOGIN_START"
            });
}


//While starting to login and submit, if it's a success, we will get user info from database which we pass as parameter. We return the type of action that occured, here the type is "LOGIN_SUCCESS". we are then passing "user" we got form database to the "reducer".
export const LoginSuccess = (user) => {
     return ({
                type: "LOGIN_SUCCESS",
                // passing "user" to "reducer". we don't necessarily need to write "user" property, we can use any word.
                user: user
            });
}


//While starting to login and submit, if it's a failure, we will get an error which we pass as parameter. We return the type of action that occured, here the type is "LOGIN_FAILURE". we are then passing "error" we got to the "reducer".
export const LoginFailure = (error) => {
   return ({
            type: "LOGIN_FAILURE",
            // passing "error" to "reducer". we don't necessarily need to write "error", we can use anyword
            error: error
          })
};


export const follow = (userId) => {
  return ({
           type: "FOLLOW",
           // passing "error" to "reducer". we don't necessarily need to write "error", we can use anyword
           userId: userId
         })
};

export const unFollow = (userId) => {
  return ({
           type: "UNFOLLOW",
           // passing "error" to "reducer". we don't necessarily need to write "error", we can use anyword
           userId: userId
         })
};