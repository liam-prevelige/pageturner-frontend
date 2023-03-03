import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ReactLoading from 'react-loading';

import {getBook} from '../../api';

export const IndividualBookDisplay = ({bid, disableClickThrough}) => {
  const [book, setBook] = useState(null);

  const navigate = useNavigate();
  const retrieveBookFromId = async () => {
    if (!bid) return;
    const retrievedBook = await getBook(bid);
    fillMissingData(retrievedBook);
    setBook(retrievedBook);
  };

  const fillMissingData = (retrievedBook) => {
    if (!retrievedBook.imageLinks) {
      retrievedBook.imageLinks = {thumbnail: 'https://cdn.pixabay.com/photo/2018/01/17/18/43/book-3088777__340.png'};
    }
    if (!retrievedBook.averageRating) {
      retrievedBook.averageRating = 0;
    }
    if (!retrievedBook.publishedDate) {
      retrievedBook.publishedDate = 'Unknown';
    }
    if (!retrievedBook.pageCount) {
      retrievedBook.pageCount = 'Unknown';
    }
    if (!retrievedBook.authors) {
      retrievedBook.authors = ['Author Unknown'];
    }
    if (!retrievedBook.categories) {
      retrievedBook.categories = ['Uncategorized'];
    }
    if (!retrievedBook.description) {
      retrievedBook.description = 'No description available';
    }
  };

  const loadBook = (e) => {
    e.stopPropagation();
    if (disableClickThrough) {
      return;
    }
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
                  {book.authors && book.authors[0]}
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
