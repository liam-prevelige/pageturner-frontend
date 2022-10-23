/**
 * renders a page for information on a particular book
 * 5-star rating system amdended from: https://javascript.plainenglish.io/react-5-star-rating-system-4fa81b71cac9
 * star images from: https://icons8.com/icons/set/empty-star
 * author: Alex Kruger
 */

import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import './bookInfo.css'

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'

const emptyStar = 'empty-star'
const filledStar = 'filled-star'

class BookInfo extends Component {
  constructor(props) {
    /**
     * props should include:
     * book id
     * user id
     */
    super(props);
    this.state = this.initialState()
  }

  initialState() {
    /**
     * called in constructor, sets up the initial state needed for this page
     */
    // TODO: pass bookId and userId from props in a GET request for all information about
    //       the book. then, add all this info in state below
    return {
      textReview: "",
      // TODO: all fields below are just dummy variables and should be replaced
      //       with real information from the GET request mentioned above
      title: "Harry Potter and the Goblet of Fire",
      yearPublished: 2000,
      genre: "Fantasy/Adventure/Mystery",
      authorBooks: {
        "book 1": {url: "harry-potter-cover", title: "Harry Potter and the Goblet of Fire"},
        "book 2": {url: "harry-potter-cover", title: "Harry Potter and the Goblet of Fire"},
        "book 3": {url: "harry-potter-cover", title: "Harry Potter and the Goblet of Fire"},
        "book 4": {url: "harry-potter-cover", title: "Harry Potter and the Goblet of Fire"},
      },
      reviews: {
        "review 1": "review 1 info",
        "review 2": "review 2 info",
        "review 3": "review 3 info",
        "review 4": "review 4 info",
      },
      numberReviews: 44359
    }
  }

  onRemove() {
    /**
     * removes this book from the user's list of recommended books
     */
    // TODO: send the bookId and userId props in a POST request, where it will be removed from the user's recommendations
    return
  }

  onAdd() {
    /**
     * adds this book to the user's list of books they have read
     */
    // TODO: send the bookId and userId props in a POST request, where it will be added to the user's list of books read
    return
  }

  handleTextChange(event) {
    /**
     * called whenever the user types something as part of their review. saves this text in state
     */
    this.setState({textReview: event.target.value})
  }

  handleSubmit(event) {
    /**
     * called when the user hits the "submit" button. submits the text review currently saved in state
     */
    // TODO: send bookId, userId from props and textReview from state in a POST request that adds a review to a book
    return
  }

  getAuthorBooks() {
    /**
     * renders a list of books written by this author
     */
    return Object.values(this.state.authorBooks).map((booksMapValue) => {
      return(<ListGroup.Item>
              <Image src={require("./" + booksMapValue.url + ".png")}></Image>
              {booksMapValue.title}
            </ListGroup.Item>)
    })
  }

  getFriendReviews() {
    /**
     * renders a list of reviews that your friends have made about this book
     */
    return Object.values(this.state.reviews).map((reviewMapValue) => {
      return(<ListGroup.Item>{reviewMapValue}</ListGroup.Item>)
    })
  }

  render() {
    /**
     * renders the page
     */
    return (
      <div className="App">
        <div className='gradient_bg'>
          <Container>
            <Row>
              <Col><Image src={require('./harry-potter-cover.png')} alt='...' /></Col> 
              <Col>
                <Row>
                  <h1>{this.state.title}</h1>
                </Row>
                <Row>
                  <h3>{this.state.yearPublished} - {this.state.genre}</h3>
                </Row>
                <Row>
                  <Col>
                    <Row>
                      <RatingSystem starCount={5}/>
                    </Row>
                  </Col>
                  <Col>Number of Reviews: {this.state.numberReviews}</Col>
                </Row>
                <Row>
                  <button type="button" class="btn btn-danger" onClick={this.onRemove()}>Remove from recommendations</button>
                  <button type="button" class="btn btn-success" onClick={this.onAdd()}>Add to list</button>
                </Row>
                <Row>
                  <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                      <label for="bookReviewTextArea">Add a review:</label>
                      <textarea 
                        class="form-control" 
                        id="bookReviewTextArea" 
                        rows="4" 
                        onChange={this.handleTextChange}></textarea>
                      <button type="submit" class="btn btn-primary">Post review</button>
                    </div>
                  </form>
                </Row>
              </Col>
            </Row>
              <h3>Other books by this author:</h3>
            <Row>
              <ListGroup horizontal>
                {this.getAuthorBooks()}
              </ListGroup>
            </Row>
            <Row>
            <h3>What your friends think:</h3>
              <ListGroup vertical>
                {this.getFriendReviews()}
              </ListGroup>
            </Row>          
          </Container>
        </div>
      </div>
    );
  }
}

class Stars extends Component {
  constructor(props) {
    super(props);
    this.state = {currRating : 0}
    this.onHover = this.onHover.bind(this)
    this.onClick = this.onClick.bind(this) 
  }
 onHover(e) {
  if (e.target.className === 'star') {
   this.setRating(e.target.dataset.value)
  }
 }
 onClick(e) {
  if (e.target.dataset.value === this.state.currRating){
   this.setRating(e.target.dataset.value)
  }
 }
 setRating(value) {
   this.setState({currRating : value})
    // TODO: send post request with number of stars, which is in this.state.currRating
 }
 render(){
   return(
   [...Array(this.props.starCount).keys()].map((index) => {
   return (
    <img 
    onMouseOver={this.onHover}
    onClick={this.onClick}
    data-value={index + 1}
    className="star"
    src={index + 1 <= this.state.currRating ? 
      require('./' + filledStar + '.png') : require('./' + emptyStar + '.png')}
    alt={index + 1 <= this.state.currRating ? 
        "filled star" : "empty star"} />)
    })
   )
  }
 }
const RatingSystem = (props) =>  {
 return (
   <div className='rating'>
     <Stars starCount={props.starCount}/>
   </div>
 );
}

export default BookInfo