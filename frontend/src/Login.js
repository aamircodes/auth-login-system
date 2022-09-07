import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from './service/AuthService';

const loginAPIUrl = 'https://2d4t6gs6j0.execute-api.us-east-1.amazonaws.com/prod/login';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Both username and password is required');
      return;
    }
    setErrorMessage(null);
    const requestConfig = {
      headers: {
        'x-api-key': 'tjiIny8rS31SEZPhciRVO3E49rB1gTZs9KNZKmSI',
      },
    };
    const requestBody = {
      username: username,
      password: password,
    };

    axios
      .post(loginAPIUrl, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token);
        navigate('/premium-content');
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('sorry, backend server is down! please try again later');
        }
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Login</h5>
        username: <input type='text' value={username} onChange={(event) => setUsername(event.target.value)} /> <br />
        password: <input type='text' value={password} onChange={(event) => setPassword(event.target.value)} /> <br />
        <input type='submit' value='Login' />
      </form>
      {errorMessage && <p className='message'>{errorMessage}</p>}
    </div>
  );
};

export default Login;
