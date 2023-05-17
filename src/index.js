import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//we create context api and we are importing it here to wrap "app" componenet inside it
import { AuthContextProvider } from './contex/AuthContext';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <AuthContextProvider>
          <App />
      </AuthContextProvider>
      
  </React.StrictMode>
);

