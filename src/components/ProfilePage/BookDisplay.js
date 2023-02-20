import {React, useState, useEffect} from 'react';
import ReactLoading from 'react-loading';
import {useNavigate} from 'react-router-dom';
import {getBook} from '../../api';

// import {BookInfo} from '../../BookInfo';

export const BookDisplay = ({bid}) => {
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
            <div className="cursor-pointer" onClick={(e) => loadBook(e)}>
              <img className="object-scale-down w-28 h-48" src={book.imageLinks.thumbnail}/>
              <div className="text-sm w-32">
                {book.title}
              </div>
            </div>
          </center>
        </nav>
      </div>)}
    </>
  );
};
