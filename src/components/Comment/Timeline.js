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
  const [isUpdating, setIsUpdating] = useState(true);
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [pageNumber, setPageNumber] = useState(0);

  const fetchData = async () => {
    try {
      let timeLine = null;
      if (profile != null) {
        timeLine = await getFeed();
      } else {
        timeLine = await getGlobalFeed(pageNumber);
      }
      setTimeLine(timeLine);
    } catch (err) {
      console.log(err);
    }
  };

  // Create event listener for newPost in sessionStorage
  window.addEventListener('newPost', () => {
    if (!isLoading) {
      setPageNumber(0);
      setIsLoading(true);
    }
  });

  document.addEventListener('scroll', function(e) {
    if (document.body.scrollHeight <= Math.ceil(window.pageYOffset + window.innerHeight)) {
      setPageNumber(pageNumber+1);
      setIsUpdating(true);
    }
  });

  const updateTimeline = async () => {
    try {
      const newTimelinePage = await getGlobalFeed(pageNumber);
      const newTimeline = timeLine.concat(newTimelinePage);
      setTimeLine(newTimeline);
      console.log(pageNumber);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isUpdating) {
      setIsUpdating(false);
      updateTimeline();
    }
  }, [isUpdating]);

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
