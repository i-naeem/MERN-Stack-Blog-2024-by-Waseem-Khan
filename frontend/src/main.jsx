import './index.css';
import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import {Flowbite} from 'flowbite-react';
import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext.jsx';
import PostContextProvider from './context/PostContext.jsx';
import UserContextProvider from './context/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Flowbite>
      <BrowserRouter>
        <AuthContextProvider>
          <PostContextProvider>
            <UserContextProvider>
              <App />
            </UserContextProvider>
          </PostContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </Flowbite>
  </React.StrictMode>
);
