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
// import {ScrollMenu} from 'react-horizontal-scrolling-menu';
// import {BookDisplay} from '../BookDisplay';
// import ReactLoading from 'react-loading';
// import {postBookReview} from '../../api';
import {getRecs} from '../../api';
// import {useNavigate} from 'react-router-dom';
// import {useLocation} from 'react-router-dom';
// import {searchContent} from '../../api';


// const emptyStar = 'empty-star';
// const filledStar = 'filled-star';


export const BookInfo = () => {
  const search = window.location.search;
  const queryParams = new URLSearchParams(search);
  // const isBookInfo = !queryParams.has('id');
  // const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const fakeBook = {
    id: 'Gz8t2MttEQUC',
    title: 'What I learned from the trees',
    author: 'LE Bowman',
    description: 'What I Learned from the Trees delves into the intricate relationship between humans and nature, and how these often overlooked, everyday interactions affect us as individuals, families, and communities. With a backbone rooted in primordial imagery and allegory, and a focus on how the growing disconnect with our own wants, needs, and fears creates deeper divides in our relationships, this collection is notably relevant to today\'s society and the struggles we face with the ever-expanding detachment between humans and the natural world. Aren\'t all living creatures seeking a notable existence? A deep sense of belonging? Of relevance? Of purpose? Of love? How often do we yearn for these wants, yet fight the vulnerability it takes to reach them? Why do we so clearly seek each other, yet refuse to reach out our hands?',
    year: '2021',
    cover: 'https://images.randomhouse.com/cover/9781582436043',
  };

  // const [book, setBook] = useState((isBookInfo) ? storedBook : fakeBook);

  // const retrieveBookFromId = async () => {
  //   const id = queryParams.get('id');
  //   const retrievedBook = await searchContent(id);
  //   console.log(id);
  //   if (id) {
  //     setBook(retrievedBook);
  //   }
  // };

  // useEffect(() => {
  //   if (!isBookInfo) {
  //     retrieveBookFromId();
  //   }
  // }, []);

  const loggedIn = useState(JSON.parse(sessionStorage.getItem('profile')))[0] != null;
  // const [textReview, setTextReview] = useState('');
  // const [recs, setRecs] = useState([]);
  // const navigate = useNavigate();

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
// * @param {*} event
// */
  //   function handleTextChange(event) {
  //     setTextReview(event.target.value);
  //   }

  /**
 * handles submitting a text review
 * @param {*} event
 */
  // const handleSubmit = async () => {
  //   // await postBookReview(props.user, props.isbn, textReview);
  //   await postBookReview('alex2', queryParams.get('isbn'), textReview);
  //   console.log('reached frontend event function');
  //   navigate('/');
  // };

  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting review:', review, 'with rating:', rating);
    setReviews([...reviews, {review, rating}]);
    setReview('');
    setRating(0);
  };

  return (
    <div className="App" style={{marginTop: '30px'}}>
      <div className='gradient_bg'>
        <Container>
          <Row>
            <Col><img src={fakeBook.cover} alt='...' /></Col>
            <Col>
              <Row>
                <span className="font-bold text-2xl text-black">{fakeBook.title}</span>
              </Row>
              <Row>
                <div className="flex flex-row ..." style={{marginTop: '5px'}}>
                  <div className="basis-1/6 text-slate-500">{fakeBook.year} • </div>
                  <div className='text-slate-500'>{fakeBook.author}</div>
                </div>
              </Row>
              <Row>
                <span className='text-sm' style={{marginTop: '5px'}}>{fakeBook.description}</span>
              </Row>
            </Col>
            {/* {!loggedIn && <p>Sign in to write and post a review!</p>} */}
            {loggedIn && <form onSubmit={handleSubmit}>
              <div className="form-group" style={{marginTop: '20px'}}>
                <textarea placeholder='Add a review' className="form-control" rows="4" value={review} onChange={(event) => setReview(event.target.value)} />
                <div>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="rating"
                        value={value}
                        checked={value === rating}
                        onChange={(event) => setRating(parseInt(event.target.value))}
                      />
                      {value}
                    </label>
                  ))}
                </div>
                <button type="submit">Post Review</button>
              </div>
            </form>}
          </Row>
          <Row>
            <div style={{marginTop: '20px'}}>
              <h3>More like this:</h3>
              <img className='box-content h-64 w-48 p-2' src={fakeBook.cover} alt='...' />
            </div>
          </Row>
          <Row>
            <div style={{marginTop: '20px'}}>
                Reviews:
              {reviews.map((r, index) => (
                <li key={index}>
                  <p>{r.review}</p>
                  <p>Rating: {r.rating}/5</p>
                </li>
              ))}
            </div>
          </Row>
        </Container>
      </div>
    </div>
  );
};

{/* <ScrollMenu style={{overflowX: 'auto'}}>
              {console.log(recs.length)}
              {recs.length === 0 ? <ReactLoading type="spin" color="black" /> : recs.map((book, index) => (
                <Col key={index} style={{width: '190px', marginLeft: '10px', marginRight: '10px'}}>
                  <BookDisplay url={book.image_l} title={book.title} author={book.author} />
                </Col>
              ))
              }
            </ScrollMenu> */}

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
