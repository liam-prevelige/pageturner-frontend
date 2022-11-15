/**
 * renders a page for information on a particular book
 * 5-star rating system amdended from: https://javascript.plainenglish.io/react-5-star-rating-system-4fa81b71cac9
 * star images from: https://icons8.com/icons/set/empty-star
 * author: Alex Kruger
 */

import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './bookInfo.css';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {postBookReview} from '../../api';

import {useLocation} from 'react-router-dom';


// const emptyStar = 'empty-star';
// const filledStar = 'filled-star';


export const BookInfo = (props) => {
  const [textReview, setTextReview] = useState('');
  // TODO: all fields below are just dummy variables and should be replaced
  //       with real information from the GET request mentioned above
  const [yearPublished] = useState(2000);
  const [genre] = useState('Fantasy/Adventure/Mystery');
  const [authorBooks] = useState([
    {
      url: 'http://images.amazon.com/images/P/0889652015.01.LZZZZZZZ.jpg',
      title: 'Harry Potter and the Goblet of Fire',
    },
  ]);
  const [reviews] = useState([
    {
      review: 'review 1 info',
    },
    {
      review: 'review 2 info',
    },
    {
      review: 'review 3 info',
    },
  ]);
  const [numberReviews] = useState(44359);

  /**
* TODO: api call for removing a book from the user's recommendations
*/
  function onRemove() {
  }

  /**
* TODO: api call for adding a book to the user's read books
*/
  function onAdd() {
  }

  /**
* handles updating the text the user enters as a text review
* @param {*} event
*/
  function handleTextChange(event) {
    setTextReview(event.target.value);
  }

  /**
 * handles submitting a text review
 * @param {*} event
 */
  const handleSubmit = async () => {
    // await postBookReview(props.user, props.isbn, textReview);
    await postBookReview('alex2', queryParams.get('ISBN'), textReview);
    console.log('reached frontend event function');
  };

  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);

  return (
    <div className="App">
      <div className='gradient_bg'>
        <Container>
          <Row>
            <Col><img src={queryParams.get('url')} alt='...' /></Col>
            <Col>
              <Row>
                <h1>{queryParams.get('title')}</h1>
              </Row>
              <Row>
                <h3>{yearPublished} - {genre}</h3>
              </Row>
              <Row>
                {/* <Col><RatingSystem starCount={5}/></Col> */}
                <Col>Number of Reviews: {numberReviews}</Col>
              </Row>
              <Row>
                <button type="button" className="btn btn-danger" onClick={onAdd}>Remove from recommendations</button>
                <button type="button" className="btn btn-success" onClick={onRemove}>Add to list</button>
              </Row>
              <Row>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="bookReviewTextArea">Add a review:</label>
                    <textarea
                      className="form-control"
                      id="bookReviewTextArea"
                      rows="4"
                      onChange={handleTextChange}></textarea>
                    <button type="submit" className="btn btn-primary">Post review</button>
                  </div>
                </form>
              </Row>
            </Col>
          </Row>
          <h3>Other books by this author:</h3>
          <Row>
            <ListGroup horizontal>
              {
                authorBooks.map((authorBook) => (
                // eslint-disable-next-line react/jsx-key
                  <ListGroup.Item>
                    <img src={authorBook.url} width="150" height="210" alt='...' />
                    {authorBook.title}
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          </Row>
          <Row>
            <h3>What your friends think:</h3>
            <ListGroup vertical>
              {
                reviews.map((review) => (
                // eslint-disable-next-line react/jsx-key
                  <ListGroup.Item>{review.review}</ListGroup.Item>
                ))
              }
            </ListGroup>
          </Row>
        </Container>
      </div>
    </div>
  );
};

// class Stars extends Component {
//   /**
//    * class representing the stars in the star rating system
//    */
//   constructor(props) {
//     super(props);
//     this.state = {currRating: 0};
//     this.onHover = this.onHover.bind(this);
//     this.onClick = this.onClick.bind(this);
//   }

//   onHover(e) {
//     if (e.target.className === 'star') {
//       this.setRating(e.target.dataset.value);
//     }
//   }

//   onClick(e) {
//     if (e.target.dataset.value === this.state.currRating) {
//       this.setRating(e.target.dataset.value);
//     }
//   }

//   setRating(value) {
//     this.setState({currRating: value});
//     // TODO: send post request with number of stars, which is in this.state.currRating
//   }

//   render() {
//     return (
//       [...Array(this.props.starCount).keys()].map((index) => {
//         return (
//           <img
//             onMouseOver={this.onHover}
//             onClick={this.onClick}
//             data-value={index + 1}
//             className="star"
//             src={index + 1 <= this.state.currRating ?
//       require('./' + filledStar + '.png') : require('./' + emptyStar + '.png')}
//             alt={index + 1 <= this.state.currRating ?
//         'filled star' : 'empty star'} />);
//       })
//     );
//   }
// }

// const RatingSystem = (props) => {
//   return (
//     <div className='rating'>
//       <Stars starCount={props.starCount}/>
//     </div>
//   );
// };
