/**
 * infinite scrolling adapted from: https://www.pluralsight.com/guides/how-to-implement-infinite-scrolling-with-reactjs
 */

import React, {useState, useEffect} from 'react';
import {Post} from './Post/post';
import {getFeed} from '../../../api';

export const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [observer, setObserver] = useState(null);
  const [, setPage] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const load = async () => {
    if (!loaded) {
      const results = await getFeed();
      setPosts(results);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    setObserver(new IntersectionObserver(
        // eslint-disable-next-line no-invalid-this
        handleObserver.bind(this),
        options,
    ));
    // eslint-disable-next-line no-invalid-this
    observer.observe(this.loadingRef);
  }, []);

  /**
  * description
  * @param {*} page
  */
  async function getPosts(page) {
    tempPosts = posts;
    tempPosts.push(await getFeed());
    setPosts(tempPosts);
  }

  /**
  * description
  * @param {*} entities
  * @param {*} observer
  */
  function handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (prevY > y) {
      const lastPost = posts[posts.length - 1];
      const curPage = lastPost.albumId;
      getPosts(curPage);
      setPage(curPage);
    }
    setPrevY(y);
  }

  return (
    <div className='feed'>

      {
        // eslint-disable-next-line arrow-parens
        posts.map(post => (
          // eslint-disable-next-line react/jsx-key
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
  );
};
