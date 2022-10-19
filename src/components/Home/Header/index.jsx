import React, {useState} from 'react';
import {testEndpoint} from '../../../api';
import './header.css';

export const Header = () => {
  // Just for the API test
  const [testText, setTestText] = useState('');
  const testApi = async () => {
    const text = await testEndpoint();
    setTestText(text);
  };

  return (
    <div className='pageturner__header section__padding' id="home">
      <div className='pageturner__header-content'>
        <h1 className='gradient__text'>Page Turner</h1>

        <div className='pageturner__header-content__input'>
          <input type="book" placeholder='Tell us the name of the last book you enjoyed' />
          <button type="button" onClick={testApi}>Get Started </button>
        </div>
      </div>
      { // Just for the API test
        testText && <div>API Test Message: {testText}</div>
      }
    </div>
  );
};
