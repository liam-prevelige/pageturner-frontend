import React, {useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ReactLoading from 'react-loading';

export const BookPreview = ({title, author, coverImg, publisher, year}) => {
  const [recs] = useState([]);
  const [loading] = useState(true);

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
      {loading ? <ReactLoading type="spin" color="black" /> : recs.map((rec, index) => {
        return <div key={index}>Book</div>;
      })}
    </Row>
  </Container>);
};
