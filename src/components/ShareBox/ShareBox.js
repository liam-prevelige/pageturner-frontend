import {React, useState} from 'react';
// import {Media, Emoji} from '../../assets/Icons';
import {AttachBookshelfPopup} from './AttachBookshelfPopup';
import {postComment} from '../../api';
import {Bookshelf} from '../ProfilePage/Bookshelf';
import {FaTimes} from 'react-icons/fa';

export const ShareBox = () => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [postText, setPostText] = useState('');
  const [isAttachedBookshelf, setIsAttachedBookshelf] = useState(false);
  const [attachedBookshelf, setAttachedBookshelf] = useState({});
  const [pid, setPid] = useState('');
  const [ptype, setPtype] = useState('');

  const placeholderText = profile ? 'Share your thoughts!' : 'Sign in to share your thoughts!';

  const submitPostCb = async () => {
    if (postText && postText.length > 0) {
      // (scope, pid, ptype, text)
      await postComment('global', pid, ptype, postText);
      window.dispatchEvent(new Event('newPost'));
      // Reset state
      setPostText('');
      setIsAttachedBookshelf(false);
      setAttachedBookshelf({});
      setPid('');
      setPtype('');
    }
  };

  const removeBookshelf = () => {
    setIsAttachedBookshelf(false);
    setAttachedBookshelf({});
    setPid('');
    setPtype('');
  };

  window.addEventListener('attachBookshelf', (e) => {
    setIsAttachedBookshelf(true);
    setAttachedBookshelf(e.detail);
    setPid(e.detail._id);
    setPtype('bookshelf');
  });

  const updatePostText = (e) => {
    setPostText(e.target.value);
  };

  return (
    <>
      {profile ? <img className="rounded-full h-11 w-11 border border-slate-300 mt-1" src={profile.profilePicture} /> :
        <img className="rounded-full h-11 w-11 mt-1" src="https://www.ssrl-uark.com/wp-content/uploads/2014/06/no-profile-image.png" />
      }
      <div className="flex flex-1 flex-col mt-2 text-black">
        <textarea id="postInput" type="text" rows="1" className="bg-white tweet-box w-full outline-none overflow-y-auto flex-1 rounded-xl text-m p-2 resize-none" placeholder={placeholderText} value={postText} onChange={(e) => updatePostText(e)} disabled={profile==null}/>
        {isAttachedBookshelf &&
        <div>
          <div className="flex items-center justify-end">
            <button className="flex bg-red-300 w-7 h-7 -mb-4 -mr-2 justify-center rounded-full border-2 border-red-300" onClick={removeBookshelf}>
              <FaTimes className="mt-0.5 w-5 h-5 text-white rounded-full"/>
            </button>
          </div>
          <div className='rounded bg-slate-200 mb-3 p-2'>
            <Bookshelf bookshelfId={attachedBookshelf._id}/>
          </div>
        </div>}
        <div className="items-center flex justify-between">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-slate-300 cursor-pointer">
              <AttachBookshelfPopup/>
            </div>
          </div>
          <button className="button-tweet font-bold wrap-text justify-center text-primary-button rounded-full shadow-sm justify-center py-2 px-4 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:text-white" disabled={profile==null} onClick={submitPostCb}>
            Share
          </button>
        </div>
      </div>
    </>
  );
};
