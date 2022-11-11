import React from 'react';
import './BookDisplay.css';
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
      <nav className="info">
        <center>
          <Link to='../../BookInfo/*'>{title} <br/> {author}</Link>
        </center>
      </nav>
    </div>
  );
};
