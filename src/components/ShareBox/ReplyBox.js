import {React, useState} from 'react';
import {postComment} from '../../api';

export const ReplyBox = ({pid}) => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [replyText, setReplyText] = useState('');

  const submitReplyCb = async () => {
    if (replyText && replyText.length > 0) {
      // await postComment('global', pid, replyText);
      await postComment('global', pid, 'comment', replyText);
      window.dispatchEvent(new Event('newReply'));
      setReplyText('');
    }
  };

  const updateReplyText = (e) => {
    setReplyText(e.target.value);
  };

  return (
    <>
      {profile ? <img className="rounded-full h-11 w-11 border border-slate-300 mt-1" src={profile.profilePicture} /> :
        <img className="rounded-full h-11 w-11 mt-1" src="https://www.protocol.com/media-library/image.png?id=27946197&width=1200&height=600" />
      }
      <div className="flex flex-1 flex-row mt-2 text-black">
        <textarea type="text" rows="1" className="bg-white tweet-box w-full outline-none overflow-y-auto flex-1 rounded-xl text-m p-2 resize-none" placeholder="My thoughts are..." value={replyText} onChange={(e) => updateReplyText(e)}/>
        <button className="button-tweet ml-5 font-bold wrap-text justify-center text-primary-button rounded-full shadow-sm justify-center py-2 px-4 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:text-white" onClick={submitReplyCb}>
          Reply
        </button>
      </div>
    </>
  );
};
