/*
 * Example major component / page
 */
import React from 'react';
import {Header} from './Header';

export const Home = () => {
  return (
    <div className="App">
      <div className='gradient_bg'>
        <Header />
      </div>
    </div>
  );
};
