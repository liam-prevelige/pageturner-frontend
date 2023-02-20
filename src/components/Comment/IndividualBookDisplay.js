import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ReactLoading from 'react-loading';

import {getBook} from '../../api';

export const IndividualBookDisplay = ({bid}) => {
  const [book, setBook] = useState(null);

  const navigate = useNavigate();
  const retrieveBookFromId = async () => {
    if (!bid) return;
    const retrievedBook = await getBook(bid);
    setBook(retrievedBook);
  };

  const loadBook = (e) => {
    e.stopPropagation();
    const path = `/book-info?id=${bid}`;
    navigate(path);
  };

  useEffect(() => {
    retrieveBookFromId();
  }, [bid]);

  return (
    <>
      {!book ? (<ReactLoading type="spin" color="black" />) : (
      <div className="max-width-xs">
        <nav>
          <center>
            <div className='flex flex-row justify-left' onClick={(e) => loadBook(e)}>
              <img className="object-scale-down w-24 h-24" src={book.imageLinks.thumbnail}/>
              <div className="flex flex-col justify-start">
                <div className="text-md font-bold">
                  {book.title}
                </div>
                <div className="text-md text-left">
                  {book.authors[0]}
                </div>
                <div className="text-sm text-left">
                  Published {book.publishedDate}
                </div>
              </div>
            </div>
          </center>
        </nav>
      </div>)}
    </>
  );
};
