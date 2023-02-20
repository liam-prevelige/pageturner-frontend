import {React, useState, useEffect} from 'react';
import {StarSolid} from '../../assets/Icons';
import {Comment} from '../Comment/Comment';
import {getNotifications} from '../../api';
import ReactGA from 'react-ga';

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    const loadNotifications = async () => {
      const newNotifications = await getNotifications();
      setNotifications([...newNotifications]);
    };
    loadNotifications();
  }, []);

  return (
    <div className="flex relative flex-col pt-5 bg-white">
      <ul>
        {notifications.reverse().map((notification, index) =>
          (<div key={index}>
            <div className='flex items-center text-sm space-x-2 pr-2'>
              <StarSolid /> <span><b>User</b> replied to your post</span>
            </div>
            <Comment commentId={notification} noParent={true}/>
            <div className="border-b ml-3 mr-3 border-slate-300"></div>
          </div>
          ))}
      </ul>
    </div>
  );
};
