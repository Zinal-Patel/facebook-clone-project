//we are creating authentication context using React's createContext and useReducer hooks.
//we imported the necessary dependencies: "createContext" and "useReducer" from "react".
import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";


// "INITIAL_STATE" object is declared here, which represents the initial state of the authentication context.
const INITIAL_STATE = {
                        user: JSON.parse(localStorage.getItem("user")) || null,
                        // user: { 
                        //         _id: "6454147edb4cc18b5c5a51f1",
                        //         userName: "john",
                        //         email:
                        //         "john@gmail.com",
                        //         // password:
                        //         // "$2b$10$FtZHLhtVZOnDG2YUBrf6Ueu/tieRZnmI8erzxVU6dV9VqLxJNjZge",
                        //         profilePicture: "person/1.jpeg",
                        //         coverPicture: "",
                        //         followers: [],
                        //         following: [],
                        //         isAdmin: false
                        //       },

                        isFetching: false,
                        error: false
                      };

  //"context" is a concept allows us to share data or state between components without passing props explicitly through the component tree
  //Using the "createContext", "useContext" functions is how we use/access/impliment that concept
  //Here we created a context using "createContext" function and we passed our "INITIAL_STATE" object in it. where initial state contains the data of the user, isFetching, error
  //if there is a user it will show the user's feed, if no user it shows login page
  //WE assinged this to "AuthContext"
  //so AuthContext now stores the user info if there is any or none, isFetching, error
  //"AuthContext" will be used to provide the authentication state and actions to components within the React component tree.
export const AuthContext = createContext(INITIAL_STATE);


//We are declaring a new component "AuthContextProvider". It recieves "children" props.
//components cant access AuthContext by defualt. Componets need to be wrapped around by the "provider" for them to be able to access AuthContext
//Later we will wrap "children" which will be our component that we want to give access to AuthContext, inside "AuthContextProvider" component.
export const AuthContextProvider = ({ children }) => {

    //We imported "AuthReducer" which updates and returns our "INITIAL_STATE" according to the actions that occur. (check AuthReducer for more).
    // The "useReducer" hook takes two arguments: a reducer function and an initial state. 
    //It returns an array containing the current "state" and the "dispatch" function.
    // The "dispatch" function triggers the process of state update by passing the action object to the reducer and the updates state is stored in "state".
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

      useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);
    //The updated "state" we recieved above, we pass its properties as a value in the "AuthContext.Provider" components
    return (
            <AuthContext.Provider value={{user: state.user, 
                                          isFetching: state.isFetching, 
                                          error: state.error,
                                          dispatch
                                          }}>
             { children }

            </AuthContext.Provider>
    )
}