import {PostContainer} from './PostContainer';
// import {PreferenceList} from './PreferenceList';
// import {ProfileCard} from './ProfileCard';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './feed.css';

export const Feed = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          {/** <Col>
            <div className='disable-scroll'>
              <PreferenceList name='Darrell'/>
            </div>
          </Col> */}
          <Col> {/** scrollable - Alex's work goes in this column */}
            <PostContainer />
          </Col>
          {/* <Col>
            <div className='disable-scroll'>
              <ProfileCard profileImgUrl='genericprofilepic.jpg' name='Darrell Steward' userComment='I love Goblet of Fire so much! Check it out!'/>
            </div>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};
