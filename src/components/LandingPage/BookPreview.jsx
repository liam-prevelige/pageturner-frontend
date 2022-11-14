import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ReactLoading from 'react-loading';
import {BookDisplay} from '../BookDisplay';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import {getRecs, updateBookmarks, updateRead} from '../../api';
import {FaBookmark, FaRegBookmark} from 'react-icons/fa';
import {AiFillRead, AiOutlineRead} from 'react-icons/ai';

export const BookPreview = ({isbn, title, author, coverImg, publisher, year}) => {
  const [recs, setRecs] = useState([]);
  const [loaded, hasLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem('profile')));
  let loggedIn = userInfo != null;
  let bookmarked = false;
  let read = false;

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
    setUserInfo(JSON.parse(sessionStorage.getItem('profile')));
    console.log(userInfo);
    loggedIn = userInfo != null;
    await loadRecs();
    hasLoaded(true);
  };

  useEffect(() => {
    if (!loaded) {
      load();
    }
  }, []);

  const changeBookmark = () => {
    console.log(bookmarked);
    updateBookmarks(userInfo.email, isbn, bookmarked);
    bookmarked = !bookmarked;
  };

  const changeRead = () => {
    console.log(read);
    updateRead(userInfo.email, isbn, read);
    read = !read;
  };

  console.log(loggedIn);

  return (<Container>
    <Row>
      <Col md={3}><img src={coverImg} alt={title} style={{height: '275px'}} /></Col>
      <Col md={9}>
        <Row><h2>{title}</h2></Row>
        <Row><h3>{author}</h3></Row>
        <Row><h5>{publisher}&nbsp;{year}</h5></Row>
        <Row>
          <Col>
            {loggedIn && <button onClick={changeBookmark}>{ {bookmarked} ?
              <FaBookmark style={{height: '50px', width: '50px', margin: '5px'}}/> :
              <FaRegBookmark style={{height: '50px', width: '50px', margin: '5px'}}/>
            }</button>}
          </Col>
          <Col>
            {loggedIn && <button onClick={changeRead}>{ {read} ?
            <AiFillRead style={{height: '50px', width: '50px', margin: '5px'}}/> :
            <AiOutlineRead style={{height: '50px', width: '50px', margin: '5px'}}/>
            }</button>}
          </Col>
        </Row>
      </Col>
    </Row>
    <hr />
    <h3>More Like This:</h3>
    <ScrollMenu style={{overflowX: 'auto'}}>
      {console.log(recs.length)}
      {recs.length === 0 ? <ReactLoading type="spin" color="black" /> : recs.map((book, index) => (
        <Col key={index} style={{width: '190px', marginLeft: '10px', marginRight: '10px'}}>
          <BookDisplay url={book.image_l} title={book.title} author={book.author}/>
        </Col>
      ))
      }
    </ScrollMenu>
  </Container>);
};
