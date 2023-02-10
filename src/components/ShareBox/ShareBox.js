import {React, useState} from 'react';
// import {Media, Emoji} from '../../assets/Icons';
import {AttachBookshelfPopup} from './AttachBookshelfPopup';
import {postComment} from '../../api';
import {Bookshelf} from '../ProfilePage/Bookshelf';

export const ShareBox = () => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [postText, setPostText] = useState('');
  const [isAttachedBookshelf, setIsAttachedBookshelf] = useState(false);
  const [attachedBookshelf, setAttachedBookshelf] = useState({});
  const submitPostCb = async () => {
    if (postText && postText.length > 0) {
      console.log('submit post');
      await postComment('global', '', postText);
      window.dispatchEvent(new Event('newPost'));
      setPostText('');
    }
  };

  window.addEventListener('attachBookshelf', (e) => {
    console.log('attachBookshelf', e.detail);
    setIsAttachedBookshelf(true);
    setAttachedBookshelf(e.detail);
  });

  const updatePostText = (e) => {
    setPostText(e.target.value);
  };

  return (
    <>
      {profile ? <img className="rounded-full h-11 w-11 border border-slate-300 mt-1" src={profile.profilePicture} /> :
        <img className="rounded-full h-11 w-11 mt-1" src="https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600" />
      }
      <div className="flex flex-1 flex-col mt-2 text-black">
        <textarea id="postInput" type="text" rows="1" className="bg-white tweet-box w-full outline-none overflow-y-auto flex-1 rounded-xl text-m p-2 resize-none" placeholder="What have you been reading?" value={postText} onChange={(e) => updatePostText(e)}/>
        {isAttachedBookshelf && <Bookshelf bookshelfId={attachedBookshelf._id}/>}
        <div className="items-center flex justify-between">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-slate-300 cursor-pointer">
              <a title="list">
                <AttachBookshelfPopup/>
                {/* <ListIcon/> */}
              </a>
            </div>
            {/* <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-slate-300 cursor-pointer">
              <a title="media">
                <Media/>
              </a>
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-slate-300 cursor-pointer">
              <a className="Emoji">
                <Emoji/>
              </a>
            </div> */}
          </div>
          <button className="button-tweet font-bold wrap-text justify-center text-primary-button rounded-full shadow-sm justify-center py-2 px-4 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:text-white" onClick={submitPostCb}>
            Share
          </button>
        </div>
      </div>
    </>
  );
};
