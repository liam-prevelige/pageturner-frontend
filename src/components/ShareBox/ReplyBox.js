import {React, useState} from 'react';

export const ReplyBox = () => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];

  return (
    <>
      {profile ? <img className="rounded-full h-11 w-11 border border-slate-300 mt-1" src={profile.profilePicture} /> :
        <img className="rounded-full h-11 w-11 mt-1" src="https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600" />
      }
      <div className="flex flex-1 flex-row mt-2 text-black">
        <textarea type="text" rows="1" className="bg-white tweet-box w-full outline-none overflow-y-auto flex-1 rounded-xl text-m p-2 resize-none" placeholder="My thoughts are..."/>
        <button className="button-tweet ml-5 font-bold wrap-text justify-center text-primary-button rounded-full shadow-sm justify-center py-2 px-4 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:text-white">Reply</button>
      </div>
    </>
  );
};
