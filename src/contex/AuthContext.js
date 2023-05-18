//we are creating authentication context using React's createContext and useReducer hooks.
//we imported the necessary dependencies: "createContext" and "useReducer" from "react".
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";


// "INITIAL_STATE" object is declared here, which represents the initial state of the authentication context.
const INITIAL_STATE = {
                        user: null,
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


//Using the "createContext" function allows us to share data or state between components without passing props explicitly through the component tree.
//Here we created a context using "createContext" function and we passed our "INITIAL_STATE" object in it. 
//WE assinged this to "AuthContext"
//"AuthContext" will be used to provide the authentication state and actions to components within the React component tree.
export const AuthContext = createContext(INITIAL_STATE);


//We are declaring a new component "AuthContextProvider". It recieves "children" props.
//Later we will wrap "children" component inside "AuthContextProvider" component.
export const AuthContextProvider = ({ children }) => {

    //We imported "AuthReducer" which updates and returns our "INITIAL_STATE" according to the actions that occur. (check AuthReducer for more).
    // The "useReducer" hook takes two arguments: a reducer function and an initial state. 
    //It returns an array containing the current "state" and the "dispatch" function.
    // The "dispatch" function triggers the process of state update by passing the action object to the reducer and the updates state is stored in "state".
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

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