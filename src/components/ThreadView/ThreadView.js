import {React} from 'react';
import {Comment} from '../Comment/Comment';
import {useLocation} from 'react-router-dom';
import {getComments} from '../../api';
import ReactLoading from 'react-loading';

// const comments = {
//   'a': {
//     commentId: 'a',
//     uid: '1',
//     displayName: 'John Doe',
//     username: 'johndoe',
//     avatar: 'https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600',
//     text: 'First post: this is a post about my favorite reading list.',
//     metadata: {
//       likes: 52,
//       replies: 102,
//       retweets: 10,
//       timestamp: '2021-05-01T00:00:00.000Z',
//     },
//     pid: 'b',
//   },
//   'b': {
//     commentId: 'b',
//     uid: '2',
//     displayName: 'Not John Doe',
//     username: 'notjohndoe',
//     avatar: 'https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600',
//     text: 'Second post: this is a post about my least favorite reading list.',
//     metadata: {
//       likes: 10,
//       replies: 20,
//       retweets: 30,
//       timestamp: '2021-05-01T00:00:00.000Z',
//     },
//     pid: 'c',
//   },
//   'c': {
//     commentId: 'c',
//     uid: '3',
//     displayName: 'Not Not John Doe',
//     username: 'notnotjohndoe',
//     avatar: 'https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600',
//     text: 'Third post: this is a post about my middle favorite reading list.',
//     metadata: {
//       likes: 50,
//       replies: 30,
//       retweets: 20,
//       timestamp: '2021-05-01T00:00:00.000Z',
//     },
//     pid: 'a',
//   },
// };

// Is this just a single view, or is it the whole feed
// If whole feed, I want the parent to be "commentId." Right now that is the child

// Currently only displays one comment (given by commentId)
// It also has the comment display a "parent" that it is replying to
// TODO: Update this so it displays many comments all with the same child (since they are all replying to the same thing)
// TODO: Include that child comment at the top of the feed
// getComments on the backend returns all children of a given object
// TODO: Right now, getComments won't return the parent comment with the others
export const ThreadView = ({commentId}) => {
  if (!commentId) {
    const search = useLocation().search;
    const queryParams = new URLSearchParams(search);
    commentId = queryParams.get('commentId');
  }
  const comments = getComments(commentId);

  // Currently displays one comment, including the "parent" aka what is being replied to
  // SOMETIMES I want to display the replied comment at the TOP, with many children underneath
  // OTHER TIMES (homepage) I want to display a variety of comments, with their parents done within them
  return (
    <div>
      {comments.length == 0 ? <ReactLoading type="spin" color="black" /> : comments.map((data) =>
        (<Comment key={index} commentData={data}/>
        ))
      }
      <div className="border-b ml-3 mr-3 border-slate-300"></div>
    </div>

  );
};
