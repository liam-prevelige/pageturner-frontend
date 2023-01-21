import {React} from 'react';
import {BookIcon, HomeIcon, GroupIcon, NotificationsIcon, ProfileIcon} from '../../assets/Icons';

export const SideBar = () => {
  const path = sessionStorage.getItem('path');

  const homePath = '/';
  const profilePath = '/profile';

  const setPath = (path) => {
    sessionStorage.setItem('path', path);
  };

  const notActiveClassName = 'flex items-center text-xl text-black font-semibold hover:bg-blue-100 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2';
  const activeClassName = 'flex items-center text-xl text-primary-button font-bold hover:bg-blue-100 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2';

  return (
    <>
      <div className="flex flex-col w-275 justify-between px-3 bg-white mt-3">
        <div className='sticky top-0'>
          <div className="flex items-center justify-center h-24 w-24 p-1 rounded-full transform transition-colors duration-2 hover:bg-primary-twıtter_ıcon hover:bg-blue-100 cursor-pointer">
            <BookIcon />
          </div>
          <nav className="mb-5 text-xl text-black font-semibold">
            <ul>
              <a href={homePath}>
                <div className={path===homePath ? activeClassName : notActiveClassName} onClick={() => setPath('/')}>
                  <HomeIcon />
                  <li className="ml-4 sidebar-text">Home</li>
                </div>
              </a>
              <a href="">
                <div className="flex items-center hover:bg-blue-100 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2">
                  <GroupIcon />
                  <li className="ml-4 sidebar-text">Book Clubs</li>
                </div>
              </a>
              <a href="">
                <div className="flex items-center hover:bg-blue-100 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2">
                  <NotificationsIcon />
                  <li className="ml-4 sidebar-text">Notifications</li>
                </div>
              </a>
              <a href={profilePath}>
                <div className={path===profilePath ? activeClassName : notActiveClassName} onClick={() => setPath('/profile')}>
                  <ProfileIcon />
                  <li className="ml-4 sidebar-text">Profile</li>
                </div>
              </a>
            </ul>
          </nav>
          <button className="bg-primary-button text-white rounded-full text-xl shadow-lg py-3 px-8 w-90 transform transition-colors duration-500 hover:bg-primary-button_hover font-bold sidebar-text-bold">
                        Share
          </button>
          <div className="flex justify-between items-center mb-7 mt-40 hover:bg-primary-navi_hover hover:bg-blue-100 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2">
            <div className="h-11 w-11">
              <img className="rounded-full" src="https://www.billionsinstitute.com/wp-content/uploads/2014/10/Jennifer-Circle-Headshot-300X300.png" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-md text-black">Adem Can Certel</span>
              <span className="text-primary-profile_color text-sm">@ademcancertell</span>
            </div>

            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full" />
              <div className="w-1 h-1 bg-white rounded-full" />
              <div className="w-1 h-1 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
