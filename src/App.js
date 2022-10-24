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

import {Home} from './components/Home';
import {Browse} from './components/Browse';
import {BookInfo} from './components/BookInfo';
import {SocialFeed} from './components/SocialFeed';

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
  return (
    <Router>
      <Navbar className="p-2" bg="light" expand="lg">
        <Navbar.Brand href="/">PageTurner</Navbar.Brand>
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
            <Nav.Link href="/SocialFeed">Social Feed</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="App container-fluid">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/components/BookInfo" element={<BookInfo />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/SocialFeed" element={<SocialFeed />} />
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
