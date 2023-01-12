import {React} from 'react';
import {Comment} from '../Comment/Comment';
import {useLocation} from 'react-router-dom';

const comments = {
  'a': {
    commentId: 'a',
    uid: '1',
    displayName: 'John Doe',
    username: 'johndoe',
    avatar: 'https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600',
    text: 'First post: this is a post about my favorite reading list.',
    metadata: {
      likes: 52,
      replies: 102,
      retweets: 10,
      timestamp: '2021-05-01T00:00:00.000Z',
    },
    pid: 'b',
  },
  'b': {
    commentId: 'b',
    uid: '2',
    displayName: 'Not John Doe',
    username: 'notjohndoe',
    avatar: 'https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600',
    text: 'Second post: this is a post about my least favorite reading list.',
    metadata: {
      likes: 10,
      replies: 20,
      retweets: 30,
      timestamp: '2021-05-01T00:00:00.000Z',
    },
    pid: 'c',
  },
  'c': {
    commentId: 'c',
    uid: '3',
    displayName: 'Not Not John Doe',
    username: 'notnotjohndoe',
    avatar: 'https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600',
    text: 'Third post: this is a post about my middle favorite reading list.',
    metadata: {
      likes: 50,
      replies: 30,
      retweets: 20,
      timestamp: '2021-05-01T00:00:00.000Z',
    },
    pid: 'a',
  },
};

export const ThreadView = ({commentId}) => {
  if (!commentId) {
    const search = useLocation().search;
    const queryParams = new URLSearchParams(search);
    commentId = queryParams.get('commentId');
  }

  console.log(comments[comments[commentId].pid]);
  return (
    <div>
      <Comment commentData={comments[commentId]} parentData={comments[comments[commentId].pid]} depth={1}/>
      <div style={{borderTop: '1px solid'}}></div>
    </div>
  );
};
