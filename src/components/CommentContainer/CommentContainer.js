import {React} from 'react';
import {TopTIcon} from '../HomePage/Icons';
import {Comment} from '../HomePage/Comment';

export const CommentContainer = () => {
  return (
    <>
      <header className="sticky-top flex justify-between items-center p-4 border-b border-primary-container_border_color">
        <span className="font-bold text-xl text-white">Home</span>
        <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-gray-700 hover:bg-opacity-70 cursor-pointer">
          <a title="Top Tweets">
            <TopTIcon/>
          </a>
        </div>
      </header>
      <div>
        <Comment/>
      </div>
    </>
  );
};
