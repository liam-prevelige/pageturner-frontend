import React from 'react';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import {
  BrowserRouter as Router,
  // Redirect,
  Route,
  Routes,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import {SideBar} from './components/Sidebar/SideBar';
import {LandingPage} from './components/LandingPage';
import {People} from './components/People';
import {Feed} from './components/Feed';
import {Profile} from './components/Profile';
// import Auth from './components/Auth/Auth';
import {BookInfo} from './components/BookInfo';
import {HomePage} from './components/HomePage';
import {ThreadView} from './components/ThreadView/ThreadView';

/**
 * Core React component
 * Handles auth, navigation, etc.
 * @return {JSX} component containing entire application
 */
const App = () => {
  // const loggedIn = useState(JSON.parse(sessionStorage.getItem('profile')))[0] != null;
  // const reloadPageFunc = () => {
  //   window.location.reload();
  // };
  return (
    <div className="min-h-screen mx-auto max-w-7xl flex">
      <SideBar/>
      <main className="flex-1 flex flex-col border-r border-l border-b border-primary-container_border_color bg-white">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/people" element={<People />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/book-info/*" element={<BookInfo />} />
            <Route path="/thread/*" element={<ThreadView />} />
          </Routes>
        </Router>
      </main>
      <aside className="w-350">
      </aside>
      {/* <Router>
        <Navbar className="variant-light expand-lg navbar-custom">
          <Navbar.Brand href="/">
          Pageturner</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/feed">Feed</Nav.Link>
              <Nav.Link href="/people">People</Nav.Link>
              <Nav.Link href="/home">Home</Nav.Link>
              {loggedIn && <Nav.Link href="/profile">My Profile</Nav.Link>}
            </Nav>
            <Nav className="navbar-right navbar-custom1" style={{marginTop: '0px'}}>
              <Auth triggerReload = {() => {
                reloadPageFunc();
              }}/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Router > */}
    </div>
  );
};

export default App;
