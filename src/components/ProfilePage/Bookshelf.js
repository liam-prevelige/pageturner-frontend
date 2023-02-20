import {React, useState, useEffect} from 'react';

import {getBookshelf} from '../../api';
import ReactLoading from 'react-loading';
import {BookDisplay} from './BookDisplay';

export const Bookshelf = ({bookshelfId, isProfile, bookshelfData}) => {
  const [bookshelf, setBookshelf] = useState(bookshelfData);
  // const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const format = isProfile ? 'flex max-w-2xl mx-auto justify-start content-start overflow-x-auto' : 'flex max-w-xl mx-auto justify-start content-start overflow-x-auto';
  const fetchBookshelf = async () => {
    if (!bookshelfId) return;
    const bookshelfData = await getBookshelf(bookshelfId);
    setBookshelf(bookshelfData);
  };

  useEffect(() => {
    if (!bookshelf) {
      fetchBookshelf();
    }
  }, [bookshelfId]);

  return (
    <>
      {bookshelf && <div className="text-base text-black font-bold m-1">{bookshelf.name}</div>}
      <div className={format}>
        {!bookshelf ? <ReactLoading type="spin" color="black" /> : bookshelf.books.map((bid) => (
          <div key={bid} style={{marginLeft: '5px', marginRight: '5px'}}>
            <BookDisplay bid={bid} />
          </div>
        ))
        }
      </div>
    </>
  );
};
