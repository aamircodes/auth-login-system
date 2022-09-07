import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, resetUserSession } from './service/AuthService';

const PremiumContent = () => {
  const user = getUser();
  const name = user !== 'undefined' && user ? user.name : '';

  const navigate = useNavigate();

  const logoutHandler = () => {
    resetUserSession();
    navigate('/login');
  };

  return (
    <div>
      Hello {name}! You have logged in! This is the premium content page! <br />
      <input type='button' value='Logout' onClick={logoutHandler} />
    </div>
  );
};

export default PremiumContent;
