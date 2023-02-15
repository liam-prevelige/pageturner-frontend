import React from 'react';
import {StarSolid} from '../../assets/Icons';

export const Notification = () => {
  return (
    <div>
      <div className='flex space-x-2 px-1 py-3 pt-5'>
        <StarSolid />
        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' className="cursor-pointer w-7 h-7 rounded-full"/>
        <div className="flex-1 font-sm">
          <div className="flex items-center text-sm space-x-2 pl-2 cursor-pointer">
            <span className="ml-1 text-xs"><b>John Doe</b> replied to your post</span>
          </div>
          <div className="ml-1 cursor-pointer">
            <div className="items-center text-black text-xs pl-2 pt-2 overflow-hidden">
            I dont agree with you. I believe the first Harry Potter is subpar
            </div>
          </div>
        </div>
      </div>
      <div className='flex space-x-2 px-1 py-3'>
        <StarSolid />
        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' className="cursor-pointer w-7 h-7 rounded-full"/>
        <div className="flex-1 font-sm">
          <div className="flex items-center text-sm space-x-2 pl-2 cursor-pointer">
            <span className="ml-1 text-xs"><b>John Doe</b> replied to your post</span>
          </div>
          <div className="ml-1 cursor-pointer">
            <div className="items-center text-black text-xs pl-2 pt-2 overflow-hidden">
          I dont agree with you. I believe the first Harry Potter is subpar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
