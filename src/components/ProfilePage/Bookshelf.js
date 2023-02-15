import {React, useState, useEffect} from 'react';

import {getBookshelf} from '../../api';
// import {ScrollMenu} from 'react-horizontal-scrolling-menu'; // https://www.npmjs.com/package/react-horizontal-scrolling-menu
import ReactLoading from 'react-loading';
// import {Col} from 'react-bootstrap';
import {BookDisplay} from './BookDisplay';
// import {BookDisplay} from '../BookDisplay';

export const Bookshelf = ({bookshelfId, isProfile}) => {
  const [bookshelf, setBookshelf] = useState(null);
  // const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  let format = 'flex max-w-xl mx-auto justify-start content-start overflow-x-auto';
  if (isProfile) {
    format = 'flex max-w-2xl mx-auto justify-start content-start overflow-x-auto';
  }
  const fetchBookshelf = async () => {
    const bookshelfData = await getBookshelf(bookshelfId);
    setBookshelf(bookshelfData);
  };

  useEffect(() => {
    fetchBookshelf();
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
