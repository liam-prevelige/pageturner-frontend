import React, { useState } from 'react';
import { test_endpoint } from '../../api';
import './header.css';

const Header = () => {
  // Just for the API test
  const [testText, setTestText] = useState("");
  const test_api = async () => {
    const text = await test_endpoint();
    setTestText(text);
  };

  return (
    <div className='bookfinder__header section__padding' id="home">
      <div className='bookfinder__header-content'>
        <h1 className='gradient__text'>Book Finder</h1>

        <div className='bookfinder__header-content__input'>
          <input type="book" placeholder='Tell us the name of the last book you enjoyed' /> 
          <button type="button" onClick={test_api}>Get Started </button>
        </div>
      </div>
      { // Just for the API test
      testText && <div>API Test Message: {testText}</div>
      }
    </div>
  )
};

export default Header