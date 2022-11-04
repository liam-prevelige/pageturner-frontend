import React, {useEffect, useState} from 'react';
// import {Typography, Toolbar, Avatar, Button} from '@material-ui/core';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  BrowserRouter as Router,
  // Redirect,
  Route,
  Routes,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import {LandingPage} from './components/LandingPage';
import {Browse} from './components/Browse';
import {Feed} from './components/Feed';
import Auth from './components/Auth/Auth';
import {gapi} from 'gapi-script';
// import {useNavigate} from 'react-router-dom';

// Placeholder components
// TODO: remove these
// TODO: (from Alex) remove the "Book Info" page from the navbar once we can connect it to other pages

const Page1 = () => {
  return <div>Page 1</div>;
};
// const Page2 = () => {
//   return <div>Page 2</div>;
// };

/*
Example PrivateRoute component:
const PrivateRoute = ({ authState, element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authState === 'initializing') {
          return <Spinner />;
        } else if (authState === 'authenticated') {
          return <Component {...props} />;
        } else {
          return <Redirect to='/sign-in' />;
        }
      }}
    ></Route>
  );
}
*/

/**
 * Core React component
 * Handles auth, navigation, etc.
 * @return {JSX} component containing entire application
 */
const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  console.log(user);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const logout = () => {
  //   dispatch({type: 'LOGOUT'});

  //   navigate.push('/');

  //   setUser(null);
  // };

  useEffect(() => {
    // const token = user?.token;

    setUser(JSON.parse(localStorage.getItem('profile')));
    const start = () => {
      gapi.client.init({
        clientId: '556168228068-60hp84a7hnkqoh1i8vs2m2vakff2a7ae.apps.googleusercontent.com',
        scope: 'email',
      });
    };

    gapi.load('client:auth2', start);
  }, []);

  return (
    <Router>
      <Navbar className="p-2" bg="light" expand="lg">
        <Navbar.Brand href="/">Pageturner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/*
            Example showing how to show / hide nav options based on auth state
            authState === 'unauthenticated' && <>
              <Nav.Link href="/sign-in">Sign In</Nav.Link>
              <Nav.Link href="/sign-up">Sign Up</Nav.Link>
            </>
            */}
            <Nav.Link href="/page1">Page 1</Nav.Link>
            <Nav.Link href="/BookInfo">Book Info</Nav.Link>
            <Nav.Link href="/browse">Browse</Nav.Link>
            <Nav.Link href="/feed">Feed</Nav.Link>
          </Nav>
          <Nav className="nav navbar-nav navbar-right">
            <Auth/>
            {/* <Toolbar className={classes.toolbar}>
              {user?.result ? (
                <div className={classes.profile}>
                  <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                  <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
              ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
              )}
            </Toolbar> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="container-fluid">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/feed" element={<Feed />} />
          {/*
          Example of a private route requiring authorization to access:
          <PrivateRoute authState={authState} path="/create" component={Create} />
          Note we'd need to set up auth separately for this to work

          Example of a route taking a parameter from the URL:
          <Route path="/results/:surveyId" element={Results} />
          */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
