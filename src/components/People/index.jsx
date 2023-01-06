import React, {useState} from 'react';
import {DynamicSearch} from '../DynamicSearch';
import {searchUsers, getUserBooks, addFriend, removeFriend} from '../../api';
import {BookDisplay} from '../BookDisplay';
import Card from 'react-bootstrap/Card';
import './People.css';
import {Container, Row, Col, Button} from 'react-bootstrap';
import Loading from 'react-loading';

/**
 * Component containing the people page
 * @return {JSX} for people page component
 */
export const People = () => {
  const [user, setUser] = useState(null);
  const [userBookshelf, setUserBookshelf] = useState(null);
  const [userReadBooks, setUserReadBooks] = useState(null);

  const [users, setUsers] = useState([]);
  const searchFn = async (query) => {
    const results = await searchUsers(query);
    const newUsers = results.map((res) => {
      return {
        id: res.email,
        label: res.name,
        rest: res,
      };
    });
    setUsers(newUsers);
    return newUsers;
  };
  const onSelect = async (isbn) => {
    let email = null;
    users.forEach((u) => {
      if (u.id === isbn) {
        setUser(u.rest);
        email = u.rest.email;
        return;
      }
    });

    const res = await getUserBooks(email);
    setUserBookshelf(res.bookshelf);
    setUserReadBooks(res.read);
  };

  const toggleFriend = async () => {
    if (user.friend) {
      if (await removeFriend(user.email)) {
        setUser({...user, friend: false});
      }
    } else {
      if (await addFriend(user.email)) {
        setUser({...user, friend: true});
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center h1 m-4">Find People</Row>
      <Row className="justify-content-center">
        <DynamicSearch searchFn={searchFn} onSelect={onSelect} placeholder="Search for people" />
      </Row>
      {user && <Row className="justify-content-center">
        <Card className="book m-4">
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Container>
              <Row><Button onClick={toggleFriend} variant={user.friend? 'danger' : 'success'}>
                {user.friend ? 'Remove' : 'Add'} Friend
              </Button></Row>
              <Row>{user.name}&apos;s Bookshelf:</Row>
              {!userBookshelf ? <Loading type="spin" color="black" /> : <Row>{userBookshelf.map((book, index) => (
                <Col key={index} style={{width: '190px', marginLeft: '10px', marginRight: '10px'}}>
                  <BookDisplay url={book.image_l} title={book.title} author={book.author}/>
                </Col>
              ))}</Row>}
              <Row>{user.name}&apos;s Past Reads:</Row>
              {!userReadBooks ? <Loading type="spin" color="black" /> : <Row>{userReadBooks.map((book, index) => (
                <Col key={index} style={{width: '190px', marginLeft: '10px', marginRight: '10px'}}>
                  <BookDisplay url={book.image_l} title={book.title} author={book.author}/>
                </Col>
              ))}</Row>}
            </Container>
          </Card.Body>
        </Card>
      </Row>}
      <Row>
        Placeholder. Todo add top people/influencers
        {/** Add top people page here*/}
      </Row>
    </Container>
  );
};
