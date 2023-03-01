import {React, useEffect, useState} from 'react';
import {Comment} from '../Comment/Comment';
import {useParams} from 'react-router-dom';
import {BackNav} from '../BackNav/BackNav';
import {getReplies} from '../../api';
import {ReplyBox} from '../ShareBox/ReplyBox';
import ReactGA from 'react-ga';

export const ThreadView = () => {
  const [replies, setReplies] = useState([]);
  const {commentIdParam} = useParams();
  const [topLevelCommentId, setTopLevelCommentId] = useState(commentIdParam);
  // const commentId = commentIdParam; // if no url param, fake/default comment ID
  const loadReplies = async (newCommentId) => {
    if (!newCommentId) return;
    setReplies(await getReplies(newCommentId));
  };

  // Create event listener for newPost in sessionStorage
  window.addEventListener('newReply', () => {
    loadReplies(commentIdParam);
  });

  // useEffect(() => {
  //   setCommentId(commentIdParam);
  // }, [commentIdParam]);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  useEffect(() => {
    console.log('commentIdParam changed', commentIdParam);
    setTopLevelCommentId(commentIdParam);
    loadReplies(commentIdParam);
  }, [commentIdParam]);

  return (
    <>
      {commentIdParam && <div className="flex relative flex-col bg-slate-100">
        <div className="bg-white">
          <BackNav />
          <Comment commentId={topLevelCommentId}/>
        </div>
        <div className="border-b ml-3 mr-3 border-slate-500"></div>
        <div className="relative flex bg-white space-x-4 px-4 py-2 border-b border-slate-300">
          <ReplyBox />
        </div>
        <div className="bg-slate-100 h-full">
          {replies.map((reply) =>
            (<div key={reply._id}>
              <Comment comment={reply} noParent={true}/>
              <div className="border-b ml-3 mr-3 border-slate-300"></div>
            </div>
            ))}
        </div>
      </div>}
    </>
  );
};
