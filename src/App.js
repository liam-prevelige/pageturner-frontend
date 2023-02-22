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
import {Feed} from './components/Feed';
import {ProfilePage} from './components/ProfilePage';
import {GroupProfilePage} from './components/ProfilePage/GroupProfilePage';
// import {Auth} from './components/Auth/Auth';
import {BookInfo} from './components/BookInfo';
import {HomePage} from './components/HomePage';
import {ThreadView} from './components/ThreadView/ThreadView';
import {RightBar} from './components/RightBar';
import {BookClubsPage} from './components/BookClubsPage';
import {Notification} from './components/Notification';
import ReactGA from 'react-ga';

const TRACKING_ID = 'UA-257505042-1';
ReactGA.initialize(TRACKING_ID);

/**
 * Core React component
 * Handles auth, navigation, etc.
 * @return {JSX} component containing entire application
 */
const App = () => {
  // const loggedIn = useState(JSON.parse(sessionStorage.getItem('profile')))[0] != null;
  return (
    <div className="min-h-screen mx-auto max-w-7xl flex">
      <Router>
        <SideBar />
        <main className="flex-1 flex flex-col bg-white">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path='/book-clubs' element={<BookClubsPage />} />
            <Route path='/book-clubs/:clubId' element={<BookClubsPage />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:uid" element={<ProfilePage />} />
            <Route path="/group-profile" element={<GroupProfilePage />} />
            <Route path="/book-info/*" element={<BookInfo />} />
            <Route path="/thread/:commentIdParam" element={<ThreadView />}/>
            <Route path="/notifications" element={<Notification />}/>
          </Routes>
        </main>
        <aside className="w-350">
          <RightBar />
        </aside>
      </Router>
    </div>
  );
};

export default App;
