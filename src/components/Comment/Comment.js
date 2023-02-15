import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Reply, Retweet, Share} from '../../assets/Icons';
import {Parent} from './Parent';
import {getProfile, getComment, updateLikes} from '../../api';
import ReactLoading from 'react-loading';
import {formatDistance} from 'date-fns';
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import {Bookshelf} from '../ProfilePage/Bookshelf';
import {IndividualBookDisplay} from './IndividualBookDisplay';
import {Rating} from '@mui/material';

export const Comment = ({commentId, noParent}) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [hasParentComment, setHasParentComment] = useState(false);
  const [hasParentBookshelf, setHasParentBookshelf] = useState(false);
  const [hasParentBook, setHasParentBook] = useState(false);

  const myProfile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const loadThread = (e, clickedCommentData) => {
    e.stopPropagation();
    const path = `/thread/${clickedCommentData._id}`;
    navigate(path);
  };

  useEffect(() => {
    if (noParent || !commentData || !commentData.pid) return;
    console.log(commentData);
    if (commentData.ptype && commentData.ptype === 'bookshelf') {
      setHasParentBookshelf(true);
      setHasParentComment(false);
      setHasParentBook(false);
    } else if (commentData.ptype && commentData.ptype === 'book') { // first check is for existing comments without ptype
      setHasParentBook(true);
      setHasParentComment(false);
      setHasParentBookshelf(false);
    } else if (!commentData.ptype || commentData.ptype === 'comment') { // first check is for existing comments without ptype
      setHasParentComment(true);
      setHasParentBookshelf(false);
      setHasParentBook(false);
    }
  }, [commentData]);

  const getData = async (cId) => {
    if (!cId) return;
    // Turn on loading state while waiting for API
    setProfileData(null);
    setCommentData(null);
    const comment = await getComment(cId);
    if (!comment) return;
    console.log(cId);
    const profile = await getProfile(comment.uid);
    setProfileData(profile);
    setCommentData(comment);
    if (myProfile != null) {
      setIsLiked(myProfile.likedPosts && myProfile.likedPosts.includes(comment._id));
    }
  };

  const updateLikesCb = async (e) => {
    e.stopPropagation();
    if (!myProfile || !myProfile.likedPosts) return;
    await updateLikes(commentData._id); // TODO: Actually get the comment data from the API
    // Convert userLikedPosts to string array for index of
    const index = myProfile.likedPosts.indexOf(commentData._id);
    const changedComment = commentData;
    if (index > -1) {
      myProfile.likedPosts.splice(index, 1);
      changedComment.metadata.likes --;
    } else {
      myProfile.likedPosts.push(commentData._id);
      changedComment.metadata.likes ++;
    }
    setCommentData(changedComment);
    setIsLiked(myProfile.likedPosts.includes(commentData._id));
    sessionStorage.setItem('profile', JSON.stringify(myProfile));
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
               {commentData.rating && <div className="mt-2">
                 <Rating
                   name="read-only"
                   readOnly
                   value={commentData.rating || 0}
                 />
               </div>}
               {commentData.text}
               {/* Created parent class vs using comment again to prevent issues with recursive calls */}
               {hasParentComment && <Parent commentId={commentData.pid}/>}
               {hasParentBookshelf && <div className='rounded bg-slate-200 mb-3 mt-3 p-2'><Bookshelf bookshelfId={commentData.pid}/></div>}
               {hasParentBook && <div className='rounded bg-slate-200 mb-3 mt-3 p-2'><IndividualBookDisplay bid={commentData.pid}/></div>}
             </div>

             <ul className="flex justify-between mt-2">
               <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-like group cursor-pointer">
                 <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-like_hover cursor-pointer" onClick={(e) => updateLikesCb(e)}>
                   {isLiked && <FaHeart className="fill-primary-like w-5 h-5"/>}
                   {!isLiked && <FaRegHeart className="stroke-1 w-5 h-5"/>}
                 </div>
                 <span>{commentData.metadata.likes}</span>
               </li>

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
