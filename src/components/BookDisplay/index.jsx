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
      <img src={url} style={{height: '250px'}}/>
      <nav className="info">
        <center>
          <Link to=''><b>{title}</b> <br/> {author}</Link>
        </center>
      </nav>
    </div>
  );
};
