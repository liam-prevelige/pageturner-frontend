import {React} from 'react';

import {ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'; // https://chakra-ui.com/docs/components/tabs/usage
import {ScrollMenu} from 'react-horizontal-scrolling-menu'; // https://www.npmjs.com/package/react-horizontal-scrolling-menu
import {ThreadView} from '../ThreadView/ThreadView';


export const ProfileTabs = () => {
  return (
    <ChakraProvider resetCSS={false}>
      <Tabs isFitted className="m-3" variant='line' colorScheme='cyan'>
        <TabList>
          <Tab>Bookshelves</Tab>
          <Tab>Posts</Tab>
          <Tab>Bookmarks</Tab>
          <Tab>Activity</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ScrollMenu style={{overflowY: 'auto'}}>
              <ThreadView commentId={'a'}/>
            </ScrollMenu>
          </TabPanel>
          <TabPanel>
            <ScrollMenu style={{overflowX: 'auto'}}>
              <ThreadView commentId={'a'}/>
            </ScrollMenu>
          </TabPanel>
          <TabPanel>
            <ScrollMenu style={{overflowX: 'auto'}}>
              <ThreadView commentId={'a'}/>
            </ScrollMenu>
          </TabPanel>
          <TabPanel>
            <ScrollMenu style={{overflowX: 'auto'}}>
              <ThreadView commentId={'a'}/>
            </ScrollMenu>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
};
