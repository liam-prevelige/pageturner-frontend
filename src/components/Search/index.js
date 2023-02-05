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

  const handleInputChange = async (newInput) => {
    setSearchInput(newInput);
    setShow(false);
    setResults(null);
  };

  const performSearch = async () => {
    setResults(null);
    setShow(true);
    const res = await searchContent(searchInput);
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
      <div>
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
        <Tabs isFitted className="m-3" variant='line' colorScheme='cyan'>
          <TabList>
            <Tab>People</Tab>
            <Tab>Groups</Tab>
            <Tab>Bookshelves</Tab>
            <Tab>Comments</Tab>
            <Tab>Books</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {results.users.map((user, index) => (<Row key={index}>
                <UserSearchResult userInfo={user}/>
              </Row>))}
            </TabPanel>
            <TabPanel>
              {results.groups.map((group, index) => (<Row key={index}>
                <GroupSearchResult groupInfo={group}/>
              </Row>))}
            </TabPanel>
            <TabPanel>
              {results.bookshelves.map((bookshelf, index) => (<Row key={index}>
                <BookshelfSearchResult bookshelfInfo={bookshelf}/>
              </Row>))}
            </TabPanel>
            <TabPanel>
              {results.comments.map((comment, index) => (<Row key={index}>
                <Comment commentId={comment._id} noParent={true}/>
              </Row>))}
            </TabPanel>
            <TabPanel>
              {results.books.map((book, index) => (<Row key={index}>
                <BookSearchResult bookInfo={book}/>
              </Row>))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </div>)}
  </div>);
};
