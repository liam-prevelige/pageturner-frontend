import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export const BookDisplay = () => {
  return (
    <div className="mb-3">
      <img src="goblet.jpg" alt="Harry Potter" width="150" height="210"/>
      <h5>
        Harry Potter and the Goblet of Fire
      </h5>
      <h6>
        JK Rowling
      </h6>
      <ProgressBar animated variant="success" now="90" label="90%" />
    </div>
  );
};
