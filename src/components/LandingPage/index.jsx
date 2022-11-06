import React, {useState} from 'react';
// import {createSearchParams, useNavigate} from 'react-router-dom';
import {DynamicSearch} from '../DynamicSearch';
import {getSearch} from '../../api';
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './LandingPage.css';
import {BookPreview} from './BookPreview';

/**
 * Component containing the landing page
 * @return {JSX} for landing page component
 */
export const LandingPage = () => {
  const [book, setBook] = useState(null);

  // TODO: rework everything in cluster below when cleaning up getSearch endpoint
  const [books, setBooks] = useState([]);
  const searchFn = async (query) => {
    const results = await getSearch(query);
    const newBooks = results.map((res) => {
      return {
        id: res.ISBN,
        label: res.title,
        rest: res,
      };
    });
    setBooks(newBooks);
    return newBooks;
  };
  const onSelect = (isbn) => {
    books.forEach((b) => {
      if (b.id === isbn) {
        setBook(b.rest);
        return;
      }
    });
  };

  return (
    <div>
      <div className="row justify-content-center h1 m-4">Get Started</div>
      <div className="row justify-content-center">
        <DynamicSearch searchFn={searchFn} onSelect={onSelect} placeholder="Enter the title of a book you enjoyed" />
      </div>
      {book && <div className="row justify-content-center">
        <Card className="book m-4">
          <Card.Body>
            <BookPreview
              title={book.title}
              author={book.author}
              coverImg={book.image_m}
              publisher={book.publisher}
              year={book.year}
            />
          </Card.Body>
        </Card>
      </div>}
    </div>
  );
};
