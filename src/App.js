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
import {People} from './components/People';
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

/**
 * Core React component
 * Handles auth, navigation, etc.
 * @return {JSX} component containing entire application
 */
const App = () => {
  // const loggedIn = useState(JSON.parse(sessionStorage.getItem('profile')))[0] != null;
  /* eslint-disable */
  return (
    <div>
      <head></head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-41CBZM5XD6"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-41CBZM5XD6');
      </script>
      <div className="min-h-screen mx-auto max-w-7xl flex">
        <Router>
          <SideBar />
          <main className="flex-1 flex flex-col bg-white">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route path='/book-clubs' element={<BookClubsPage />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/people" element={<People />} />
              <Route path="/profile" element={<ProfilePage />} />
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
    </div>
  );
  /* eslint-enable */
};

export default App;
