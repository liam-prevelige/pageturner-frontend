import React from 'react';
import './post.css';

export const Post = ( {username, caption, imageUrl} ) => {
  // const [comments, setComments] = useState ([]);

  return (
    <div className='post'>
      <h3>{username}</h3>

      <img className='post__image' src={imageUrl}/>

      <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
    </div>
  );
};
