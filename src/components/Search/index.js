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

    // Determine which tab to show by default
    let highestResCount = 0;
    let initIndex = 0;
    // IMPORTANT: the order here must match the order of tabs defined in JSX
    const types = ['users', 'groups', 'bookshelves', 'comments', 'books'];
    types.forEach((type, index) => {
      if (res[type].length > highestResCount) {
        highestResCount = res[type].length;
        initIndex = index;
      }
    });
    setTabIndex(initIndex);

    // Set results (will change from loading icon to results)
    setResults(res);
  };

  // Execute the search when the user hits 'enter'
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
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
              {results.users.length ? results.users.map((user, index) => (<Row key={index}>
                <UserSearchResult userInfo={user}/>
              </Row>)) : <Row>No Results</Row>}
            </TabPanel>
            <TabPanel>
              {results.groups.length ? results.groups.map((group, index) => (<Row key={index}>
                <GroupSearchResult groupInfo={group}/>
              </Row>)): <Row>No Results</Row>}
            </TabPanel>
            <TabPanel>
              {results.bookshelves.length ? results.bookshelves.map((bookshelf, index) => (<Row key={index}>
                <BookshelfSearchResult bookshelfInfo={bookshelf}/>
              </Row>)): <Row>No Results</Row>}
            </TabPanel>
            <TabPanel>
              {results.comments.length ? results.comments.map((comment, index) => (<Row key={index}>
                <Comment commentId={comment._id} noParent={true}/>
              </Row>)): <Row>No Results</Row>}
            </TabPanel>
            <TabPanel>
              {results.books.length ? results.books.map((book, index) => (<Row key={index}>
                <BookSearchResult bookInfo={book}/>
              </Row>)) : <Row>No Results</Row>}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </div>)}
  </div>);
};
