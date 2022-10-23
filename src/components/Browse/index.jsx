import React from 'react';
import {BookDisplay} from './BookDisplay';


export const Browse = () => {
  return (
    <div>
      <div className="container-sm text-center">
        <div className="row align-items-start">
          <div className="col-2">
            <BookDisplay/>
          </div>
          <div className="col-2">
            <BookDisplay/>
          </div>
        </div>
        <div className="row align-items-start">
          <div className="col-2">
            <BookDisplay/>
          </div>
          <div className="col-2">
            <BookDisplay/>
          </div>
        </div>
      </div>
    </div>
  );
};
