/*
 * Build a feed for user's homepage
 * Returns relevant comments for the logged in user
 */

import React, {useEffect, useState} from 'react';
import {getClubFeed} from '../../api';
import {Comment} from '../Comment/Comment';

export const ClubTimeline = ({club, numPostsCb}) => {
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const fetchData = async () => {
    try {
      const newTimeline = await getClubFeed(club._id, pageNumber);
      numPostsCb(newTimeline.length); // TODO: Make this actually work, currently based on number of pages
      setTimeline(newTimeline);
    } catch (err) {
      console.log(err);
    }
  };

  // Create event listener for newPost in sessionStorage
  window.addEventListener('newClubPost', () => {
    if (!isLoading) {
      setPageNumber(0);
      setIsLoading(true);
    }
  });

  document.addEventListener('scroll', function(e) {
    if (document.body.scrollHeight <= Math.ceil(window.pageYOffset + window.innerHeight)) {
      setIsAddingPage(true);
    }
  });

  const getNewTimelinePage = async () => {
    try {
      const newTimelinePage = await getClubFeed(club._id, pageNumber+1);
      const newTimeline = timeline.concat(newTimelinePage);
      setTimeline(newTimeline);
      if (newTimelinePage.length > 0) {
        setPrivatePageNumber(pageNumber+1);
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
