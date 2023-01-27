/*
 * Build a feed for user's homepage
 * Returns relevant comments for the logged in user
 */

import React, {useEffect, useState} from 'react';
import {getFeed} from '../../api';
import {Comment} from 'postcss';

export const Timeline = () => {
  const [timeLine, setTimeLine] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const timeLine = await getFeed();
          setTimeLine(timeLine);
        } catch (err) {
          console.log('error', err);
        }
      };
      fetchData();
    }
  }, [isLoading]);

  return (
    <div className="bg-slate-100 h-full">
      {timeLine && timeLine.map((commentData, index) =>
        (<div key={index}>
          <Comment commentId={commentData._id} noParent={true}/>
          <div className="border-b ml-3 mr-3 border-slate-300"></div>
        </div>
        ))}
    </div>
  );
};
