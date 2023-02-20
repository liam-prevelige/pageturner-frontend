/*
 * Build a feed for user's homepage
 * Returns relevant comments for the logged in user
 */

import React, {useEffect, useState} from 'react';
import {getFeed, getGlobalFeed} from '../../api';
import {Comment} from './Comment';

export const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [globalPageNumber, setGlobalPageNumber] = useState(0);
  const [privatePageNumber, setPrivatePageNumber] = useState(0);
  const [isPrivateTimeline, setIsPrivateTimeline] = useState(false);

  const fetchData = async () => {
    try {
      let newTimeline = null;
      if (isPrivateTimeline) {
        newTimeline = await getFeed(privatePageNumber);
      } else {
        newTimeline = await getGlobalFeed(globalPageNumber);
      }
      setTimeline(newTimeline);
    } catch (err) {
      console.log(err);
    }
  };

  // Create event listener for newPost in sessionStorage
  window.addEventListener('newPost', () => {
    if (!isLoading) {
      setGlobalPageNumber(0);
      setIsLoading(true);
    }
  });

  document.addEventListener('scroll', function(e) {
    if (document.body.scrollHeight <= Math.ceil(window.pageYOffset + window.innerHeight)) {
      setIsAddingPage(true);
    }
  });

  window.addEventListener('timelineChange', function(e) {
    setIsPrivateTimeline(e.detail);
    if (!isLoading) {
      if (isPrivateTimeline) {
        setPrivatePageNumber(0);
      } else {
        setGlobalPageNumber(0);
      }
      setIsLoading(true);
    }
  });

  const getNewTimelinePage = async () => {
    try {
      if (isPrivateTimeline) {
        const newTimelinePage = await getFeed(privatePageNumber+1);
        const newTimeline = timeline.concat(newTimelinePage);
        setTimeline(newTimeline);
        if (newTimelinePage.length > 0) {
          setPrivatePageNumber(privatePageNumber+1);
        }
      } else {
        const newTimelinePage = await getGlobalFeed(globalPageNumber+1);
        const newTimeline = timeline.concat(newTimelinePage);
        setTimeline(newTimeline);
        if (newTimelinePage.length > 0) {
          setGlobalPageNumber(globalPageNumber+1);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAddingPage) {
      setIsAddingPage(false);
      getNewTimelinePage();
    }
  }, [isAddingPage]);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      fetchData();
    }
  }, [isLoading]);

  return (
    <div className="bg-white h-full">
      {timeline && timeline.map((commentData) =>
        (<div key={commentData._id}>
          <Comment comment={commentData}/>
          <div className="border-b ml-3 mr-3 border-slate-300"></div>
        </div>
        ))}
    </div>
  );
};
