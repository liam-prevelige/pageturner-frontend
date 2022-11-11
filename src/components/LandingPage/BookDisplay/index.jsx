import React from 'react';
import {
  // Route,
  // Routes,
  Link,
} from 'react-router-dom';

// import {BookInfo} from '../../BookInfo';

export const BookDisplay = ({url, title, author}) => {
  return (
    <div className="card">
      <img src={url}/>
      <nav>
        <Link to='../../BookInfo/*'>{title} by {author}</Link>
      </nav>
    </div>
  );
};
