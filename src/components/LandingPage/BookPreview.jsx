import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import {getRecs} from '../../api';

export const BookPreview = ({title, author, coverImg, publisher, year}) => {
  const [recs, setRecs] = useState([]);

  // Get recommendations from the database
  const loadRecs = async () => {
    if (title) {
      const newRecs = await getRecs(title);
      console.log(newRecs);
      setRecs(newRecs);
    }
  };

  // When a book is selected, get recommendations
  useEffect(() => {
    setRecs([]);
    loadRecs();
  }, [title]);

  return (<Container>
    <Row>
      <Col md={3}><img src={coverImg} alt={title}/></Col>
      <Col md={9}>
        <Row><h2>{title}</h2></Row>
        <Row><h3>{author}</h3></Row>
        <Row><h5>{publisher}&nbsp;{year}</h5></Row>
      </Col>
    </Row>
    <hr />
    <Row className="justify-content-center">
      <h3>More Like This:</h3>
      {recs.length == 0 ? <ReactLoading type="spin" color="black" /> : recs.map((rec, index) => {
        return <div key={index}>TODO: add bookinfo for this recommendation</div>;
      })}
    </Row>
  </Container>);
};
