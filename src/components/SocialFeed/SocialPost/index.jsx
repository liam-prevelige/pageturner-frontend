import React from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export const SocialPost = () => {
  return (
    <Card style={{width: '35rem'}}>
      <ListGroup variant="flush">
        <ListGroup.Item>*username*</ListGroup.Item>
        <ListGroup.Item>
          <Card.Img variant="top" src="http://images.amazon.com/images/P/0889652015.01.LZZZZZZZ.jpg"/></ListGroup.Item>
        <ListGroup.Item>
          <Card.Body>
            <Card.Title>*Book Title*</Card.Title>
            <Card.Text>
                *whatever the user wants to say about the book*
            </Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
