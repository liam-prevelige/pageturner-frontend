/**
 * renders a page for information on a particular book
 */

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import './bookInfo.css'

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'


export const BookInfo = () => {
  return (
    <div className="App">
      <div className='gradient_bg'>
        <Container>
          <Row>
            <Col><Image src={require('./harry-potter-cover.png')} alt='...' /></Col> 
            <Col>
              <Row>
                <h1>Harry Potter and the Goblet of Fire</h1>
              </Row>
              <Row>
                <h3>2000 - Fantasy/Adventure/Mystery</h3>
              </Row>
              <Row>
                <Col>*5-star rating system*</Col>
                <Col>44,329 reviews</Col>
              </Row>
              <Row>
                <button type="button" class="btn btn-danger">Remove from recommendations</button>
                <button type="button" class="btn btn-success">Add to list</button>
              </Row>
              <Row>
                <form>
                  <div class="form-group">
                    <label for="bookReviewTextArea">Add a review:</label>
                    <textarea class="form-control" id="bookReviewTextArea" rows="4"></textarea>
                    <button type="submit" class="btn btn-primary">Post review</button>
                  </div>
                </form>
              </Row>
            </Col>
          </Row>
            <h3>Other books by this author:</h3>
          <Row>
            <ListGroup horizontal>
              <ListGroup.Item><Image src={require('./harry-potter-cover.png')} alt='...' /></ListGroup.Item>
              <ListGroup.Item><Image src={require('./harry-potter-cover.png')} alt='...' /></ListGroup.Item>
              <ListGroup.Item><Image src={require('./harry-potter-cover.png')} alt='...' /></ListGroup.Item>
              <ListGroup.Item><Image src={require('./harry-potter-cover.png')} alt='...' /></ListGroup.Item>
            </ListGroup>
          </Row>
          <Row>
          <h3>What your friends think:</h3>
          <ListGroup vertical>
              <ListGroup.Item>Review</ListGroup.Item>
              <ListGroup.Item>Review</ListGroup.Item>
              <ListGroup.Item>Review</ListGroup.Item>
              <ListGroup.Item>Review</ListGroup.Item>
            </ListGroup>
          </Row>          
        </Container>
      </div>
    </div>
  );
}