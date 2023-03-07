import React, {useState, useEffect} from 'react';
import {SearchIcon} from '../../assets/Icons';
import {searchContent, searchBooks} from '../../api';
import {ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'; // https://chakra-ui.com/docs/components/tabs/usage
import ReactLoading from 'react-loading';
import {UserSearchResult, GroupSearchResult, BookSearchResult} from './SearchResults';
// import {BookshelfSearchResult} from './SearchResults';
import Row from 'react-bootstrap/Row';
import {Comment} from '../Comment/Comment';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {FaTimes} from 'react-icons/fa';
import {FaAngleUp} from 'react-icons/fa';

export const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState(null);
  const [books, setBooks] = useState(null);
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const theme = createTheme();

  // Handler for text change in search bar
  const handleInputChange = async (newInput) => {
    // Update search bar text
    setSearchInput(newInput);

    // Hide results until the user hits enter
    setShow(false);

    // Clear results to null
    setResults(null);
    setBooks(null);

    // Reset tab
    setTabIndex(0);
  };

  // Hit search endpoint and manage state until results are available
  const performSearch = async () => {
    // Clear results to null
    setResults(null);

    // Show results (but will actually just show the loading icon for now)
    setShow(true);

    // Get search results for all content
    const res = await searchContent(searchInput);
    // Set results (will change from loading icon to results)
    setResults(res);
  };

  // Hit book search endpoint and manage state until results are available
  const performBookSearch = async () => {
    // Clear books to null
    setBooks(null);
    // Get search results for books
    const res = await searchBooks(searchInput);

    // Set books (will change from loading icon to results)
    setBooks(res.books);
  };

  // Execute the content search when the user hits 'enter'
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchInput !== '') {
      performSearch();
    }
  };

  const resetSearch = () => {
    setSearchInput('');
    setShow(false);
  };

  // Execute the book search when the user clicks the 'books' tab if books is null
  useEffect(() => {
    if (tabIndex === 1 && books === null) {
      performBookSearch();
    }
  }, [tabIndex]);

  return (<div>
    <div className="searchbar flex items-center space-x-5 p-3 m-3 rounded-full bg-slate-200 text-black focus-within:ring-2 focus-within:ring-primary-button focus:ring-1">
      <SearchIcon />
      <div className="w-full">
        <input
          className="focus:outline-none bg-transparent w-full"
          type="text"
          placeholder="Search PageTurner for books, people, clubs, and more..."
          value={searchInput}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {searchInput.length>0 && <FaTimes className="cursor-pointer w-4 h-4" onClick={resetSearch}/>}
    </div>
    {show && (results == null ? <div className="flex margin-auto justify-content-center">
      <ReactLoading type="spin" color="black" />
    </div> : <div>
      <ThemeProvider theme={theme}>
        <ChakraProvider resetCSS={false}>
          <Tabs
            isFitted
            className="m-3"
            variant='line'
            colorScheme='cyan'
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>People</Tab>
              <Tab>Books</Tab>
              <Tab>Book Clubs</Tab>
              {/* <Tab>Bookshelves</Tab> */}
              <Tab>Comments</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {(results && results.users && results.users.length > 0) ? results.users.map((user) => (<Row key={user._id}>
                  <UserSearchResult userInfo={user}/>
                </Row>)) : <Row>No Results</Row>}
              </TabPanel>
              <TabPanel>
                {(books && books.length > 0) ? books.map((book) => (<Row key={book.volumeId}>
                  <BookSearchResult bookInfo={book}/>
                </Row>)) : books ? <Row>No Results</Row> : <div className="flex margin-auto justify-content-center">
                  <ReactLoading type="spin" color="black" />
                </div>}
              </TabPanel>
              <TabPanel>
                {(results && results.groups && results.groups.length > 0) ? results.groups.map((group) => (<Row key={group._id}>
                  <GroupSearchResult groupInfo={group}/>
                </Row>)): <Row>No Results</Row>}
              </TabPanel>
              {/* <TabPanel>
                {(results && results.bookshelves && results.bookshelves.length > 0) ? results.bookshelves.map((bookshelf, index) => (<Row key={index}>
                  <BookshelfSearchResult bookshelfInfo={bookshelf}/>
                </Row>)): <Row>No Results</Row>}
              </TabPanel> */}
              <TabPanel>
                {(results && results.comments && results.comments.length > 0) ? results.comments.map((comment) => (<Row key={comment._id}>
                  <Comment comment={comment} noParent={true}/>
                </Row>)): <Row>No Results</Row>}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ChakraProvider>
      </ThemeProvider>
      <div className="flex justify-center group cursor-pointer" onClick={() => setShow(false)}>
        <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-retweet_hover">
          <FaAngleUp/>
        </div>
      </div>
    </div>)}
  </div>);
};
