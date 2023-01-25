import React, {useEffect, useState} from 'react';
import {getFeed} from '../../api';

export const Timeline = () => {
  const [timeLine, setTimeLine] = useState(JSON.parse(sessionStorage.getItem('profile')));
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          setCurrentUser(JSON.parse(sessionStorage.getItem('profile')));
          const timelinePosts = await getFeed(currentUser);

          setTimeLine(timelinePosts);
        } catch (err) {
          console.log('error', err);
        }
      };
      fetchData();
    }
  }, [isLoading, currentUser]);

  console.log('Timeline', timeLine);

  return (
    <div>Timeline</div>
  );
};
