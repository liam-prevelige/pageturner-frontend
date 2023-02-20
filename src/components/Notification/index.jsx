import {React, useState, useEffect} from 'react';
import {ProfileIcon, StarSolid} from '../../assets/Icons';
import {FaHeart} from 'react-icons/fa';
import {Comment} from '../Comment/Comment';
import {getNotifications} from '../../api';
import ReactGA from 'react-ga';

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const markAllAsViewed = async () => {
    const updatedNotifications = notifications.map((notification) => ({...notification, isViewed: true}));
    console.log('updatedNotifications:', updatedNotifications);
    setNotifications([...updatedNotifications]);
    await updateNotifications();
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    const loadNotifications = async () => {
      const newNotifications = await getNotifications();
      setNotifications([...newNotifications]);
    };
    loadNotifications();
  }, []);

  const getMessage = (notification) => {
    switch (notification.type) {
      case 'like':
        return 'has liked your post';
      case 'reply':
        return 'has replied to your post';
      case 'follow':
        return 'is now following you';
      default:
        return '';
    }
  };

  return (
    <div className="flex relative flex-col pt-5 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-slate-800">Notifications</h1>
        <button
          className="text-slate-500 hover:text-slate-700 transition-colors duration-150 focus:outline-none"
          onClick={markAllAsViewed}
        >
          Mark all as viewed
        </button>
      </div>
      <ul>
        {notifications.reverse().map((notification, index) =>
          (<div key={index}>
            <div className="flex items-center text-sm space-x-2 pr-2 mb-2 mt-1">
              {notification.type === 'like' ? <FaHeart className="fill-primary-like stroke-2 w-5 h-5" /> : notification.type === 'follow' ? <ProfileIcon /> : <StarSolid />}
              <span>
                <b>{notification.commenterId}</b> {getMessage(notification)}
              </span>
            </div>
            {notification.type !== 'follow' && <Comment commentId={notification.cId} noParent={true} />}
            <div className="border-b ml-3 mr-3 border-slate-300"></div>
          </div>
          ))}
      </ul>
    </div>
  );
};
