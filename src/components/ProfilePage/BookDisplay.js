import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import ReactLoading from 'react-loading';

import {getBook} from '../../api';

// import {BookInfo} from '../../BookInfo';

export const BookDisplay = ({bid}) => {
  const [book, setBook] = useState(null);

  const retrieveBookFromId = async () => {
    const retrievedBook = await getBook(bid);
    setBook(retrievedBook);
    console.log(retrievedBook);
  };

  useEffect(() => {
    retrieveBookFromId();
  }, []);

  return (
    <>
      {!book ? (<ReactLoading type="spin" color="black" />) : (
      <div className="max-width-xs">
        <nav>
          <center>
            <Link className="cursor-pointer" to={{
              pathname: '../book-info',
              search: '?id=' + book.id,
            }}>
              <img className="object-scale-down w-28 h-48" src={book.imageLinks.thumbnail}/>
              <div className="text-sm w-32">
                {book.title}
              </div>
            </Link>
          </center>
        </nav>
      </div>)}
    </>
  );
};
