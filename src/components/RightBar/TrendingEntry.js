import {React} from 'react';

export const TrendingEntry = ({rank, title, postcount}) => {
  return (
    <>
      <div className="hover:bg-white rounded p-1 cursor-pointer">
        <div className="">
          <div className="flex flex-row items-center">
            <span className="text-sm text-gray-600">{rank}. Trending</span>
            <div className="flex space-x-1 ml-auto tt items-center justify-center w-8 h-7 rounded-full transform transition-colors duration-2 hover:bg-white hover:bg-opacity-25 cursor-pointer">
            </div>
          </div>
        </div>
        <div className="topic">
          <div className="text-black font-bold">
            <span>{title}</span>
          </div>
        </div>
        <div className="TopicCount">
          <span className="text-gray-600">{postcount} Likes</span>
        </div>
      </div>
      <div className="mt-3 mb-3" style={{borderTop: '1px solid gray'}}></div>
    </>
  );
};
