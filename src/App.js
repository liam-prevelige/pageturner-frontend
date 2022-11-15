import React, {useState} from 'react';
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
import {People} from './components/People';
import {Feed} from './components/Feed';
import {Profile} from './components/Profile';
import Auth from './components/Auth/Auth';
import {BookInfo} from './components/BookInfo';

/**
 * Core React component
 * Handles auth, navigation, etc.
 * @return {JSX} component containing entire application
 */
const App = () => {
  const loggedIn = useState(JSON.parse(sessionStorage.getItem('profile')))[0] != null;
  const reloadPageFunc = () => {
    window.location.reload();
  };
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
            <Nav.Link href="/feed">Feed</Nav.Link>
            <Nav.Link href="/people">People</Nav.Link>
            {loggedIn && <Nav.Link href="/profile">My Profile</Nav.Link>}
            <Nav.Link href="/book-info">Book Info</Nav.Link>
          </Nav>
          <Nav className="navbar-right navbar-custom1" style={{marginTop: '0px'}}>
            <Auth triggerReload = {() => {
              reloadPageFunc();
            }}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/people" element={<People />} />
        {loggedIn && <Route path="/profile" element={<Profile />}/>}
        <Route path="/book-info/*" element={<BookInfo />} />
      </Routes>
    </Router >
  );
};

export default App;
