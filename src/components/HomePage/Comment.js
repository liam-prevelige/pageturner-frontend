import {React} from 'react';
import {Reply, Retweet, Like, Share} from './Icons';

export const Comment = () => {
  return (
    <>
      <div className="flex space-x-3 px-4 py-3 border-b border-primary-container_border_color">
        <img src="https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600" className="w-11 h-11 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center text-sm space-x-2">
            <span className="ml-1 font-bold text-black">Adem Can Certel </span>
            <span className="ml-2 text-primary-gray_colors">@ademcancertell</span>
            <span className="text-primary-gray_colors">2h</span>
          </div>
          <div className="ml-1">
            <p className="items-center text-black overflow-hidden">
                        Details are important; they are worth waiting for to be true.
              <img className="mt-3 rounded-xl" src="https://media-cdn.t24.com.tr/media/stories/2018/08/raw_34steve-jobs-onu-olum-doseginde-ziyaret-eden-kizina-tuvalet-gibi-kokuyorsun-demis34_591041725.jpg"/>
            </p>
            <ul className="flex justify-between mt-2">
              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-reply group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-reply_hover">
                  <Reply/>
                </div>
                <span>59</span>
              </li>

              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-retweet group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primay-retweet_hover cursor-pointer">
                  <Retweet/>
                </div>
                <span>158</span>
              </li>

              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-like group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-like_hover cursor-pointer">
                  <Like/>
                </div>
                <span>176</span>
              </li>

              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-tweets_hover_colors1 cursor-pointer">
                  <Share/>
                </div>
                <span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex space-x-3 px-4 py-3 border-b border-primary-container_border_color">
        <img src="https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600" className="w-11 h-11 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center text-sm space-x-2">
            <span className="ml-1 font-bold text-black">Adem Can Certel </span>
            <span className="ml-2 text-primary-gray_colors">@ademcancertell</span>
            <span className="text-primary-gray_colors">2h</span>
          </div>
          <div className="ml-1">
            <p className="items-center text-black overflow-hidden">
                        Bırak saçlarını rüzgarlarına un...
                        Bu şehirde aşksız ve rügarsız yaşanmaz.
              <img className="mt-3 rounded-xl w-full h-full" src="https://media.istockphoto.com/photos/mosque-and-bosphorus-bridge-picture-id1283504873?b=1&k=20&m=1283504873&s=170667a&w=0&h=nPfB3oltsXGPYnWkmxCmP0dhCQ8dJ9DZpaMBc1aBQyw="/>
            </p>
            <ul className="flex justify-between mt-2">
              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-reply group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-reply_hover">
                  <Reply/>
                </div>
                <span>59</span>
              </li>

              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-retweet group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primay-retweet_hover cursor-pointer">
                  <Retweet/>
                </div>
                <span>158</span>
              </li>

              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-like group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-like_hover cursor-pointer">
                  <Like/>
                </div>
                <span>176</span>
              </li>

              <li className="flex items-center text-sm space-x-0 text-primary-gray_colors group cursor-pointer">
                <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-tweets_hover_colors1 cursor-pointer">
                  <Share/>
                </div>
                <span></span>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
