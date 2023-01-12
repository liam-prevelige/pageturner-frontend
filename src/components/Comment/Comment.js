import {React} from 'react';
import {Reply, Retweet, Like, Share} from '../../assets/Icons';

export const Comment = ({commentData, depth}) => {
  const loadThread = (commentData) => {
    console.log('Loading thread for comment: ', commentData);
  };
  const bgColor = depth<2 ? 'bg-white' : 'bg-slate-200';
  console.log(bgColor);
  return (
    <>
      <div className={`flex space-x-3 px-4 py-3 border-primary-container_border_color ${bgColor}`} onClick={loadThread(commentData)}>
        {depth<2 && <img src={commentData.avatar} className="w-11 h-11 rounded-full" />}
        <div className="flex-1">
          <div className="flex items-center text-sm space-x-2">
            <span className="ml-1 font-bold text-black">{commentData.displayName}</span>
            <span className="ml-2 text-primary-gray_colors">@{commentData.username}</span>
            <span className="text-primary-gray_colors">2h</span>
          </div>
          <div className="ml-1">
            <p className="items-center text-black overflow-hidden">
              {commentData.text}
              {/* Parent comment: */}
              {depth<2 &&
                <Comment commentData={commentData.parentData} depth={2} onClick={loadThread(commentData.parentData)}/>
              }
            </p>
            {depth<2 && <ul className="flex justify-between mt-2">
              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-reply group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-reply_hover">
                  <Reply/>
                </div>
                <span>{commentData.metadata.replies}</span>
              </li>

              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-retweet group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primay-retweet_hover cursor-pointer">
                  <Retweet/>
                </div>
                <span>{commentData.metadata.retweets}</span>
              </li>

              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-like group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-like_hover cursor-pointer">
                  <Like/>
                </div>
                <span>{commentData.metadata.likes}</span>
              </li>

              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-tweets_hover_colors1 cursor-pointer">
                  <Share/>
                </div>
                <span></span>
              </li>
            </ul>}
          </div>
        </div>
      </div>
    </>
  );
};
