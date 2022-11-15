import React, {useEffect, useState} from 'react';
import {DynamicSearch} from '../DynamicSearch';
import {getSearch, getTopBooks, getTopRecs} from '../../api';
import {BookDisplay} from '../BookDisplay'; // TODO: switch to BookInfo
import Card from 'react-bootstrap/Card';
import './LandingPage.css';
import {BookPreview} from './BookPreview';
import {Container, Row} from 'react-bootstrap';
import ReactLoading from 'react-loading';

/**
 * Component containing the landing page
 * @return {JSX} for landing page component
 */
export const LandingPage = () => {
  const [book, setBook] = useState(null);

  const [topBooks, setTopBooks] = useState([]);
  const [topRecs, setTopRecs] = useState([]);
  const [loaded, hasLoaded] = useState(false);

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

  const load = async () => {
    const books1 = await getTopBooks();
    const books2 = await getTopRecs();
    setTopBooks(books1);
    setTopRecs(books2);
    hasLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      load();
    }
  }, []);

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
              isbn={book.ISBN}
              title={book.title}
              author={book.author}
              coverImg={book.image_l}
              publisher={book.publisher}
              year={book.year}
            />
          </Card.Body>
        </Card>
      </Row>}
      <Row className="justify-content-left h3" style={{margin: '10px', marginTop: '30px'}}>Trending Now</Row>
      <Row className="align-items-top justify-content-center browse" style={{paddingTop: '0px'}}>
        {
          topBooks.length == 0 ? <ReactLoading type="spin" color="black" />:
          // eslint-disable-next-line arrow-parens
          topBooks.map((book, index) => (
            // eslint-disable-next-line react/jsx-key
            <div className="col-2" key={index}>
              <BookDisplay url={book.image_l} title={book.title} author={book.author}/>
            </div>
          ))
        }
      </Row>
      <Row className="justify-content-left h3" style={{margin: '10px', marginTop: '30px'}}>Top Rated</Row>
      <Row className="align-items-top justify-content-center browse" style={{paddingTop: '0px'}}>
        {
          topRecs.length == 0 ? <ReactLoading type="spin" color="black" />:
          // eslint-disable-next-line arrow-parens
          topRecs.map((book, index) => (
            // eslint-disable-next-line react/jsx-key
            <div className="col-2" key={index}>
              <BookDisplay url={book.image_l} title={book.title} author={book.author}/>
            </div>
          ))
        }
      </Row>
    </Container>
  );
};
