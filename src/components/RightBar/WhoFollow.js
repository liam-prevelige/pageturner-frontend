import {React} from 'react';
import {Circle} from '../../assets/Icons';

export const WhoFollow = () => {
  return (
    <>
      <div className="items-center p-3 m-3 mt-4 bg-slate-200 rounded-xl">
        <div className="flex items-center justify-between text-black">
          <span className="text-xl font-bold">Who To Follow</span>
        </div>
        <div className="hover:bg-primary-trends_hover cursor-pointer mb-3 mt-5">
          <div className="">
            <div className="flex flex-row items-center">
              <span className="text-sm text-black">Trending in Turkey</span>
              <div className="flex space-x-1 ml-auto tt items-center justify-center w-8 h-8 rounded-full transform transition-colors duration-2 hover:bg-black hover:bg-opacity-25 cursor-pointer">
                <Circle/>
              </div>
            </div>
          </div>
          <div className="topic">
            <div className="text-black font-bold">
              <span>
                            #Twitter Clone
              </span>
            </div>
          </div>
          <div className="TopicCount">
            <span className="text-black">15.8K Tweets</span>
          </div>
        </div>
        <div className="p-4 transform transition-colors duration-2 bg-slate-200">
          <span className=" text-primary-button">Show more</span>
        </div>
      </div>
    </>
  );
};
