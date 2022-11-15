import React from 'react';
import './BookDisplay.css';
import {
  // Route,
  // Routes,
  Link,
} from 'react-router-dom';

// import {BookInfo} from '../../BookInfo';

export const BookDisplay = ({url, title, author, isbn}) => {
  return (
    <div className="card">
      <img src={url} style={{height: '250px'}}/>
      <nav className="info">
        <center>
          <Link to={{
            pathname: '../book-info',
            search: '?isbn=$' + isbn + '&url=' + url + '&title=' + title + '&author=' + author,
          }}
          >
            <b>{title}</b> <br/> {author}
          </Link>
        </center>
      </nav>
    </div>
  );
};
