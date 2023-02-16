import {React, useState, useEffect} from 'react';

import {ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'; // https://chakra-ui.com/docs/components/tabs/usage
import {ScrollMenu} from 'react-horizontal-scrolling-menu'; // https://www.npmjs.com/package/react-horizontal-scrolling-menu
import {Comment} from '../Comment/Comment';

import {getBookshelves, getPosts, getLikedPosts} from '../../api';
// import {PopoverForm} from './BookshelfPopup';
import {Bookshelf} from './Bookshelf';
import {ThemeProvider, createTheme} from '@mui/material/styles';

export const ProfileTabs = ({uid}) => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);

  const theme = createTheme();

  const fetchBookshelves = async () => {
    const loadedBookshelves = await getBookshelves(uid, 'user');
    setBookshelves(loadedBookshelves);
  };

  const fetchPosts = async () => {
    const profilePosts = await getPosts(uid);
    setPosts(profilePosts);
    console.log(profilePosts);
  };

  const fetchLikedPosts = async () => {
    const likedPosts = await getLikedPosts(uid);
    setLikedPosts(likedPosts);
  };

  useEffect(() => {
    fetchBookshelves();
    fetchPosts();
    fetchLikedPosts();
  }, [uid]);

  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider resetCSS={false}>
        <Tabs isFitted className="m-3" variant='line' colorScheme='cyan'>
          <TabList>
            <Tab>Bookshelves</Tab>
            <Tab>Posts</Tab>
            <Tab>Bookmarks</Tab>
            <Tab>Liked</Tab>
          </TabList>
          <TabPanels>
            {/* Bookshelves Tab */}
            <TabPanel width={'710px'}>
              {/* <PopoverForm/> */}
              {/* <div className="border-b m-3 border-slate-300"/> */}
              <ScrollMenu style={{overflowY: 'auto'}}>
                <div className="bg-white h-full">
                  {bookshelves && bookshelves.reverse().map((bookshelfData, index) =>
                    (<div key={index}>
                      <Bookshelf bookshelfId={bookshelfData._id} isProfile={true}/>
                      <div className="border-b m-3 border-slate-300"/>
                    </div>
                    ))}
                </div>
              </ScrollMenu>
            </TabPanel>
            {/* Posts Tab */}
            <TabPanel width={'710px'}>
              <div className="bg-white h-full">
                {posts && posts.reverse().map((commentData, index) =>
                  (<div key={index}>
                    <Comment commentId={commentData}/>
                    <div className="border-b ml-3 mr-3 border-slate-300"/>
                  </div>
                  ))}
              </div>
            </TabPanel>
            <TabPanel width={'710px'}>
              <ScrollMenu style={{overflowX: 'auto'}}>
                {profile && <div className="bg-white h-full">
                  {profile.bookmarks && profile.bookmarks.reverse().map((commentData, index) =>
                    (<div key={index}>
                      <Comment commentId={commentData}/>
                      <div className="border-b ml-3 mr-3 border-slate-300"/>
                    </div>
                    ))}
                </div>}
              </ScrollMenu>
            </TabPanel>
            <TabPanel width={'710px'}>
              <div className="bg-white h-full">
                {likedPosts && likedPosts.reverse().map((commentData, index) =>
                  (<div key={index}>
                    <Comment commentId={commentData}/>
                    <div className="border-b ml-3 mr-3 border-slate-300"/>
                  </div>
                  ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ChakraProvider>
    </ThemeProvider>
  );
};
