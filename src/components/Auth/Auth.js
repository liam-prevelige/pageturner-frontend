/**
 * Enables Google authentication feature along with session token
 *
 * Now based loosely on https://github.com/MomenSherif/react-oauth
 */

import React, {useState, useEffect} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import {useLocation, useNavigate} from 'react-router-dom';
import {onLogin} from '../../api';

export const Auth = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('profile')));
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('expiry_date');
    sessionStorage.removeItem('profile');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  const googleSuccess = async (res) => {
    try {
      sessionStorage.setItem('authorizationCode', res.code);
      const profile = await onLogin();
      sessionStorage.setItem('profile', JSON.stringify(profile));
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log('Google Sign In was unsuccessful. Try again later');
    console.log(error);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => googleSuccess(codeResponse),
    onFailure: (error) => googleFailure(error),
    flow: 'auth-code',
  });
  return (
    <div>
      {!user ?
      <button className="font-bold w-40 mt-3 mr-3 text-primary-button wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:border-primary-button hover:text-white" onClick={() => login()}>
        Sign In with Google
      </button> :
      <button className="font-bold w-24 mt-3 mr-3 text-primary-button wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:border-primary-button hover:text-white" onClick={logout}>
        Log Out
      </button>
      }
    </div>
  );
};
