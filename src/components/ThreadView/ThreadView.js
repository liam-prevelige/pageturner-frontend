import {React, useEffect, useState} from 'react';
import {Comment} from '../Comment/Comment';
import {useParams} from 'react-router-dom';
import {BackNav} from '../BackNav/BackNav';
import {getReplies} from '../../api';
import {ReplyBox} from '../ShareBox/ReplyBox';
import ReactGA from 'react-ga';

export const ThreadView = () => {
  // const commentId = '63d0ab8ff3d6963f6f68a93a'; // fake/default comment ID
  // const [queryParams, setQueryParams] = useState(new URLSearchParams(window.location.search)); // [queryParams, setQueryParams
  const [replies, setReplies] = useState([]);
  const {commentIdParam} = useParams();
  const [commentId, setCommentId] = useState(commentIdParam || '63d0ab8ff3d6963f6f68a93a'); // if no url param, fake/default comment ID

  const loadReplies = async (newCommentId) => {
    if (!newCommentId) return;
    setReplies(await getReplies(newCommentId));
  };

  // Create event listener for newPost in sessionStorage
  window.addEventListener('newReply', () => {
    loadReplies(commentId);
  });

  useEffect(() => {
    setCommentId(commentIdParam);
  }, [commentIdParam]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    loadReplies(commentId); // setState hooks are async, so this is necessary
  }, [commentId]);

  return (
    <div className="flex relative flex-col bg-slate-100">
      <div className="bg-white">
        <BackNav />
        <Comment commentId={commentId}/>
      </div>
      <div className="border-b ml-3 mr-3 border-slate-500"></div>
      <div className="relative flex bg-white space-x-4 px-4 py-2 border-b border-slate-300">
        <ReplyBox pid={commentId}/>
      </div>
      <div className="bg-slate-100 h-full">
        {replies.map((reply, index) =>
          (<div key={index}>
            <Comment comment={reply} noParent={true}/>
            <div className="border-b ml-3 mr-3 border-slate-300"></div>
          </div>
          ))}
      </div>
    </div>

  );
};
