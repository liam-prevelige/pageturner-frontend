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

  const [
    ref,
    {isVisible},
  ] = useTrackVisibility();

  const load = async () => {
    if (!loaded) {
      const results = await getFeed();
      setPosts(results);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
    console.log(`The component is ${isVisible ? 'visible' : 'not visible'}.`);
  }, [isVisible]);

  return (
    <div className='feed'>

      {
        // eslint-disable-next-line arrow-parens
        posts.map(post => (
          // eslint-disable-next-line react/jsx-key
          <Post ref={ref} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
  );
};
