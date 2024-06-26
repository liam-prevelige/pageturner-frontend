import {React, useState} from 'react';
import {getComment, getBasicProfile, postComment, postNotification} from '../../api';
import {useParams} from 'react-router-dom';

export const ReplyBox = () => {
  const {clubId, commentIdParam} = useParams();
  const pid = commentIdParam;
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [replyText, setReplyText] = useState('');
  const placeholderText = profile ? 'My thoughts are...' : 'Sign in to share your thoughts!';

  const submitReplyCb = async () => {
    if (replyText && replyText.length > 0) {
      const scope = clubId ? clubId : 'global';
      const {commentId} = await postComment(scope, pid, 'comment', replyText);
      window.dispatchEvent(new Event('newReply'));
      setReplyText('');

      // Get the owner of the post
      const comment = await getComment(pid);
      const postOwner = await getBasicProfile(comment.uid);

      // Get the commenter id
      const reply = await getComment(commentId);
      const commenter = await getBasicProfile(reply.uid);

      await postNotification(postOwner._id, commentId, commenter.tag, false, 'reply');
    }
  };

  const updateReplyText = (e) => {
    setReplyText(e.target.value);
  };

  return (
    <>
      {profile ? <img className="rounded-full h-11 w-11 border border-slate-300 mt-1" src={profile.profilePicture} /> :
        <img className="rounded-full h-11 w-11 mt-1" src="https://www.ssrl-uark.com/wp-content/uploads/2014/06/no-profile-image.png" />
      }
      <div className="flex flex-1 flex-row mt-2 text-black">
        <textarea type="text" rows="1" className="bg-white tweet-box w-full outline-none overflow-y-auto flex-1 rounded-xl text-m p-2 resize-none" placeholder={placeholderText} value={replyText} onChange={(e) => updateReplyText(e)} disabled={profile==null}/>
        <button className="button-tweet ml-5 font-bold wrap-text justify-center text-primary-button rounded-full shadow-sm justify-center py-2 px-4 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:text-white" onClick={submitReplyCb} disabled={profile==null}>
          Reply
        </button>
      </div>
    </>
  );
};
