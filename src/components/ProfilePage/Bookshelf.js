import {React, useState, useEffect} from 'react';

import {getBookshelf} from '../../api';
import ReactLoading from 'react-loading';
import {BookDisplay} from './BookDisplay';
import {FaEdit, FaTrash} from 'react-icons/fa';

export const Bookshelf = ({bookshelfId, isProfile, bookshelfData, isMyProfile}) => {
  const [bookshelf, setBookshelf] = useState(bookshelfData);
  const [originalBookshelf, setOriginalBookshelf] = useState(bookshelfData);

  // const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const format = isProfile ? 'flex max-w-2xl min-w-2xl mx-auto justify-start content-start overflow-x-auto' : 'flex max-w-xl min-w-xl mx-auto justify-start content-start overflow-x-auto';
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchBookshelf = async () => {
    if (!bookshelfId) return;
    const bookshelfData = await getBookshelf(bookshelfId);
    setBookshelf(bookshelfData);
    setOriginalBookshelf(bookshelfData);
  };

  const deleteBook = (bid) => {
    const newBookshelf = {...bookshelf};
    newBookshelf.books = newBookshelf.books.filter((book) => book != bid);
    setBookshelf(newBookshelf);
  };

  const deleteBookshelf = () => {
    const emptyBookshelf = {title: '', books: []};
    setBookshelf(emptyBookshelf);
  };

  const onSaveEdit = async () => {
    await updateBookshelf(originalBookshelf._id, bookshelf);
    setIsEditMode(false);
  };

  const onCancelEdit = () => {
    setIsEditMode(false);
    setBookshelf(originalBookshelf);
  };

  useEffect(() => {
    if (!bookshelf) {
      fetchBookshelf();
    }
  }, [bookshelfId]);

  return (
    <>
      {!bookshelf ? <ReactLoading type="spin" color="black" /> :
      <div>
        <div className="flex flex-row justify-between">
          <div className="text-base text-black font-bold m-1">{bookshelf.name}</div>
          {isEditMode && <button className="text-sm font-bold text-red-400 rounded-full border-2 border-red-400 transform transition-colors duration-200 hover:bg-red-400 hover:text-white pt-1 pb-1 pl-2 pr-2" onClick={deleteBookshelf}>Delete Bookshelf</button>}
        </div>
        <div className={format}>
          {bookshelf.books.map((bid) => (
            <div key={bid} style={{marginLeft: '5px', marginRight: '5px'}}>
              <BookDisplay bid={bid} />
              {isEditMode && <div className="flex justify-center mt-1 mb-1">
                <button className="p-2 bg-red-300 rounded-full" onClick={() => deleteBook(bid)}>
                  <FaTrash/>
                </button>
              </div>}
            </div>
          ))
          }
        </div>
        {isMyProfile &&
        <div className="flex m-3 justify-end">
          {isEditMode ?
          <div>
            <button className="text-sm font-bold text-green-500 rounded-full border-2 border-green-500 transform transition-colors duration-200 hover:bg-green-500 hover:text-white pt-1 pb-1 pl-2 pr-2" onClick={onSaveEdit}>Save</button>
            <button className="ml-3 text-sm font-bold text-slate-400 rounded-full border-2 border-slate-400 transform transition-colors duration-200 hover:bg-slate-400 hover:text-white pt-1 pb-1 pl-2 pr-2" onClick={onCancelEdit}>Cancel</button>
          </div> :
          <FaEdit className="cursor-pointer w-5 h-5 fill-green-500" onClick={() => setIsEditMode(true)}/>}
        </div>}
      </div>}
    </>
  );
};
