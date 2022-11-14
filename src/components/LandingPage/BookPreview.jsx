import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import {BookDisplay} from './BookDisplay';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import {getRecs} from '../../api';

export const BookPreview = ({isbn, title, author, coverImg, publisher, year}) => {
  const [recs, setRecs] = useState([]);
  const [loaded, hasLoaded] = useState(false);

  // Get recommendations from the database
  const loadRecs = async () => {
    if (isbn) {
      const newRecs = await getRecs(isbn);
      console.log(newRecs);
      setRecs(newRecs);
    }
  };

  // When a book is selected, get recommendations
  const load = async () => {
    setRecs([]);
    await loadRecs();
    hasLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      load();
    }
  }, []);

  return (<Container>
    <Row>
      <Col md={3}><img src={coverImg} alt={title} /></Col>
      <Col md={9}>
        <Row><h2>{title}</h2></Row>
        <Row><h3>{author}</h3></Row>
        <Row><h5>{publisher}&nbsp;{year}</h5></Row>
      </Col>
    </Row>
    <hr />
    <h3>More Like This:</h3>
    <ScrollMenu style={{overflowX: 'auto'}}>
      {console.log(recs.length)}
      {recs.length === 0 ? <ReactLoading type="spin" color="black" /> : recs.map((book, index) => (
        <Col key={index} style={{marginLeft: '10px', marginRight: '10px'}}>
          <BookDisplay url={book.image_m} title={book.title} author={book.author} style={{margin: '30px', marginRight: '4px'}}/>
        </Col>
      ))
      }
    </ScrollMenu>
  </Container>);
};
