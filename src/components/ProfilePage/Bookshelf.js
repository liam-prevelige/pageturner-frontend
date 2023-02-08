import {React, useState, useEffect} from 'react';

import {getBookshelf} from '../../api';
import {ScrollMenu} from 'react-horizontal-scrolling-menu'; // https://www.npmjs.com/package/react-horizontal-scrolling-menu
import ReactLoading from 'react-loading';
import {Col} from 'react-bootstrap';
import {BookDisplay} from './BookDisplay';
// import {BookDisplay} from '../BookDisplay';

export const Bookshelf = ({bookshelfId}) => {
  const [bookshelf, setBookshelf] = useState(null);
  // const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];

  const fetchBookshelf = async () => {
    const bookshelfData = await getBookshelf(bookshelfId);
    console.log(bookshelfData);
    setBookshelf(bookshelfData);
  };

  useEffect(() => {
    fetchBookshelf();
  }, []);

  return (
    <>
      {bookshelf && <div className="text-base text-black font-bold m-1">{bookshelf.name}</div>}
      <ScrollMenu style={{overflowX: 'auto'}}>
        {!bookshelf ? <ReactLoading type="spin" color="black" /> : bookshelf.books.map((bid, index) => (
          <Col key={index} style={{width: '190px', marginLeft: '10px', marginRight: '10px'}}>
            <BookDisplay bid={bid} />
          </Col>
        ))
        }
      </ScrollMenu>
    </>
  );
};
