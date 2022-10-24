import React, {useEffect, useState} from 'react';
import {BookDisplay} from './BookDisplay';
import {useSearchParams} from 'react-router-dom';
import {getSearch} from '../../api';

export const Browse = () => {
  const [searchparams] = useSearchParams();
  const searchParams = searchparams.get('query');
  console.log('testing here', searchParams);

  const [searchResults, setSearchResults] = useState('');
  const getSearchResults = async () => {
    const results = await getSearch(searchparams.get('query'));
    setSearchResults(results);
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getSearchResults();
      return () => {
        ignore = true;
      };
    }
  }, []);
  console.log('is this undefined', searchResults); // TODO: Update population of books with data from search results

  return (
    <div>
      <div className="container-sm text-center">
        <div className="row align-items-start">
          {/* <div className="col-2">
            <BookDisplay/>
          </div> */}
          <div className="col-2">
            <BookDisplay imagesrc="http://images.amazon.com/images/P/0889652015.01.LZZZZZZZ.jpg" title="YES" author="Whatever"/>
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
