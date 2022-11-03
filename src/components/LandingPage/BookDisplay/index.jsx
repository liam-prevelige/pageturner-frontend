import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {
  // Route,
  // Routes,
  Link,
} from 'react-router-dom';

// import {BookInfo} from '../../BookInfo';

export const BookDisplay = () => {
  return (
    <div className="mb-3">
      <img src="goblet.jpg" alt="Harry Potter" width="150" height="210"/>
      <h6>
        JK Rowling
      </h6>
      <nav>
        <Link to='../../BookInfo/*'>Harry Potter and the Goblet of Fire</Link>
      </nav>
      <ProgressBar animated variant="success" now="90" label="90%" />
    </div>
  );
};
