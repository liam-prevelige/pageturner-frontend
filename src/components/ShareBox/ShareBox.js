import {React} from 'react';
import {Media, Gif, Survey, Emoji, Plans} from '../../assets/Icons';


export const ShareBox = () => {
  return (
    <>
      <div className="flex flex-1 flex-col mt-2 text-black">
        <textarea type="text" className="bg-white tweet-box w-full outline-none overflow-hidden flex-1 rounded-xl text-xl p-1 resize-none" placeholder="What's happening?"/>
        <div className="items-center flex justify-between">
          <div className="flex items-center justify-center">
            <input data-v-16420b52="" type="file" id="imageInput" accept="image/*" className="hidden cursor-pointer"/>
            <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-primary-tweetbox_colors_hover cursor-pointer">
              <a title="Media">
                <label htmlFor="imageInput">
                  <Media/>
                </label>
              </a>
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-primary-tweetbox_colors_hover cursor-pointer">
              <a title="Gif">
                <Gif/>
              </a>
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-primary-tweetbox_colors_hover cursor-pointer">
              <a title="Survery">
                <Survey/>
              </a>
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-primary-tweetbox_colors_hover cursor-pointer">
              <a className="Emoji">
                <Emoji/>
              </a>
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-primary-tweetbox_colors_hover cursor-pointer">
              <a className="Plan">
                <Plans/>
              </a>
            </div>
          </div>
          <div className="bg-primary-button text-black rounded-full shadow-lg justify-center py-2 px-4 transform transition-colors duration-500 hover:bg-primary-button_hover">
            <button className="button-tweet font-bold">Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
