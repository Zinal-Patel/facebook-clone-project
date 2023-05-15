import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import './App.css';
import HomePage from './pages/homepage/Homepage.js';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { AuthContext } from "./contex/AuthContext";

function App() {

    //We are destructuring the properties of the AuthContext component that we imported.
    //"user" is the user info we receive if log in was successful.
    const { user } = useContext(AuthContext);

  return (
    <>
          <Router>
            <Routes>
                {/* if we have "user" info available when the url path is "/", then we show <HomePage/> else we show <Register/> */}
                  <Route exact path="/" element={user ? <HomePage/> : <Register/>}>
                  </Route>
                {/* If we have user info available when the url path is "/login", then we redirect/navigate the path to "/" so above path will run. otherwise <Login/> will show */}
                  <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>}>
                  </Route> 
                {/* If we have user info available when the url path is "/register", then we redirect/navigate the path to "/" so above path will run. otherwise <Register/> will show */}
                  <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>}>
                  </Route>
                <Route path="/profile/:username" element={<Profile/>}>
                </Route>
            </Routes>
          </Router>

          {/* <HomePage/>     */}
        
    </>
  );
}

export default App;
