const AuthReducer = (state, action) => {

    //we passed type of actions from AuthActions.js. We will now check what type of action we received and act accodingly. 


    //If the type is "LOGIN_START", we obviuosly don't have the user so its null, we are still fetching data from database and therefore no error as of yet.
    //If the type is "LOGIN_SUCCESS", we obviuosly have received the user from database so its ---, we have finished fetching and therefore no error.
    //If the type is "LOGIN_FAILURE", we obviuosly don't have the user so its null, we have finished fetching and we obviously have the error .
    switch(action.type){

        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false 
              };
        case "LOGIN_SUCCESS":
            return {
                user: action.user,
                isFetching: false,
                error: false 
              };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.error 
              };
        //When the action taken is follow, we want to keep all the properties of user same except the "following" property
        case "FOLLOW":
            return {
                //means spread. state will have its defualt values for user, isFetching and error.
                ...state,
                //as we know state is the object that has user property inside it.
                //user is again an object that contains user info of current user.
                user: {
                     //we wnat to keep the default value of the properties of state.user.
                     ...state.user,
                    //We want to change only "following" property
                    //Whatever is inside the "following" array, We first want to keep it as it is and then add the new userId of the user we want to follow
                    following: [...state.user.following, action.userId]
                    }
              }; 
        case "UNFOLLOW":
            return { 
                //means spread. state will have its defualt values for user, isFetching and error.
                ...state,
      
                user: {
                     //we wnat to keep the default value of the properties of state.user.
                     ...state.user,
                    //We will iterate through "following" array, and we will return all the userIds except the one that matches the userId of the user we want to unfollow. This gives us new array after removing the userId of the user we want to unfollow.
                    following: state.user.following.filter((userId) => {
                        return userId !== action.userId;
                    })  
                    }
              };              
        default:
            return state;
    }
}

export default AuthReducer;