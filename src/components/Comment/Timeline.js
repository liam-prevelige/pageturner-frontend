/*
 * Build a feed for user's homepage
 * Returns relevant comments for the logged in user
 */

import React, {useEffect, useState} from 'react';
import {getFeed} from '../../api';
import {Comment} from './Comment';

export const Timeline = () => {
  const [timeLine, setTimeLine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const timeLine = await getFeed();
      console.log(timeLine);
      setTimeLine(timeLine);
    } catch (err) {
      console.log('error', err);
    }
  };

  // Create event listener for newPost in sessionStorage
  window.addEventListener('newPost', () => {
    if (!isLoading) {
      console.log('newPost event triggered');
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
