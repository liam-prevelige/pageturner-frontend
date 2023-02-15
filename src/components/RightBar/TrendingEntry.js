import {React} from 'react';
import {Circle} from '../../assets/Icons';

export const TrendingEntry = ({rank, title, postcount}) => {
  return (
    <div className="hover:bg-primary-trends_hover cursor-pointer">
      <div className="mt-2">
        <div className="flex flex-row items-center">
          <span className="text-sm text-gray-600">{rank}. Trending</span>
          <div className="flex space-x-1 ml-auto tt items-center justify-center w-8 h-7 rounded-full transform transition-colors duration-2 hover:bg-black hover:bg-opacity-25 cursor-pointer">
            <Circle />
          </div>
        </div>
      </div>
      <div className="topic">
        <div className="text-black font-bold">
          <span>{title}</span>
        </div>
      </div>
      <div className="TopicCount mb-3">
        <span className="text-gray-600">{postcount} Likes</span>
      </div>
      <div style={{borderTop: '1px solid gray'}}></div>
    </div>
  );
};
