import {PostContainer} from './PostContainer';
import {PreferenceList} from './PreferenceList';
import {ProfileCard} from './ProfileCard';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './feed.css';

export const Feed = () => {
  return (
    <div>
      <PostContainer />
      <Container fluid>
        <Row>
          <Col> {/** fixed */}
            <div className='disable-scroll'>
              <PreferenceList />
            </div>
          </Col>
          <Col> {/** scrollable - Alex's work goes in this column */}
            <PostContainer />
            <PostContainer />
            <PostContainer />
            <PostContainer />
            <PostContainer />
            <PostContainer />
          </Col>
          <Col> {/** fixed */}
            <div className='disable-scroll'>
              <ProfileCard profileImgUrl='genericprofilepic.jpg' name='Darrell Steward' userComment='I love Goblet of Fire so much! Check it out!'/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
