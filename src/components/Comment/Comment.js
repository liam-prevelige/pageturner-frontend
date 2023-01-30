import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Reply, Retweet, Like, Share} from '../../assets/Icons';
import {Parent} from './Parent';
import {getProfile, getComment, updateLikes} from '../../api';
import ReactLoading from 'react-loading';
import {formatDistance} from 'date-fns';

export const Comment = ({commentId, noParent}) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [commentData, setCommentData] = useState(null);

  const loadThread = (e, clickedCommentData) => {
    e.stopPropagation();
    const path = `/thread/${clickedCommentData._id}`;
    navigate(path);
  };

  const getData = async (cId) => {
    if (!cId) return;
    // Turn on loading state while waiting for API
    setProfileData(null);
    setCommentData(null);
    const comment = await getComment(cId);
    const profile = await getProfile(comment.uid);
    setProfileData(profile);
    setCommentData(comment);
  };

  const updateLikesCb = async (e) => {
    e.stopPropagation();
    console.log('updateLikesCb');
    await updateLikes(commentData._id);
  };

  const loadUserProfile = (uid) => {
    const path = `/profile?uid=${uid}`;
    navigate(path);
  };

  useEffect(() => {
    getData(commentId);
  }, [commentId]);

  return (
    <>
      {!(profileData && commentData) ? <ReactLoading type="spin" color="black" /> :
       <div className='flex space-x-3 px-4 py-3 border-primary-container_border_color'>
         <img src={profileData.profilePicture} className="cursor-pointer w-11 h-11 rounded-full" onClick={() => loadUserProfile(profileData._id)} />
         <div className="flex-1">
           <div className="flex items-center text-sm space-x-2 cursor-pointer" onClick={() => loadUserProfile(profileData._id)}>
             <span className="ml-1 font-bold text-black">{profileData.name}</span>
             <span className="ml-2 text-primary-gray_colors">@{profileData.tag}</span>
             <span className="text-primary-gray_colors">{formatDistance(new Date(commentData.metadata.timestamp), new Date())}</span>
           </div>
           <div className="ml-1 cursor-pointer">
             <div className="items-center text-black overflow-hidden" onClick={(e) => loadThread(e, commentData)}>
               {commentData.text}
               {/* Created parent class vs using comment again to prevent issues with recursive calls */}
               {!noParent && <Parent commentId={commentData.pid}/>}
             </div>
             <ul className="flex justify-between mt-2">
               <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-reply group cursor-pointer">
                 <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-reply_hover">
                   <Reply/>
                 </div>
                 <span>{commentData.metadata.replies}</span>
               </li>

               <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-retweet group cursor-pointer">
                 <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primay-retweet_hover cursor-pointer">
                   <Retweet/>
                 </div>
                 <span>{commentData.metadata.retweets}</span>
               </li>

               <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-like group cursor-pointer">
                 <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-like_hover cursor-pointer" onClick={(e) => updateLikesCb(e)}>
                   <Like/>
                 </div>
                 <span>{commentData.metadata.likes}</span>
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
       </div>}
    </>
  );
};
