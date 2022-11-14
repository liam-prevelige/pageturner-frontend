import React from 'react';
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
  return (
    <Router>
      {/* <Navbar className="p-2" bg="light" variant="light" expand="lg" navbar-custom> */}
      <Navbar className="variant-light expand-lg navbar-custom">
        <Navbar.Brand href="/">
          {/* <img
            alt="image"
            src="/logo.png"
            width="100"
            height="100"
          />{' '} */}
          Pageturner</Navbar.Brand>
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
          <Nav className="navbar-right navbar-custom1">
            <Auth/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
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
