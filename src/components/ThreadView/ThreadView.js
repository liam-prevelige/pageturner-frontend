import {React} from 'react';
import {Comment} from '../Comment/Comment';

export const ThreadView = () => {
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
    <div>
      <Comment commentData={topLevelCommentData} depth={1}/>
      <div style={{borderTop: '1px solid'}}></div>
    </div>
  );
};
