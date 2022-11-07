/**
 * enables Google authentication feature along with session token
 * Google auth2 amdended from: https://github.com/adrianhajdin/project_mern_memories/tree/PART_3
 * author: Joshua Pasaribu
 */

import React, {useState, useEffect} from 'react';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {Button} from '@material-ui/core';
import Icon from './icon';
import useStyles from './styles';
import {Typography, Avatar} from '@material-ui/core';
import {useNavigate, useLocation} from 'react-router-dom';

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  console.log(user);

  const logout = () => {
    dispatch({type: 'LOGOUT'});


    setUser(null);
  };

  useEffect(() => {
    // const token = user?.token;

    // if (token) {
    //   const decodedToken = decode(token);

    //   if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    // }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({type: 'AUTH', data: {result, token}});
      navigate('/');
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
      {user?.result ? (
        <div className={classes.profile}>
          <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
          <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
          <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
        </div>
      ) : (
        <GoogleLogin
          clientId="556168228068-60hp84a7hnkqoh1i8vs2m2vakff2a7ae.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
          Google Sign In
            </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        />
      )}
    </div>
  );
};

export default Auth;
