import {React, useState, useEffect} from 'react';
import {getNotifications} from '../../api';
import {BookIcon, HomeIcon, GroupIcon, NotificationsIcon} from '../../assets/Icons';
import {Auth} from '../Auth/Auth';
import {FaAngleUp, FaAngleDown} from 'react-icons/fa';
import {sendFeedback} from '../../api';

export const SideBar = () => {
  const [path, setPath] = useState(window.location.pathname);
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [viewCount, setViewCount] = useState(0);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [feedbackPlaceholder, setFeedbackPlaceholder] = useState('Find a bug or have any comments? Let us know!');

  const handleInputChange = (e) => {
    setFeedbackInput(e.target.value);
  };

  useEffect(() => {
    if (!profile) return;
    // Fetch notifications every 60 seconds
    const intervalId = setInterval(() => {
      getNotifications().then((notifications) => {
        const isViewed = notifications.filter((notification) => notification.isViewed === false);
        const isViewedLength = isViewed.length;
        setViewCount(isViewedLength);
      });
    }, 60000);

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const homePath = '/';
  const bookClubsPath = '/book-clubs';
  const profilePath = '/profile';
  const notificationsPath = '/notifications';

  const notActiveClassName = 'flex items-center text-xl text-black font-semibold hover:bg-blue-100 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2';
  const activeClassName = 'flex items-center text-xl text-primary-button font-bold hover:bg-blue-100 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2';

  useEffect(() => {
    setPath(window.location.pathname);
  }, [window.location.pathname]);


  const reloadPageFunc = () => {
    window.location.reload();
  };

  const submitFeedback = () => {
    if (feedbackInput.length === 0) return;
    if (profile && profile.email) {
      sendFeedback(profile.email, feedbackInput);
    } else {
      sendFeedback('Anonymous', feedbackInput);
    }
    // Set the placeholder to 'Message received, thank you!' for 2 seconds, then revert back to original placeholder
    setFeedbackInput('');
    setFeedbackPlaceholder('Message received, thanks!');
    setTimeout(() => setFeedbackPlaceholder('Find a bug or have any comments? Let us know!'), 2000);
  };

  return (
    <>
      <div className="flex flex-col w-275 justify-between px-3 bg-white pt-3">
        <div className='sticky top-0'>
          <div className="flex items-center justify-center h-24 w-24 p-1 rounded-full transform transition-colors duration-2 hover:bg-primary-twıtter_ıcon hover:bg-blue-100 cursor-pointer">
            <a href={homePath}>
              <BookIcon />
            </a>
          </div>
          <nav className="mb-5 text-xl text-black font-semibold">
            <ul>
              <a href={homePath}>
                <div className="homepage">
                  <div className={path === homePath ? activeClassName : notActiveClassName}>
                    <HomeIcon />
                    <li className="ml-4 sidebar-text">Home</li>
                  </div>
                </div>
              </a>
              <a href={bookClubsPath}>
                <div className="bookclubs">
                  <div className={path === bookClubsPath ? activeClassName : notActiveClassName}>
                    <GroupIcon />
                    <li className="ml-4 sidebar-text">Book Clubs</li>
                  </div>
                </div>
              </a>
              <a href={notificationsPath}>
                <div className={path === notificationsPath ? activeClassName : notActiveClassName}>
                  <NotificationsIcon />
                  <li className="ml-4 sidebar-text">Notifications</li>
                  {viewCount > 0 && (
                    <span className="ml-2 text-sm font-medium text-red-600">
                      {viewCount}
                    </span>
                  )}
                </div>
              </a>
              <a href={profilePath}>
                <div className='profilepage '>
                  <div className={path===profilePath ? activeClassName : notActiveClassName}>
                    <div className="rounded-full h-7 w-7 border border-slate-300">
                      {profile ? <img className="rounded-full object-fill h-7 w-7" src={profile.profilePicture} /> :
                    <img className="rounded-full object-fill h-7 w-7" src="https://mastersofscale.com/wp-content/uploads/sites/2/2021/05/barack_obama-1.jpg" />
                      }
                    </div>
                    <li className="ml-4 sidebar-text">Profile</li>
                  </div>
                </div>
              </a>
            </ul>
          </nav>
          {!profile && <div className="mt-5 mb-5">
            <Auth triggerReload = {() => {
              reloadPageFunc();
            }}/>
          </div>}

          <div className="mr-2 border p-2 bg-slate-100">
            {!collapsed && <div>
              <div className="font-semibold mb-2">
              Share Feedback:
              </div>
              <textarea
                className="flex focus:outline-none border bg-white border-slate-400 break-words resize-none p-2 text-slate-800 w-full"
                type="text"
                placeholder={feedbackPlaceholder}
                value={feedbackInput}
                rows="5"
                onChange={(e) => handleInputChange(e)}
              />
              <div className="flex justify-end mt-1">
                <button className="text-sm button-tweet wrap-text justify-center text-primary-button rounded-full shadow-sm justify-center py-1 px-3 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:text-white" onClick={submitFeedback}>
                  Send
                </button>
              </div>
            </div>}
            <div className="flex items-center justify-center">
              {!collapsed && <button className="flex bg-red-300 w-7 h-7 -mb-5 justify-center align-middle items-center rounded-full border-2 border-red-300" onClick={() => setCollapsed(!collapsed)}>
                <FaAngleUp className="w-5 h-5 text-white rounded-full"/>
              </button>}
              {collapsed && <button className="flex bg-green-300 w-7 h-7 -mb-5 justify-center align-middle items-center rounded-full border-2 border-green-300" onClick={() => setCollapsed(!collapsed)}>
                <FaAngleDown className="mt-0.5 w-5 h-5 text-white rounded-full"/>
              </button>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
