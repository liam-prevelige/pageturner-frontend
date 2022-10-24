import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

export const BookDisplay = ({imagesrc, title, author}) => {
  return (
    <div className="mb-3">
      <img src={imagesrc} alt="Harry Potter" width="150" height="210"/>
      <h5>
        {title}
      </h5>
      <h6>
        {author}
      </h6>
      <ProgressBar animated variant="success" now="90" label="90%" />
    </div>
  );
};
