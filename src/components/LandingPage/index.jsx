import React, {useState} from 'react';
import {DynamicSearch} from '../DynamicSearch';
import {getSearch} from '../../api';
import Card from 'react-bootstrap/Card';
import './LandingPage.css';
import {BookPreview} from './BookPreview';
import {Container, Row} from 'react-bootstrap';

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
    <Container>
      <Row className="justify-content-center h1 m-4">Get Started</Row>
      <Row className="justify-content-center">
        <DynamicSearch searchFn={searchFn} onSelect={onSelect} placeholder="Enter the title of a book you enjoyed" />
      </Row>
      {book && <Row className="justify-content-center">
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
      </Row>}
    </Container>
  );
};
