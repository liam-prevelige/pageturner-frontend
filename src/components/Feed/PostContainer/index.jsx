import React, {useState} from 'react';
import {Post} from './Post/post';

export const PostContainer = () => {
  const [posts] = useState([
    {
      username: 'jsmith',
      caption: 'If you kow me, then you’d know I love Harry Potter. The Goblet of Fire is easily top three in the series.',
      imageUrl: 'http://images.amazon.com/images/P/0889652015.01.LZZZZZZZ.jpg',
    },
    {
      username: 'leachmac',
      caption: 'Great book!! I’ve loved the Harry Potter series since as long as I can remember, and this one’s my favorite',
      imageUrl: 'http://images.amazon.com/images/P/0889652015.01.LZZZZZZZ.jpg',
    },
  ]);
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
