import {React} from 'react';
import './HomePage.css';
import {TopTIcon} from './Icons';
import {Comment} from './Comment';

export const HomePage = () => {
  return (
    <>
      <div className="min-h-screen mx-auto max-w-7xl flex">
        <main className="flex-1 flex flex-col border-r border-l border-b border-primary-container_border_color">
          <>
            <header className="sticky-top flex justify-between items-center p-4 border-b border-primary-container_border_color">
              <span className="font-bold text-xl text-black">Home</span>
              <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-gray-700 hover:bg-opacity-70 cursor-pointer">
                <a title="Top Tweets">
                  <TopTIcon />
                </a>
              </div>
            </header>
            <div>
              <Comment />
            </div>
          </>
        </main>
      </div>
    </>
  );
};
