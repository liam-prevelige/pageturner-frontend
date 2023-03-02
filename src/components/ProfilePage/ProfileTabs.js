import {React, useState, useEffect} from 'react';

import {ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'; // https://chakra-ui.com/docs/components/tabs/usage
import {ScrollMenu} from 'react-horizontal-scrolling-menu'; // https://www.npmjs.com/package/react-horizontal-scrolling-menu
import {Comment} from '../Comment/Comment';
import {PopoverForm} from './BookshelfPopup';

import {getBookshelves, getPosts, getBookmarks, getLikedPosts} from '../../api';
// import {PopoverForm} from './BookshelfPopup';
import {Bookshelf} from './Bookshelf';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import ReactLoading from 'react-loading';

export const ProfileTabs = ({userId}) => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const uid = userId ? userId : profile._id;
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [bookmarksIds, setBookmarksIds] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const theme = createTheme();

  window.addEventListener('bookshelfCreated', () => {
    fetchBookshelves();
  });

  const fetchBookshelves = async () => {
    // if (!profile) return;
    if (bookshelves.length==0 && tabIndex===0) {
      setLoading(true);
      const loadedBookshelves = await getBookshelves(uid, 'user');
      setBookshelves(loadedBookshelves);
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    if (posts.length==0 && tabIndex===1) {
      setLoading(true);
      const profilePosts = await getPosts(uid);
      setPosts(profilePosts);
      setLoading(false);
    }
  };

  const fetchBookmarkedIds = async () => {
    if (bookmarksIds.length===0 && tabIndex===2) {
      setLoading(true);
      let fetchedBookmarksIds = await getBookmarks(uid);
      if (fetchedBookmarksIds) {
        fetchedBookmarksIds = fetchedBookmarksIds.reverse();
      }
      setBookmarksIds(fetchedBookmarksIds);
      setLoading(false);
    }
  };

  const fetchLikedPosts = async () => {
    if (likedPosts.length===0 && tabIndex===3) {
      setLoading(true);
      let fetchedLikedPosts = await getLikedPosts(uid);
      if (fetchedLikedPosts) {
        fetchedLikedPosts = fetchedLikedPosts.reverse();
      }
      setLikedPosts(fetchedLikedPosts);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookshelves();
    fetchPosts();
    fetchBookmarkedIds();
    fetchLikedPosts();
  }, [tabIndex]);

  useEffect(() => {
    setBookshelves([]);
    setPosts([]);
    setBookmarksIds([]);
    setLikedPosts([]);
  }, [uid]);

  return (
    <ThemeProvider theme={theme}>
      <ChakraProvider resetCSS={false}>
        <Tabs isFitted className="m-3" variant='line' colorScheme='cyan' index={tabIndex} onChange={(e) => setTabIndex(e)}>
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
                    <div className="flex border-b mb-3 -mt-2 p-3 wrap-content">
                      <PopoverForm/>
                      <div className="ml-3 mt-1">Create Bookshelf</div>
                    </div>}
                  {loading && <ReactLoading type="spin" color="black" />}
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
                {loading && <ReactLoading type="spin" color="black" />}
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
                  {loading && <ReactLoading type="spin" color="black" />}
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
                {loading && <ReactLoading type="spin" color="black" />}
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
