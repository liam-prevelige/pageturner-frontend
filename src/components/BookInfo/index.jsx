/**
 * Renders a page for information on a particular book
 * See other books written by current book's author
 * Write a review and give a rating
 */

import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './bookInfo.css';
import ReactLoading from 'react-loading';
import {getBook, postComment, getReviews} from '../../api';
import {Comment} from '../Comment/Comment';
import {Rating} from '@mui/material';
import {BookshelfPopup} from './BookshelfPopup';
import {BackNav} from '../BackNav/BackNav';
import {FaAngleDown, FaAngleUp} from 'react-icons/fa';
import parse from 'html-react-parser';
import ReactGA from 'react-ga';

export const BookInfo = () => {
  const search = window.location.search;
  const queryParams = new URLSearchParams(search);
  const isBookInfo = !queryParams.has('id');
  const loggedIn = useState(JSON.parse(sessionStorage.getItem('profile')))[0] != null;

  const [book, setBook] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [ratingMissing, setRatingMissing] = useState(false);
  const [reviewMissing, setReviewMissing] = useState(false);

  const retrieveBookFromId = async () => {
    const id = queryParams.get('id');
    try {
      const retrievedBook = await getBook(id);
      if (retrievedBook) {
        fillMissingData(retrievedBook);
        if (retrievedBook.authors.length > 3) {
          retrievedBook.authors = retrievedBook.authors.slice(0, 3);
          retrievedBook.authors.push('...');
        }
        setBook(retrievedBook);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    }
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

  // Global review
  const submitPostCb = async () => {
    if (!rating) {
      setRatingMissing(true);
    }
    if (review.length === 0) {
      setReviewMissing(true);
    }

    if (rating && review.length > 0) {
      await postComment('global', book.bookId, 'book', review, {rating: rating});
      setReview('');
      setRating(0);
      loadReviews(book.bookId);
    }
  };

  const handleBuyBook = () => {
    const affiliateTag = 'pageturner0a-20';
    const amazonSearchUrl = `https://www.amazon.com/s?k=${book.title}&tag=${affiliateTag}`;
    window.open(amazonSearchUrl, '_blank');
  };

  const loadReviews = async (newBookId) => {
    if (!newBookId) return;
    let newReviews = await getReviews(newBookId);
    newReviews = newReviews.sort((a, b) => new Date(b.metadata.timestamp) - new Date(a.metadata.timestamp));
    setReviews(newReviews);
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
    if (!isBookInfo) {
      retrieveBookFromId();
    }
  }, []);

  useEffect(() => {
    if (book) {
      console.log(book);
      loadReviews(book.bookId);
    }
  }, [book]);

  return (
    <>
      {!book ? notFound ? <div>Unable to Load Resource</div> : <ReactLoading type="spin" color="black" /> : (
      <div>
        <div className='gradient_bg'>
          <BackNav />
          <div className="flex flex-col">
            <div className="flex flex-row">
              <img className="object-scale-down w-36 h-56" src={book.imageLinks.thumbnail} alt='...'/>
              <div className="flex flex-col ml-3 mt-2">
                <span className="font-bold text-3xl text-black mb-1">{book.title}</span>
                <div className="flex flex-row">
                  <span className='text-slate-500 font-semibold text-xl mb-1'>{book.publishedDate.substr(0, 4)}</span>
                  {book.authors.map((author, index) => (
                    <div className='text-slate-500 font-semibold text-xl mb-1' key={index}>&nbsp;• {author}</div>
                  ))}
                </div>
                <span className='text-slate-500 text-lg mb-1'>{book.categories[0].split('/').shift()} • {book.pageCount} pages </span>
                <span className='text-slate-500 text-lg mb-2'></span>
                <Rating
                  name="half-rating-read"
                  value={book.averageRating || 0}
                  precision={0.5}
                  readOnly
                />
                <div className="flex flex-row">
                  <BookshelfPopup bid={book.bookId} useIcon={false}/>
                  {book.title && <button className="font-bold px-3 mt-3 mr-3 text-blue-400 wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-blue-400 transform transition-colors duration-200 hover:bg-blue-400 hover:border-blue-400 hover:text-white" onClick={handleBuyBook}>
                    Buy Now
                  </button>}
                </div>
              </div>
            </div>
            {isCollapsed && <div>
              <span className='text-sm' style={{marginTop: '5px'}}>{parse(book.description.substring(0, 650))}...</span>
              <div className='flex flex-row justify-center'>
                <button className="w-8" onClick={() => setIsCollapsed(false)}><FaAngleDown/></button>
              </div>
            </div>}
            {!isCollapsed && <div>
              <span className='text-sm' style={{marginTop: '5px'}}>{parse(book.description)}</span>
              <div className='flex flex-row justify-center'>
                <button className="w-8" onClick={() => setIsCollapsed(true)}><FaAngleUp/></button>
              </div>
            </div>}
          </div>

          {loggedIn &&
            <div className="form-group m-2">
              <textarea placeholder='Add a review' className="form-control resize-none bg-gray-100 p-2" rows="2" value={review}
                onChange={(event) => {
                  setReview(event.target.value); setReviewMissing(false);
                }} />
              <div className="m-1">
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event) => {
                    setRating(parseInt(event.target.value));
                    setRatingMissing(false);
                  }}
                />
              </div>
              {ratingMissing && <div>Please provide a star rating to post this review.</div>}
              {reviewMissing && <div>Please provide text for this review.</div>}
              <button className="button-tweet font-bold wrap-text justify-center text-primary-button rounded-full shadow-sm justify-center py-2 px-4 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:text-white" type="submit" onClick={submitPostCb}>
                Post Review
              </button>
            </div>
          }

          <div className="mt-4">
            <p className='font-semibold text-lg mb-2'>Reviews on PageTurner</p>
            <div className="bg-slate-100 rounded p-2">
              {reviews.map((review) =>
                (<div key={review._id}>
                  <Comment comment={review} noParent={true}/>
                  <div className="border-b ml-3 mr-3 border-slate-300"></div>
                </div>
                ))}
            </div>
          </div>
        </div>
      </div>)}
    </>
  );
};

