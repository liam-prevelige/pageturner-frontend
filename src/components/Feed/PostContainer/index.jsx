import React, {useState, useEffect} from 'react';
import {Post} from './Post/post';
import {getFeed} from '../../../api';

export const PostContainer = () => {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const load = async () => {
    if (!loaded) {
      const results = await getFeed();
      setPosts(results);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

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
