import React from 'react';
import {
  // Route,
  // Routes,
  Link,
} from 'react-router-dom';

// import {BookInfo} from '../../BookInfo';

export const BookDisplay = ({url, title, author}) => {
  return (
    <div className="mb-3 align-text-center">
      <img src={url} width="125" height="190"/>
      <nav>
        <Link to='../../BookInfo/*'>{title} by {author}</Link>
      </nav>
    </div>
  );
};
