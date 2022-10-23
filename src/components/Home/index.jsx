/*
 * Example major component / page
 */

import React, { useState } from 'react';
import { Header } from './Header';

export const Home = () => {    
  // const [value, setValue] = useState(false);
  return (
    <div className="App">
      {/* <Header
        isOn={value}
        handleToggle={() => setValue(!value)}
      /> */}
      <div className='gradient_bg'>
        <Header />
      </div>
    </div>
  );
};
