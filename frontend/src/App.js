import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import PremiumContent from './PremiumContent';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { getUser, getToken, setUserSession, resetUserSession } from './service/AuthService';

const verifyTokenAPIURL = 'https://2d4t6gs6j0.execute-api.us-east-1.amazonaws.com/prod/verify';

function App() {
  const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'tjiIny8rS31SEZPhciRVO3E49rB1gTZs9KNZKmSI',
      },
    };
    const requestBody = {
      user: getUser(),
      token: token,
    };

    axios
      .post(verifyTokenAPIURL, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        setAuthenticating(false);
      })
      .catch(() => {
        resetUserSession();
        setAuthenticating(false);
      });
  }, []);

  const token = getToken();
  if (isAuthenticating && token) {
    return <div className='content'>Authenicating...</div>;
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <div className='header'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/register'>Register</NavLink>
          <NavLink to='/login'>Login</NavLink>
          <NavLink to='/premium-content'>Premium Content</NavLink>
        </div>
        <div className='content'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route
              path='/register'
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              exact
              path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path='/premium-content'
              element={
                <PrivateRoute>
                  <PremiumContent />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
