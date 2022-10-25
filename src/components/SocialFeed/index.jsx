import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './socialFeed.css';

import {SocialPost} from './SocialPost';

export const SocialFeed = () => {
  return (
    <Container fluid>
      <Row>
        <Col> {/** fixed */}
          <div className='disable-scroll'>
            <h1>Fixed</h1>
          </div>
        </Col>
        <Col> {/** scrollable - Alex's work goes in this column */}
          <SocialPost/>
          <SocialPost/>
          <SocialPost/>
          <SocialPost/>
          <SocialPost/>
          <SocialPost/>
        </Col>
        <Col> {/** fixed */}
          <div className='disable-scroll'>
            <h1>Fixed</h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
