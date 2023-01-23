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
import {GoogleLogin} from '@react-oauth/google';
import {useLocation, useNavigate} from 'react-router-dom';
// eslint-disable-next-line
import jwt_decode from 'jwt-decode';
import {onLogin} from '../../api';

export const Auth = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('profile')));

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('profile')));
  }, [location]);

  const googleSuccess = async (res) => {
    const token = res.credential;
    const userObject = jwt_decode(res.credential);

    try {
      sessionStorage.setItem('auth_token', token);
      sessionStorage.setItem('profile', JSON.stringify(userObject));
      onLogin();
      navigate('/');
      props.triggerReload();
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try again later');
  };

  return (
    <div>
      {!user && <GoogleLogin onSuccess={googleSuccess} onError={googleFailure}/>}
    </div>
  );
};
