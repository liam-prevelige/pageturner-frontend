import {React, useState, useEffect} from 'react';
import './BookDisplay.css';
// import {Link} from 'react-router-dom';
import ReactLoading from 'react-loading';

import {getBook} from '../../api';

// import {BookInfo} from '../../BookInfo';

export const BookDisplay = ({bid}) => {
  const [book, setBook] = useState(null);

  const getBookData = async () => {
    const bookData = await getBook(bid);
    console.log(bookData);
    setBook(bookData);
  };

  useEffect(() => {
    getBookData();
  }, []);

  return (
    <>
      {!book ? (<ReactLoading type="spin" color="black" />) : (
      <div className="card">
        <img src={''} style={{height: '250px'}}/>
        <nav className="info">
          <center>
            {/* <Link to={{
              pathname: '../book-info',
              search: '?isbn=' + isbn + '&url=' + url + '&title=' + title + '&author=' + author,
            }} */}
            {/* > */}
            {/* <b>{'title'}</b> <br/> {'author'}
            </Link> */}
          </center>
        </nav>
      </div>)}
    </>
  );
};
