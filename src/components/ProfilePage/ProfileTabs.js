import {React, useState, useEffect} from 'react';

import {ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'; // https://chakra-ui.com/docs/components/tabs/usage
import {ScrollMenu} from 'react-horizontal-scrolling-menu'; // https://www.npmjs.com/package/react-horizontal-scrolling-menu
import {Comment} from '../Comment/Comment';
import {PopoverForm} from './BookshelfPopup';

import {getBookshelves, getPosts, getBookmarks, getLikedPosts} from '../../api';
// import {PopoverForm} from './BookshelfPopup';
import {Bookshelf} from './Bookshelf';
import {ThemeProvider, createTheme} from '@mui/material/styles';

export const ProfileTabs = ({userId}) => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const uid = userId ? userId : profile._id;
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [bookmarksIds, setBookmarksIds] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);

  const theme = createTheme();

  const fetchBookshelves = async () => {
    if (!profile) return;
    const loadedBookshelves = await getBookshelves(uid, 'user');
    setBookshelves(loadedBookshelves);
  };

  window.addEventListener('bookshelfCreated', () => {
    fetchBookshelves();
  });

  const fetchPosts = async () => {
    const profilePosts = await getPosts(uid);
    setPosts(profilePosts);
  };

  const fetchBookmarkedIds = async () => {
    let fetchedBookmarksIds = await getBookmarks(uid);
    if (fetchedBookmarksIds) {
      fetchedBookmarksIds = fetchedBookmarksIds.reverse();
    }
    setBookmarksIds(fetchedBookmarksIds);
  };

  const fetchLikedPosts = async () => {
    let fetchedLikedPosts = await getLikedPosts(uid);
    if (fetchedLikedPosts) {
      fetchedLikedPosts = fetchedLikedPosts.reverse();
    }
    setLikedPosts(fetchedLikedPosts);
  };

  useEffect(() => {
    fetchBookshelves();
    fetchPosts();
    fetchBookmarkedIds();
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
              <ScrollMenu style={{overflowY: 'auto'}}>
                <div className="bg-white h-full w-[42rem] min-h-[16rem]">
                  {(profile && (!uid || profile._id==uid)) &&
                    <div className="flex border-b mb-3 -mt-2 p-3 relative z-50 wrap-content">
                      <PopoverForm/>
                      <div className="ml-3 mt-1">Create Bookshelf</div>
                    </div>}
                  {bookshelves && bookshelves.map((bookshelfData) =>
                    (<div key={bookshelfData._id}>
                      <Bookshelf bookshelfId={bookshelfData._id} isProfile={true} isMyProfile={profile && (!uid || profile._id==uid)}/>
                      <div className="border-b m-3 border-slate-300"/>
                    </div>
                    ))}
                </div>
              </ScrollMenu>
            </TabPanel>
            {/* Posts Tab */}
            <TabPanel width={'710px'}>
              <div className="bg-white h-full">
                {posts && posts.map((commentData) =>
                  (<div key={commentData._id}>
                    <Comment comment={commentData} isMyProfile={profile && (!uid || profile._id==uid)}/>
                    <div className="border-b ml-3 mr-3 border-slate-300"/>
                  </div>
                  ))}
              </div>
            </TabPanel>
            <TabPanel width={'710px'}>
              <ScrollMenu style={{overflowX: 'auto'}}>
                <div className="bg-white h-full">
                  {bookmarksIds && bookmarksIds.map((bookmarkId) =>
                    (<div key={bookmarkId}>
                      <Comment commentId={bookmarkId}/>
                      <div className="border-b ml-3 mr-3 border-slate-300"/>
                    </div>
                    ))}
                </div>
              </ScrollMenu>
            </TabPanel>
            <TabPanel width={'710px'}>
              <div className="bg-white h-full">
                {likedPosts && likedPosts.map((commentId) =>
                  (<div key={commentId}>
                    <Comment commentId={commentId}/>
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
