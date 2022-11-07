/**
 * Shows information for the logged in user's profile
 * Adapted from https://mdbootstrap.com/docs/react/extended/profiles/#example6
 */

import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography} from 'mdb-react-ui-kit';
import './profile.css';

/**
 * Component containing the My Profile page
 * @return {JSX} for landing page component
 */
export const Profile = () => {
  return (
    <div className = "gradient-custom-2" style = {{backgroundColor: '#9de2ff'}} >
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{backgroundColor: '#000', height: '200px'}}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{width: '150px'}}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{width: '150px', zIndex: '1'}} />
                  <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn>
                </div>
                <div className="ms-3" style={{marginTop: '130px'}}>
                  <MDBTypography tag="h5">Andy Horwitz</MDBTypography>
                  <MDBCardText>New York</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{backgroundColor: '#f8f9fa'}}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Photos</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">1026</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Following</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{backgroundColor: '#f8f9fa'}}>
                    <MDBCardText className="font-italic mb-1">Web Developer</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Lives in New York</MDBCardText>
                    <MDBCardText className="font-italic mb-0">Photographer</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                <MDBRow>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
                <MDBRow className="g-2">
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                  <MDBCol className="mb-2">
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                      alt="image 1" className="w-100 rounded-3" />
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div >
  );
};

// import React, {useState} from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import './profile.css';

// import Container from 'react-bootstrap/Container';
// import ListGroup from 'react-bootstrap/ListGroup';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

// // const emptyStar = 'empty-star';
// // const filledStar = 'filled-star';


// export const Profile = () => {
//   const [, setTextReview] = useState('');
//   // TODO: all fields below are just dummy variables and should be replaced
//   //       with real information from the GET request mentioned above
//   const [title] = useState('Harry Potter and the Goblet of Fire');
//   const [yearPublished] = useState(2000);
//   const [genre] = useState('Fantasy/Adventure/Mystery');
//   const [authorBooks] = useState([
//     {
//       url: 'http://images.amazon.com/images/P/0889652015.01.LZZZZZZZ.jpg',
//       title: 'Harry Potter and the Goblet of Fire',
//     },
//   ]);
//   const [reviews] = useState([
//     {
//       review: 'review 1 info',
//     },
//     {
//       review: 'review 2 info',
//     },
//     {
//       review: 'review 3 info',
//     },
//   ]);
//   const [numberReviews] = useState(44359);
//   const defaultImage = 'http://images.amazon.com/images/P/0889652015.01.LZZZZZZZ.jpg';

//   /**
//  * TODO: api call for removing a book from the user's recommendations
//  */
//   function onRemove() {
//   }

//   /**
//  * TODO: api call for adding a book to the user's read books
//  */
//   function onAdd() {
//   }

//   /**
//  * handles updating the text the user enters as a text review
//  * @param {*} event
//  */
//   function handleTextChange(event) {
//     setTextReview(event.target.value);
//   }

//   /**
// * handles submitting a text review
// * @param {*} event
// */
//   function handleSubmit(event) {
//   }

//   console.log('we made it');

//   return (
//     <div className="App">
//       <div className='gradient_bg'>
//         <Container>
//           <Row>
//             <Col><img src={defaultImage} alt='...' /></Col>
//             <Col>
//               <Row>
//                 <h1>{title}</h1>
//               </Row>
//               <Row>
//                 <h3>{yearPublished} - {genre}</h3>
//               </Row>
//               <Row>
//                 {/* <Col><RatingSystem starCount={5}/></Col> */}
//                 <Col>Number of Reviews: {numberReviews}</Col>
//               </Row>
//               <Row>
//                 <button type="button" className="btn btn-danger" onClick={onAdd}>Remove from recommendations</button>
//                 <button type="button" className="btn btn-success" onClick={onRemove}>Add to list</button>
//               </Row>
//               <Row>
//                 <form onSubmit={handleSubmit}>
//                   <div className="form-group">
//                     <label htmlFor="bookReviewTextArea">Add a review:</label>
//                     <textarea
//                       className="form-control"
//                       id="bookReviewTextArea"
//                       rows="4"
//                       onChange={handleTextChange}></textarea>
//                     <button type="submit" className="btn btn-primary">Post review</button>
//                   </div>
//                 </form>
//               </Row>
//             </Col>
//           </Row>
//           <h3>Other books by this author:</h3>
//           <Row>
//             <ListGroup horizontal>
//               {
//                 authorBooks.map((authorBook) => (
//                 // eslint-disable-next-line react/jsx-key
//                   <ListGroup.Item>
//                     <img src={authorBook.url} width="150" height="210" alt='...' />
//                     {authorBook.title}
//                   </ListGroup.Item>
//                 ))
//               }
//             </ListGroup>
//           </Row>
//           <Row>
//             <h3>What your friends think:</h3>
//             <ListGroup vertical>
//               {
//                 reviews.map((review) => (
//                 // eslint-disable-next-line react/jsx-key
//                   <ListGroup.Item>{review.review}</ListGroup.Item>
//                 ))
//               }
//             </ListGroup>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// };
