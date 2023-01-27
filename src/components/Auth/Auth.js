/**
 * enables Google authentication feature along with session token
 * [
 * PREVIOUSLY
 * Google auth2 amdended from: https://github.com/adrianhajdin/project_mern_memories/tree/PART_3
 * author: Joshua Pasaribu
 * ]
 * Now based on https://github.com/MomenSherif/react-oauth
 */

import React, {useState, useEffect} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import {useLocation, useNavigate} from 'react-router-dom';
// eslint-disable-next-line
// import jwt_decode from 'jwt-decode';
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
    sessionStorage.removeItem('profile');
    setUser(null);
    navigate('/');
    // window.location.reload();
  };

  const googleSuccess = async (res) => {
    // const token = res.credential;
    // const userObject = jwt_decode(res.credential);
    try {
      console.log(res.code);
      sessionStorage.setItem('authorizationCode', res.code);

      const profile = await onLogin();
      sessionStorage.setItem('profile', JSON.stringify(profile));
      navigate('/');
      // window.location.reload();
      console.log(res);

      // const refreshedToken = await refreshToken();
      // console.log(refreshedToken);
    } catch (error) {
      console.log(error);
    }
  };

  // const googleFailure = (error) => {
  //   console.log('Google Sign In was unsuccessful. Try again later');
  //   console.log(error);
  // };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => googleSuccess(codeResponse),
    flow: 'auth-code',
  });
  return (
    <div>
      {!user ?
      <button className="font-bold w-24 mt-3 mr-3 text-primary-button wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:border-primary-button hover:text-white" onClick={() => login()}>
        Log In with Google
      </button> :
      // <GoogleLogin onSuccess={googleSuccess} onError={googleFailure}/> :
      <button className="font-bold w-24 mt-3 mr-3 text-primary-button wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:border-primary-button hover:text-white" onClick={logout}>
        Log Out
      </button>
      }
    </div>
  );
};
