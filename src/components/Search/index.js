import React, {useState} from 'react';
import {SearchIcon} from '../../assets/Icons';
import {searchContent} from '../../api';
import {ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'; // https://chakra-ui.com/docs/components/tabs/usage
import {ScrollMenu} from 'react-horizontal-scrolling-menu'; // https://www.npmjs.com/package/react-horizontal-scrolling-menu

export const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  // eslint-disable-next-line
  const [results, setResults] = useState(null);
  const [show, setShowing] = useState(false);

  const performSearch = async () => {
    const res = await searchContent(searchInput);
    setResults(res);
    setShowing(true);

    // TODO: Remove this log
    console.log(res);
  };

  // Execute the search when the user hits 'enter'
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  };

  return (<div className="flex items-center space-x-5 p-3 m-3 rounded-full bg-slate-200 text-black focus-within:ring-2 focus-within:ring-primary-button focus:ring-1">
    <SearchIcon />
    <div>
      <input
        className="focus:outline-none bg-transparent w-full"
        type="text"
        placeholder="Search PageTurner"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
    {show && <div>
      <ChakraProvider resetCSS={false}>
        <Tabs isFitted className="m-3" variant='line' colorScheme='cyan'>
          <TabList>
            <Tab>People</Tab>
            <Tab>Groups</Tab>
            <Tab>Bookshelves</Tab>
            <Tab>Comments</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ScrollMenu style={{overflowY: 'auto'}}>
                {/* <ThreadView commentId={'63cef967b83ed8c71f06be01'}/> */}
              </ScrollMenu>
            </TabPanel>
            <TabPanel>
              <ScrollMenu style={{overflowX: 'auto'}}>
                {/* <ThreadView commentId={'63cef967b83ed8c71f06be01'}/> */}
              </ScrollMenu>
            </TabPanel>
            <TabPanel>
              <ScrollMenu style={{overflowX: 'auto'}}>
                {/* <ThreadView commentId={'63cef967b83ed8c71f06be01'}/> */}
              </ScrollMenu>
            </TabPanel>
            <TabPanel>
              <ScrollMenu style={{overflowX: 'auto'}}>
                {/* <ThreadView commentId={'63cef967b83ed8c71f06be01'}/> */}
              </ScrollMenu>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </div>}
  </div>);
};
