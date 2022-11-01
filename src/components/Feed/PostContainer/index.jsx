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
  const [page, setPage] = useState(0);

  const [ref, {isVisible}] = useTrackVisibility();

  const load = async () => {
    const results = await getFeed();
    setPosts(results);
    setLoaded(true);
  };

  const incrementPage = () => {
    const pageTemp = page;
    setPage(pageTemp + 1);
  };

  const addPosts = async () => {
    // try {
    //   incrementPage();
    //   const tempTriggerNumber = triggerNumber;
    //   setTriggerNumber(tempTriggerNumber + 10);
    //   const results = await getFeed();
    //   const tempPosts = posts;
    //   tempPosts.concat(results);
    //   setPosts(tempPosts);
    // } catch (err) {
    //   console.log(err);
    // };
    incrementPage();
    const tempTriggerNumber = triggerNumber;
    setTriggerNumber(tempTriggerNumber + 10);
    const results = await getFeed();
    console.log(posts);
    console.log(results);
    const tempPosts = posts;
    tempPosts.concat(results);
    setPosts(tempPosts);
  };

  useEffect(() => {
    if (!loaded) {
      load();
    } else {
      addPosts();
      console.log(posts.length);
      const tempTriggerNumber = triggerNumber;
      setTriggerNumber(tempTriggerNumber + 10);
    }
  }, [isVisible]);

  return (
    <div className='feed'>
      {
        // eslint-disable-next-line arrow-parens
        posts.map((post, index) => (
          // eslint-disable-next-line react/jsx-key
          <div>
            {/* <PostList isVisible={isVisible}/> */}
            {index == triggerNumber ? <div ref={ref}></div> : null}
            <Post key={index} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          </div>
        ))
      }
    </div>
  );
};
