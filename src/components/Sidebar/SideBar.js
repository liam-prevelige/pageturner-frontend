import {React, useState, useEffect} from 'react';
import {getNotifications} from '../../api';
import {BookIcon, HomeIcon, GroupIcon, NotificationsIcon} from '../../assets/Icons';
import {Auth} from '../Auth/Auth';

export const SideBar = () => {
  const [path, setPath] = useState(window.location.pathname);
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [viewCount, setViewCount] = useState(0);

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

  return (
    <>
      <div className="flex flex-col w-275 justify-between px-3 bg-white pt-3">
        <div className='sticky top-0'>
          <div className="flex items-center justify-center h-24 w-24 p-1 rounded-full transform transition-colors duration-2 hover:bg-primary-twıtter_ıcon hover:bg-blue-100 cursor-pointer">
            <BookIcon />
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
          {!profile && <div className="mt-5">
            <Auth triggerReload = {() => {
              reloadPageFunc();
            }}/>
          </div>}
        </div>
      </div>
    </>
  );
};
