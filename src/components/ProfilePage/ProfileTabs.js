import {React, useState, useEffect} from 'react';

import {ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'; // https://chakra-ui.com/docs/components/tabs/usage
import {ScrollMenu} from 'react-horizontal-scrolling-menu'; // https://www.npmjs.com/package/react-horizontal-scrolling-menu
import {ThreadView} from '../ThreadView/ThreadView';
import {Comment} from '../Comment/Comment';

import {getPosts, getLikedPosts} from '../../api';


export const ProfileTabs = ({uid}) => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const fetchPosts = async () => {
    const profilePosts = await getPosts(uid);
    console.log(profilePosts);
    setPosts(profilePosts);
  };

  const fetchLikedPosts = async () => {
    const likedPosts = await getLikedPosts(uid);
    console.log(likedPosts);
    setLikedPosts(likedPosts);
  };

  useEffect(() => {
    console.log('fetching posts');
    fetchPosts();
    fetchLikedPosts();
  }, [uid]);

  return (
    <ChakraProvider resetCSS={false}>
      <Tabs isFitted className="m-3" variant='line' colorScheme='cyan'>
        <TabList>
          <Tab>Bookshelves</Tab>
          <Tab>Posts</Tab>
          <Tab>Bookmarks</Tab>
          <Tab>Liked</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ScrollMenu style={{overflowY: 'auto'}}>
              <ThreadView commentId={'63cef967b83ed8c71f06be01'}/>
            </ScrollMenu>
          </TabPanel>
          {/* Posts Tab */}
          <TabPanel>
            <div className="bg-white h-full">
              {posts && posts.map((commentData, index) =>
                (<div key={index}>
                  <Comment commentId={commentData}/>
                  <div className="border-b ml-3 mr-3 border-slate-300"/>
                </div>
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <ScrollMenu style={{overflowX: 'auto'}}>
              <ThreadView commentId={'63cef967b83ed8c71f06be01'}/>
            </ScrollMenu>
          </TabPanel>
          <TabPanel>
            <div className="bg-white h-full">
              {likedPosts && likedPosts.map((commentData, index) =>
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
  );
};
