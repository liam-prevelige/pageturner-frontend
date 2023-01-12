import {React} from 'react';
import './HomePage.css';
import {TopTIcon} from '../../assets/Icons';
import {ShareBox} from '../ShareBox/ShareBox';
import {Comment} from '../Comment/Comment';

export const HomePage = () => {
  const topLevelCommentData = {
    uid: '1',
    displayName: 'John Doe',
    username: 'johndoe',
    avatar: 'https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600',
    text: 'This is a post about my favorite reading list.',
    metadata: {
      likes: 52,
      replies: 102,
      retweets: 10,
      timestamp: '2021-05-01T00:00:00.000Z',
    },
    parentData: {
      uid: '1',
      displayName: 'John Doe',
      username: 'johndoe',
      avatar: 'https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600',
      text: 'This is a post about my favorite reading list.',
      metadata: {
        likes: 52,
        replies: 102,
        retweets: 10,
        timestamp: '2021-05-01T00:00:00.000Z',
      },
    },
  };

  return (
    <>
      <div className="min-h-screen mx-auto max-w-7xl flex">
        <main className="flex-1 flex flex-col border-r border-l border-b border-primary-container_border_color">
          <>
            <header className="sticky-top flex justify-between items-center p-4 border-b border-primary-container_border_color bg-white">
              <span className="font-bold text-xl text-black">Home</span>
              <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-gray-700 hover:bg-opacity-70 cursor-pointer">
                <a title="Top Tweets">
                  <TopTIcon />
                </a>
              </div>
            </header>
            <div className="flex space-x-4 px-5 py-2 border-b border-primary-container_border_color">
              <img className="rounded-full h-11 w-11 mt-1" src="https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600" />
              <ShareBox />
            </div>
            <div>
              <Comment commentData={topLevelCommentData} depth={1} />
              <div style={{borderTop: '1px solid'}}></div>
            </div>
          </>
        </main>
      </div>
    </>
  );
};
