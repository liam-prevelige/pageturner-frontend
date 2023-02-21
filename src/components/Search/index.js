import React, {useState} from 'react';
import {SearchIcon} from '../../assets/Icons';
import {searchContent} from '../../api';
import {ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'; // https://chakra-ui.com/docs/components/tabs/usage
import ReactLoading from 'react-loading';
import {UserSearchResult, BookshelfSearchResult, GroupSearchResult, BookSearchResult} from './SearchResults';
import Row from 'react-bootstrap/Row';
import {Comment} from '../Comment/Comment';

export const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState(null);
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  // Handler for text change in search bar
  const handleInputChange = async (newInput) => {
    // Update search bar text
    setSearchInput(newInput);

    // Hide results until the user hits enter
    setShow(false);

    // Clear results to null
    setResults(null);
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

  // Execute the search when the user hits 'enter'
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchInput !== '') {
      performSearch();
    }
  };

  return (<div>
    <div className="flex items-center space-x-5 p-3 m-3 rounded-full bg-slate-200 text-black focus-within:ring-2 focus-within:ring-primary-button focus:ring-1">
      <SearchIcon />
      <div className="w-full">
        <input
          className="focus:outline-none bg-transparent w-full"
          type="text"
          placeholder="Search PageTurner"
          value={searchInput}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
    {show && (results == null ? <div className="flex margin-auto justify-content-center">
      <ReactLoading type="spin" color="black" />
    </div> : <div>
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
            <Tab>Groups</Tab>
            <Tab>Bookshelves</Tab>
            <Tab>Comments</Tab>
            <Tab>Books</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {(results && results.users && results.users.length > 0) ? results.users.map((user, index) => (<Row key={index}>
                <UserSearchResult userInfo={user}/>
              </Row>)) : <Row>No Results</Row>}
            </TabPanel>
            <TabPanel>
              {(results && results.groups && results.groups.length > 0) ? results.groups.map((group, index) => (<Row key={index}>
                <GroupSearchResult groupInfo={group}/>
              </Row>)): <Row>No Results</Row>}
            </TabPanel>
            <TabPanel>
              {(results && results.bookshelves && results.bookshelves.length > 0) ? results.bookshelves.map((bookshelf, index) => (<Row key={index}>
                <BookshelfSearchResult bookshelfInfo={bookshelf}/>
              </Row>)): <Row>No Results</Row>}
            </TabPanel>
            <TabPanel>
              {(results && results.comments && results.comments.length > 0) ? results.comments.map((comment, index) => (<Row key={index}>
                <Comment comment={comment} noParent={true}/>
              </Row>)): <Row>No Results</Row>}
            </TabPanel>
            <TabPanel>
              {(results && results.books && results.books.length > 0) ? results.books.map((book, index) => (<Row key={index}>
                <BookSearchResult bookInfo={book}/>
              </Row>)) : <Row>No Results</Row>}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </div>)}
  </div>);
};
