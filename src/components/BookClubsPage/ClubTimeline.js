/*
 * Build a feed for user's homepage
 * Returns relevant comments for the logged in user
 */

import React, {useEffect, useState} from 'react';
import {getClubFeed} from '../../api';
import {Comment} from '../Comment/Comment';
import ReactLoading from 'react-loading';

export const ClubTimeline = ({club}) => {
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [isGettingPage, setIsGettingPage] = useState(false);
  const [noMorePages, setNoMorePages] = useState(false);

  const fetchData = async () => {
    try {
      const newTimeline = await getClubFeed(club._id, pageNumber);
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
    if (!isGettingPage && !noMorePages) {
      setIsGettingPage(true);
      try {
        const newTimelinePage = await getClubFeed(club._id, pageNumber+1);
        const newTimeline = timeline.concat(newTimelinePage);
        setTimeline(newTimeline);
        if (newTimelinePage.length > 0) {
          setPrivatePageNumber(pageNumber+1);
        } else {
          setNoMorePages(true);
        }
      } catch (err) {
        console.log(err);
      }
      setIsGettingPage(false);
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
      {isGettingPage && <ReactLoading type="spin" color="black" />}
    </div>
  );
};
