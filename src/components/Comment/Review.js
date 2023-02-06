import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Parent} from './Parent';
import {getProfile, getComment} from '../../api';
import ReactLoading from 'react-loading';
import {formatDistance} from 'date-fns';

export const Review = ({commentId, noParent}) => {
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

  const loadUserProfile = (uid) => {
    const path = `/profile?uid=${uid}`;
    navigate(path);
  };

  useEffect(() => {
    getData(commentId);
  }, [commentId]);

  {/* <div class="flex flex-wrap">
  <div class="w-1/2 p-5">
    <!-- First column content goes here -->
  </div>
  <div class="w-1/2 p-5">
    <!-- Second column content goes here -->
  </div>
</div> */}

  return (
    <>
      {!(profileData && commentData) ? <ReactLoading type="spin" color="black" /> :
       <div className='flex space-x-1 px-1 py-3'>
         <img src={profileData.profilePicture} className="cursor-pointer w-7 h-7 rounded-full" onClick={() => loadUserProfile(profileData._id)} />
         <div className="flex-1 font-sm">
           <div className="flex items-center text-xs space-x-2 cursor-pointer" onClick={() => loadUserProfile(profileData._id)}>
             <span className="ml-1 font-bold text-xs">{profileData.name}</span>
             <span className="text-primary-gray_colors">{formatDistance(new Date(commentData.metadata.timestamp), new Date())}</span>
           </div>
           <div className="ml-1 cursor-pointer">
             <div className="items-center text-black text-sm overflow-hidden" onClick={(e) => loadThread(e, commentData)}>
               {commentData.text}
               {/* Created parent class vs using comment again to prevent issues with recursive calls */}
               {!noParent && commentData.pid && <Parent commentId={commentData.pid}/>}
             </div>
           </div>
         </div>
       </div>}
    </>
  );
};
