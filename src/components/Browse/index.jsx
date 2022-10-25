import React, {useEffect, useState} from 'react';
import {BookDisplay} from './BookDisplay';
import {useSearchParams} from 'react-router-dom';
import {getSearch} from '../../api';

export const Browse = () => {
  const [searchparams] = useSearchParams();
  const searchParams = searchparams.get('query');

  const [searchResults, setSearchResults] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const load = async () => {
    if (!loaded) {
      const results = await getSearch(searchParams);
      setSearchResults(results);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    console.log(`${searchResults} ${loaded}`);
  }, [searchResults, loaded]);

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
