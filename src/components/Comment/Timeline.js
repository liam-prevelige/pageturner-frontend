/*
 * Build a feed for user's homepage
 * Returns relevant comments for the logged in user
 */

import React, {useEffect, useState} from 'react';
import {getFeed, getGlobalFeed} from '../../api';
import {Comment} from './Comment';

export const Timeline = () => {
  const [timeLine, setTimeLine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];

  const fetchData = async () => {
    try {
      let timeLine = null;
      if (profile != null) {
        timeLine = await getFeed();
      } else {
        timeLine = await getGlobalFeed();
      }
      setTimeLine(timeLine);
    } catch (err) {
      console.log(err);
    }
  };

  // Create event listener for newPost in sessionStorage
  window.addEventListener('newPost', () => {
    if (!isLoading) {
      setIsLoading(true);
    }
  });

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      fetchData();
    }
  }, [isLoading]);

  return (
    <div className="bg-white h-full">
      {timeLine && timeLine.map((commentData, index) =>
        (<div key={index}>
          <Comment commentId={commentData}/>
          <div className="border-b ml-3 mr-3 border-slate-300"></div>
        </div>
        ))}
    </div>
  );
};
