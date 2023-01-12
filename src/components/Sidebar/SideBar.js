import React from 'react';
import {TwitterIcon, HomeIcon, GroupIcon, BookMarksIcon, ListIcon, NotificationsIcon, ProfileIcon} from '../../assets/Icons';

export const SideBar = () => {
  return (
    <>
      <div className="flex flex-col w-275 justify-between px-3 bg-white">
        <div className='sticky top-0'>
          <div className="flex items-center justify-center w-12 h-12 rounded-full transform transition-colors duration-2 hover:bg-primary-twıtter_ıcon hover:bg-opacity-70 mt-1 mb-5 cursor-pointer">
            <TwitterIcon />
          </div>
          <nav className="mb-5 text-xl text-black">
            <ul>
              <a href="/">
                <div className="flex items-center hover:bg-primary-navi_hover hover:bg-opacity-70 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2">
                  <HomeIcon />
                  <li className="ml-4 sidebar-text-bold font-bold">Home</li>
                </div>
              </a>
              <a href="">
                <div className="flex items-center hover:bg-primary-navi_hover hover:bg-opacity-70 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2">
                  <GroupIcon />
                  <li className="ml-4 sidebar-text font-regular">Book Clubs</li>
                </div>
              </a>
              <a href="">
                <div className="flex items-center hover:bg-primary-navi_hover hover:bg-opacity-70 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2">
                  <ListIcon />
                  <li className="ml-4 sidebar-text font-regular">Reading Lists</li>
                </div>
              </a>
              <a href="">
                <div className="flex items-center hover:bg-primary-navi_hover hover:bg-opacity-70 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2">
                  <BookMarksIcon />
                  <li className="ml-4 sidebar-text font-regular">Bookmarks</li>
                </div>
              </a>
              <a href="">
                <div className="flex items-center hover:bg-primary-navi_hover hover:bg-opacity-70 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2">
                  <NotificationsIcon />
                  <li className="ml-4 sidebar-text font-regular">Notifications</li>
                </div>
              </a>
              <a href="/profile">
                <div className="flex items-center hover:bg-primary-navi_hover hover:bg-opacity-70 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2">
                  <ProfileIcon />
                  <li className="ml-4 sidebar-text font-regular">Profile</li>
                </div>
              </a>
            </ul>
          </nav>
          <button className="bg-primary-button text-black rounded-full shadow-lg py-3 px-8 w-90 transform transition-colors duration-500 hover:bg-primary-button_hover font-bold sidebar-text-bold">
                        Share
          </button>
          <div className="flex justify-between items-center mb-7 mt-40 hover:bg-primary-navi_hover hover:bg-opacity-70 rounded-full pl-3 pr-8 py-3 transform transition-colors duration-2">
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
