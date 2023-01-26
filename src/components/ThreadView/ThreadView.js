import {React, useEffect, useState} from 'react';
import {Comment} from '../Comment/Comment';
import {BackNav} from '../BackNav/BackNav';
import {getReplies} from '../../api';
import {ReplyBox} from '../ShareBox/ReplyBox';


export const ThreadView = () => {
  let commentId = '63d0ab8ff3d6963f6f68a93a'; // fake/default comment ID
  const search = window.location.search;
  const queryParams = new URLSearchParams(search);
  const [replies, setReplies] = useState([]);

  if (queryParams.has('commentId')) {
    commentId = queryParams.get('commentId');
  }

  const loadReplies = async (commentId) => {
    const fetchedReplies = await getReplies(commentId);
    setReplies(fetchedReplies);
  };

  useEffect(() => {
    loadReplies(commentId);
  }, [commentId]);

  return (
    <div className="flex relative flex-col bg-slate-100">
      <div className="bg-white">
        <BackNav />
        <Comment commentId={commentId}/>
      </div>
      <div className="border-b ml-3 mr-3 border-slate-500"></div>
      <div className="relative flex bg-white space-x-4 px-4 py-2 border-b border-slate-300">
        <ReplyBox />
      </div>
      <div className="bg-slate-100 h-full">
        {replies.map((replyData, index) =>
          (<div key={index}>
            <Comment commentId={replyData._id} noParent={true}/>
            <div className="border-b ml-3 mr-3 border-slate-300"></div>
          </div>
          ))}
      </div>
    </div>

  );
};
