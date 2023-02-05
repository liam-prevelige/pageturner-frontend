/**
 * renders a page for information on a particular book
 * 5-star rating system amdended from: https://javascript.plainenglish.io/react-5-star-rating-system-4fa81b71cac9
 * star images from: https://icons8.com/icons/set/empty-star
 * author: Alex Kruger
 */

import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './bookInfo.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {ScrollMenu} from 'react-horizontal-scrolling-menu';
import {BookDisplay} from '../BookDisplay';
import ReactLoading from 'react-loading';
// import {postBookReview} from '../../api';
import {getRecs} from '../../api';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';


// const emptyStar = 'empty-star';
// const filledStar = 'filled-star';


export const BookInfo = () => {
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const loggedIn = useState(JSON.parse(sessionStorage.getItem('profile')))[0] != null;
  // const [textReview, setTextReview] = useState('');
  // TODO: all fields below are just dummy variables and should be replaced
  //       with real information from the GET request mentioned above
  const [author] = useState(queryParams.get('author'));
  const [isbn] = useState(queryParams.get('isbn'));
  const [recs, setRecs] = useState([]);
  const navigate = useNavigate();

  // Get recommendations from the database
  const loadRecs = async () => {
    if (queryParams.get('isbn')) {
      const newRecs = await getRecs(queryParams.get('isbn'));
      console.log(newRecs);
      setRecs(newRecs);
    }
  };

  useEffect(() => {
    loadRecs();
  }, []);

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
    // await postBookReview('alex2', queryParams.get('isbn'), textReview);
    console.log('reached frontend event function');
    navigate('/');
  };

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
                <h3>{author}</h3>
              </Row>
              <Row>
                <h3>ISBN - {isbn}</h3>
              </Row>
              {/* <Row>
                <button type="button" className="btn btn-danger">Remove from recommendations</button>
                <button type="button" className="btn btn-success">Add to list</button>
              </Row> */}
              <Row>
                {!loggedIn && <p>Sign in to write and post a review!</p>}
                {loggedIn && <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="bookReviewTextArea">Add a review:</label>
                    <textarea
                      className="form-control"
                      id="bookReviewTextArea"
                      rows="4"
                      onChange={handleTextChange}></textarea>
                    <button type="submit" className="btn btn-primary">Post review</button>
                  </div>
                </form>}
              </Row>
            </Col>
          </Row>
          <Row>
            <h3>More like this:</h3>
            <ScrollMenu style={{overflowX: 'auto'}}>
              {console.log(recs.length)}
              {recs.length === 0 ? <ReactLoading type="spin" color="black" /> : recs.map((book, index) => (
                <Col key={index} style={{width: '190px', marginLeft: '10px', marginRight: '10px'}}>
                  <BookDisplay url={book.image_l} title={book.title} author={book.author} />
                </Col>
              ))
              }
            </ScrollMenu>
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
