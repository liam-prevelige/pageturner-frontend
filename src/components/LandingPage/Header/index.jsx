import React, {useState} from 'react';
import {testEndpoint} from '../../../api';
import './header.css';
import {HiMagnifyingGlass} from 'react-icons/hi2';
import {createSearchParams, useNavigate} from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Header = () => {
  // Just for the API test
  const [testText, setTestText] = useState('');
  const testApi = async () => {
    const text = await testEndpoint();
    setTestText(text);
  };

  const [search, setSearch] = useState('');
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    console.log('value is:', event.target.value);
  };

  const navigate = useNavigate();
  const opensearch = (id) => {
    navigate({
      pathname: '/browse',
      search: createSearchParams({
        query: search,
      }).toString(),
    });
  };

  return (
    <div className='pageturner__header section__padding' id="home">
      <div className='pageturner__header-content'>
        <h1 className='gradient__text'>Search for Content</h1>

        <div className='pageturner__header-content__input'>
          <input type="book" onChange={handleSearchChange} value={search} placeholder='Tell us the name of the last book you enjoyed'/>
          <button type="button" onClick={opensearch}> <HiMagnifyingGlass/> </button>
        </div>

        {/* Adapted from Upmostly https://upmostly.com/tutorials/build-a-react-switch-toggle-component */}
        <div className='pageturner_header-content__toggle'>
          <Row>
            <Col><p>Books</p></Col>
            <Col>
              <input className="react-switch-checkbox" id={`react-switch-new`} type="checkbox" />
              <label style={{background: '#06D6A0'}} className="react-switch-label" htmlFor={`react-switch-new`} >
                <span className={`react-switch-button`} />
              </label>
            </Col>
            <Col><p>People</p></Col>
          </Row>
        </div>

        <div className='pageturner__header-content__popularbooks'>
          <button type='button1' onClick={testApi}>Popular books right now</button>
        </div>

        <div className='pageturner__header-content__placeholder'>
          <button type='button2' onClick={testApi}>Placeholder</button>
        </div>

      </div>
      { // Just for the API test
        testText && <div>API Test Message: {testText}</div>
      }
    </div>
  );
};
