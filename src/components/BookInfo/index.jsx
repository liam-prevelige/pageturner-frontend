/**
 * Renders a page for information on a particular book
 * See other books written by current book's author
 * Write a review and give a rating
 */

import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './bookInfo.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactLoading from 'react-loading';
import {getBook, postComment, getReviews} from '../../api';
import {Review} from '../Comment/Review';
import {Rating} from '@mui/material';
import {BookshelfPopup} from './BookshelfPopup';
import {BackNav} from '../BackNav/BackNav';
import {FaAngleDown, FaAngleUp} from 'react-icons/fa';
import parse from 'html-react-parser';

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
  const [isLoading, setIsLoading] = useState(true);

  const retrieveBookFromId = async () => {
    const id = queryParams.get('id');
    const retrievedBook = await getBook(id);
    if (retrievedBook) {
      setBook(retrievedBook);
    }
    console.log(retrievedBook);
  };

  // Local review
  const handleSubmit = (event) => {
    event.preventDefault();
    setReviews([...reviews, {review, rating}]);
    setReview('');
    setRating(0);
  };

  // Global review
  const submitPostCb = async () => {
    if (setReview && setReview.length > 0) {
      await postComment('global', book.id, 'book', review);
      setIsLoading(true);
      setReview('');
      setRating(0);
    }
  };

  const loadReviews = async (newBookId) => {
    if (!newBookId) return;
    const newReviews = await getReviews(newBookId);
    setReviews(newReviews);
  };

  useEffect(() => {
    if (!isBookInfo) {
      retrieveBookFromId();
    }
  }, []);

  useEffect(() => {
    if (isLoading && book) {
      loadReviews(book.bookId); // setState hooks are async, so this is necessary
      setIsLoading(false);
    }
  }, [book]);

  return (
    <>
      {!book ? <ReactLoading type="spin" color="black" /> : (
      <div>
        <div className='gradient_bg'>
          <BackNav />
          <div className="flex flex-col">
            <div className="flex flex-row">
              <img className="object-scale-down w-36 h-56" src={book.imageLinks.thumbnail} alt='...'/>
              <div className="flex flex-col ml-3">
                <span className="font-bold text-3xl text-black">{book.title}</span>
                <span className='text-slate-500 text-2xl'>{book.authors[0]} • {book.publishedDate.substr(0, 4)}</span>
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

          <Container>
            <Row>
              {!book ? <ReactLoading type="spin" color="black" /> :
            <Col></Col>}
              <Col>
                <Row>
                  {!book ? <ReactLoading type="spin" color="black" /> :
                <span className="font-bold text-2xl text-black">{book.title}</span>}
                </Row>
                <Row>
                  <div className="flex flex-row ..." style={{marginTop: '5px'}}>
                    {!book ? <ReactLoading type="spin" color="black" /> :
                  <span className='text-slate-500'>{book.authors[0]} • {book.publishedDate.substr(0, 4)}</span>}
                  </div>
                </Row>
                <Row>
                  {!book ? <ReactLoading type="spin" color="black" /> :
                <span className='text-sm' style={{marginTop: '5px'}}>{parse(book.description.substring(0, 650))}...</span>}
                </Row>
                <Row>
                  <BookshelfPopup bid={book.id} useIcon={false}/>
                </Row>
              </Col>
              {/* {!loggedIn && <p>Sign in to write and post a review!</p>} */}
              {loggedIn && <form onSubmit={handleSubmit}>
                <div className="form-group" style={{marginTop: '20px'}}>
                  <textarea placeholder='Add a review' className="form-control bg-gray-100 p-2" rows="8" value={review} onChange={(event) => setReview(event.target.value)} />
                  <div>
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(event) => {
                        setRating(parseInt(event.target.value));
                      }}
                    />
                  </div>
                  <button className="button-tweet font-bold wrap-text justify-center text-primary-button rounded-full shadow-sm justify-center py-2 px-4 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:text-white" type="submit" onClick={submitPostCb}>Post Review</button>
                </div>
              </form>}
            </Row>
            <Row>
              {/* TODO: Dynamically render other books */}
              <div className='font-semibold' style={{marginTop: '20px'}}>
                {!book ? <ReactLoading type="spin" color="black" /> :
              <h3>Other books by {book.authors[0]}</h3>}
                <img className='box-content h-64 w-48 p-2' src='https://images.randomhouse.com/cover/9781582436043' alt='...' />
              </div>
            </Row>
            <Row>
              <div style={{marginTop: '20px'}}>
                <p className='font-semibold'>Reviews</p>
                {reviews.map((r, index) =>
                // ((bookId === r && <div key={index}>
                  (<div key={index}>
                    <Review commentId={r._id} noParent={true}/>
                    <div className="border-b ml-3 mr-3 border-slate-300"></div>
                  </div>
                  ))}
              </div>
            </Row>
          </Container>
        </div>
      </div>)}
    </>
  );
};

{/* <ScrollMenu style={{overflowX: 'auto'}}>
              {console.log(recs.length)}
              {recs.length === 0 ? <ReactLoading type="spin" color="black" /> : recs.map((book, index) => (
                <Col key={index} style={{width: '190px', marginLeft: '10px', marginRight: '10px'}}>
                  <BookDisplay url={book.image_l} title={book.title} author={book.author} />
                </Col>
              ))
              }
            </ScrollMenu> */}
