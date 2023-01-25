import {React} from 'react';
import {Comment} from '../Comment/Comment';
// import {useLocation} from 'react-router-dom';
import {getComments, getComment} from '../../api';
import ReactLoading from 'react-loading';
import {useEffect, useState} from 'react';

import {BackNav} from '../BackNav/BackNav';

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
    const search = window.location.search;
    const queryParams = new URLSearchParams(search);
    commentId = queryParams.get('commentId');
  }

  const [comments, setComments] = useState(null);
  const [parent, setParent] = useState(null);

  const retrieveComments = async () => {
    const parent = await getComment(commentId);
    const comments = await getComments(commentId);
    setParent(parent);
    setComments(comments);
  };

  useEffect(() => {
    retrieveComments();
  }, []);

  // Currently displays one comment, including the "parent" aka what is being replied to
  // SOMETIMES I want to display the replied comment at the TOP, with many children underneath
  // OTHER TIMES (homepage) I want to display a variety of comments, with their parents done within them
  // Ensure "data" works and we don't need to unwrap and rewrap
  return (
    <div>
      <BackNav />
      {(!parent || !comments) ? <ReactLoading type="spin" color="black" /> : <Comment commentData={comments[0]} parentData={parent.comments[0]}/>}
      {/* {!comments || comments.length == 0 ? <ReactLoading type="spin" color="black" /> : comments.map((data, index) =>
        (<div key={index}>
          <Comment commentData={data}/>
          <div className="border-b ml-3 mr-3 border-slate-300"></div>
        </div>
        ))
      } */}
    </div>

  );
};
