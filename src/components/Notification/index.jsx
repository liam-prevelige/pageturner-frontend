import {React, useState, useEffect} from 'react';
import {FaHeart, FaComment, FaUser} from 'react-icons/fa';
import {Comment} from '../Comment/Comment';
import {getNotifications, updateNotifications} from '../../api';
import ReactGA from 'react-ga';
import {formatDistance} from 'date-fns';

export const Notification = () => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const markAllAsViewed = async () => {
    const updatedNotifications = notifications.map((notification) => ({...notification, isViewed: true}));
    // setNotifications([...]);
    await updateNotifications(updatedNotifications);
    // setIsLoading(true);
  };

  const loadNotifications = async () => {
    if (!profile) return;
    const newNotifications = await getNotifications();
    setNotifications(newNotifications.reverse());
    markAllAsViewed();
  };

  useEffect(() => {
    if (isLoading) {
      ReactGA.pageview(window.location.pathname);
      loadNotifications();
      setIsLoading(false);
    }
  }, [isLoading]);

  const getMessage = (notification) => {
    switch (notification.type) {
      case 'like':
        return 'liked your post';
      case 'reply':
        return 'replied to you';
      case 'follow':
        return 'started following you';
      default:
        return '';
    }
  };

  if (!profile) {
    return (<div className="font-bold text-xl mt-20">Sign in or make an account to see your notifications.</div>);
  }

  return (
    <>
      <div className="flex relative flex-col pt-4 bg-white">
        <div className="flex mb-4 border-b border-slate-300 p-4 mr-5">
          <div className="bg-white font-bold text-3xl text-black">
            Notifications
          </div>
          <div className=""/>
          {/* <button
            className="text-slate-500 hover:text-slate-700 transition-colors duration-150 focus:outline-none"
            onClick={markAllAsViewed}>
              Mark all as viewed
          </button> */}
        </div>
        <ul className="ml-3">
          {notifications && notifications.map((notification, index) =>
            (<div key={notification.cId+notification.type+index}>
              <div className="flex items-center text-sm space-x-2 pr-2 mb-2 mt-1">
                {notification.type === 'like' ? <FaHeart className="fill-primary-like stroke-2 w-4 h-4" /> :
                notification.type === 'follow' ?
                <FaUser className="w-4 h-4 text-blue-800"/> :
                <FaComment className="w-4 h-4 text-green-800" />}
                <div className="flex flex-row">
                  <div onClick={() => loadProfile(notification.commenterId)}>
                    <b>@{notification.commenterId}&nbsp;</b>
                  </div>
                  {getMessage(notification)}
                  {notification.timestamp && (' ' + formatDistance(new Date(notification.timestamp), new Date()) + ' ago')}
                </div>
              </div>
              {notification.type !== 'follow' && <Comment comment={notification.comment}/>}
              <div className="border-b -ml-3 mr-3 mb-3 border-slate-300"></div>
            </div>
            ))}
        </ul>
      </div>
    </>
  );
};
