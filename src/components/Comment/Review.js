import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Parent} from './Parent';
import {getProfile, getComment} from '../../api';
import ReactLoading from 'react-loading';
import {formatDistance} from 'date-fns';
import {Rating} from '@mui/material';

export const Review = ({commentId, noParent}) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [rating, setRating] = useState(0);

  const getData = async (cId) => {
    if (!cId) return;
    // Turn on loading state while waiting for API
    setProfileData(null);
    setCommentData(null);
    const comment = await getComment(cId);
    const profile = await getProfile(comment.uid);
    setProfileData(profile);
    setCommentData(comment);
    setRating(comment.rating || 0);
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
       <div className='flex space-x-1 px-1 py-3'>
         <img src={profileData.profilePicture} className="cursor-pointer w-11 h-11 rounded-full" onClick={() => loadUserProfile(profileData._id)} />
         <div className="flex flex-col">
           <div className="flex flex-col justify-left text-sm cursor-pointer" onClick={() => loadUserProfile(profileData._id)}>
             <div className="flex flex-row">
               <span className="ml-1 font-bold text-black">{profileData.name}</span>
               <span className="text-primary-gray_colors ml-5">{formatDistance(new Date(commentData.metadata.timestamp), new Date())} ago</span>
             </div>
             <span className="ml-2 text-primary-gray_colors">@{profileData.tag}</span>
           </div>
           <div className="ml-1 cursor-pointer">
             <div className="items-center text-black text-sm overflow-hidden">
               <div className="mt-2">
                 <Rating style={{fontSize: '20px'}}
                   name="read-only"
                   readOnly
                   value={rating}
                 />
               </div>
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
