import React, {useEffect} from 'react';
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
import {Feed} from './components/Feed';
import {Profile} from './components/Profile';
import Auth from './components/Auth/Auth';
import {gapi} from 'gapi-script';

// Placeholder components
// TODO: remove these
// TODO: (from Alex) remove the "Book Info" page from the navbar once we can connect it to other pages

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
  useEffect(() => {
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
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/profile">My Profile</Nav.Link>
          </Nav>
          <Nav className="nav navbar-nav navbar-right">
            <Auth/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/feed" element={<Feed />} />
        <Nav.Link href="/profile">My Profile</Nav.Link>
        {/*
        Example of a private route requiring authorization to access:
        <PrivateRoute authState={authState} path="/create" component={Create} />
        Note we'd need to set up auth separately for this to work
        Example of a route taking a parameter from the URL:
        <Route path="/results/:surveyId" element={Results} />
        */}
      </Routes>
    </Router>
  );
};

export default App;
