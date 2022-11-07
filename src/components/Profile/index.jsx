/**
 * Shows information for the logged in user's profile
 * Adapted from https://mdbootstrap.com/docs/react/extended/profiles/#example6
 */

import React from 'react';
import {MDBRow, MDBCard, MDBCardText, MDBCardImage, MDBBtn, MDBTypography} from 'mdb-react-ui-kit';
import {ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'; // https://chakra-ui.com/docs/components/tabs/usage
import {ScrollMenu} from 'react-horizontal-scrolling-menu'; // https://www.npmjs.com/package/react-horizontal-scrolling-menu
// import CanvasJSReact from './assets/canvasjs.react.js';
import './profile.css';

/**
 * Component containing the My Profile page
 * @return {JSX} for landing page component
 */
export const Profile = () => {
  // const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  // const options = {
  //   theme: 'light2',
  //   title: {
  //     text: 'Stock Price of NIFTY 50',
  //   },
  //   axisY: {
  //     title: 'Price in USD',
  //     prefix: '$',
  //   },
  //   data: [{
  //     type: 'line',
  //     xValueFormatString: 'MMM YYYY',
  //     yValueFormatString: '$#,##0.00',
  //     dataPoints: dataPoints,
  //   }],
  // };
  // const [tabIndex, setTabIndex] = useState(0);

  // const handleSliderChange = (event) => {
  //   setTabIndex(parseInt(event.target.value, 10));
  // };

  // const handleTabsChange = (index) => {
  //   setTabIndex(index);
  // };
  return (
    <div className="gradient-custom-2" style={{backgroundColor: '#9de2ff', width: '100%'}} >
      <div className='row' style={{marginLeft: '2.5%', marginRight: '2.5%'}}>
        <div className='column' style={{width: '45%'}}>
          <MDBRow className="justify-content-center align-items-center" style={{margin: '0px'}}>
            <MDBCard style={{margin: '50px'}}>
              <div className="rounded-top text-white d-flex flex-row" style={{backgroundColor: '#000', height: '200px'}}>
                <div className="ms-4 mt-5 d-flex flex-column">
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
                    <MDBCardText className="mb-1 h5" style={{marginRight: '15px'}}>253</MDBCardText>
                    <MDBCardText className="small text-muted mb-0" style={{marginRight: '15px'}}>Books Read</MDBCardText>
                  </div>

                  <div>
                    <MDBCardText className="mb-1 h5">478</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Friends</MDBCardText>
                  </div>
                </div>
              </div>
              <ChakraProvider>
                <Tabs variant='line' colorScheme='blue'>
                  <TabList>
                    <Tab>Recently Read</Tab>
                    <Tab>My List</Tab>
                    <Tab>Friends</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <ScrollMenu style={{overflowX: 'auto'}}>
                        <div className="card" style={{width: '18rem'}}>
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" className="card-img-top" alt="Book Photo" />
                          <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&aposs content.</p>
                          </div>
                        </div>
                        <div className="card" style={{width: '18rem'}}>
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" className="card-img-top" alt="Book Photo" />
                          <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&aposs content.</p>
                          </div>
                        </div>
                        <div className="card" style={{width: '18rem'}}>
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" className="card-img-top" alt="Book Photo" />
                          <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&aposs content.</p>
                          </div>
                        </div>
                      </ScrollMenu>
                    </TabPanel>
                    <TabPanel>
                      <ScrollMenu style={{overflowX: 'auto'}}>
                        <div className="card" style={{width: '18rem'}}>
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" className="card-img-top" alt="Book Photo" />
                          <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&aposs content.</p>
                          </div>
                        </div>
                        <div className="card" style={{width: '18rem'}}>
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" className="card-img-top" alt="Book Photo" />
                          <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&aposs content.</p>
                          </div>
                        </div>
                        <div className="card" style={{width: '18rem'}}>
                          <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp" className="card-img-top" alt="Book Photo" />
                          <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card&aposs content.</p>
                          </div>
                        </div>
                      </ScrollMenu>
                    </TabPanel>
                    <TabPanel>
                      <p>Test</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ChakraProvider>
            </MDBCard>
          </MDBRow>
        </div>
        <div className='column' style={{marginRight: '2.5%', width: '45%'}}>
          <div>
            {/* <CanvasJSChart options={options} onRef={ref => this.chart = ref}/> */}
          </div>
        </div>
      </div>
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
