/**
 * infinite scrolling adapted from: https://www.pluralsight.com/guides/how-to-implement-infinite-scrolling-with-reactjs
 */

import React, {useState, useEffect} from 'react';
import {Post} from './Post/post';
import {getFeed} from '../../../api';
import {useTrackVisibility} from 'react-intersection-observer-hook';

export const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [triggerNumber, setTriggerNumber] = useState(7);
  const [oldestPostId, setOldestPostId] = useState(0);

  const [ref, {isVisible}] = useTrackVisibility();

  const load = async () => {
    const results = await getFeed(oldestPostId);
    setPosts(results);
    const oldestPostTemp = Math.min(posts.map((post) => post.postId));
    setOldestPostId(oldestPostTemp);
    setLoaded(true);
  };

  const addPosts = async () => {
    const tempTriggerNumber = triggerNumber;
    setTriggerNumber(tempTriggerNumber + 10); // this is the problem
    const results = await getFeed(oldestPostId);
    setPosts(results);
    setPosts([...posts, ...results]);
    const postIdArray = posts.map((post) => post.postId);
    const oldestPostTemp = Math.min(...postIdArray);
    setOldestPostId(oldestPostTemp);
  };

  useEffect(() => {
    if (!loaded) {
      load();
    } else {
      addPosts();
    }
  }, [isVisible]);

  return (
    <div className='feed'>
      {
        // eslint-disable-next-line arrow-parens
        posts.map((post, index) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            {index == triggerNumber ? <div ref={ref}></div> : null}
            <Post key={post._id} username={post.user} caption={post.text} imageUrl={post.imageUrl}/>
          </div>
        ))
      }
    </div>
  );
};
