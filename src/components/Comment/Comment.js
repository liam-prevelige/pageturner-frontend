import {React, useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Share} from '../../assets/Icons';
import {Parent} from './Parent';
import {getProfile, getComment, updateLikes, updateBookmarks, postNotification, deleteComment} from '../../api';
import ReactLoading from 'react-loading';
import {formatDistance} from 'date-fns';
import {FaHeart, FaRegHeart, FaRegComment, FaBookmark, FaRegBookmark, FaTrash, FaEdit} from 'react-icons/fa';
import {Bookshelf} from '../ProfilePage/Bookshelf';
import {IndividualBookDisplay} from './IndividualBookDisplay';
import {Rating} from '@mui/material';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export const Comment = ({comment, commentId, noParent, isMyProfile}) => {
  const navigate = useNavigate();
  const {clubId} = useParams();
  const myProfile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [profileData, setProfileData] = useState(null);
  const [commentData, setCommentData] = useState(comment);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasParentComment, setHasParentComment] = useState(false);
  const [hasParentBookshelf, setHasParentBookshelf] = useState(false);
  const [hasParentBook, setHasParentBook] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [originalCommentData, setOriginalCommentData] = useState(null);
  const [isDeleted, setIsDeleted] = useState(!comment && !commentId);
  const [footerOpen, setFooterOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadThread = (e, clickedCommentData) => {
    e.stopPropagation();
    const path = clubId ? `/thread/${clubId}/${clickedCommentData._id}` : `/thread/${clickedCommentData._id}`;
    navigate(path);
  };

  useEffect(() => {
    if (noParent || !commentData || !commentData.pid) return;
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
    // We should already have the comment info from props
    if (commentData) {
      setProfileData(commentData.profile);
      if (myProfile != null) {
        setIsLiked(myProfile.likedPosts && myProfile.likedPosts.includes(commentData._id));
        setIsBookmarked(myProfile.bookmarks && myProfile.bookmarks.includes(commentData._id));
      }
      return;
    };

    // This should only run if we don't have it for some reason
    if (!cId) return;
    // Turn on loading state while waiting for API
    setProfileData(null);
    setCommentData(null);
    const comment = await getComment(cId);
    if (!comment) {
      setIsDeleted(true);
      return;
    }
    const profile = await getProfile(comment.uid);
    setProfileData(profile);
    setCommentData(comment);
    if (myProfile != null) {
      setIsLiked(myProfile.likedPosts && myProfile.likedPosts.includes(comment._id));
      setIsBookmarked(myProfile.bookmarks && myProfile.bookmarks.includes(comment._id));
    }
  };

  const updateLikesCb = async (e) => {
    e.stopPropagation();
    if (!myProfile) return;
    if (!myProfile.likedPosts) myProfile.likedPosts = [];
    await updateLikes(commentData._id); // Would be better if this returned the updated likedPosts array
    // Convert userLikedPosts to string array for index of
    const index = myProfile.likedPosts.indexOf(commentData._id);
    const changedComment = commentData;
    if (index > -1) {
      myProfile.likedPosts.splice(index, 1);
      changedComment.metadata.likes --;
    } else {
      myProfile.likedPosts.push(commentData._id);
      changedComment.metadata.likes ++;
      await postNotification(commentData.uid, commentData._id, myProfile.tag, false, 'like');
    }
    setCommentData(changedComment);
    setIsLiked(myProfile.likedPosts.includes(commentData._id));
    sessionStorage.setItem('profile', JSON.stringify(myProfile));
  };

  const updateBookmarksCb = async (e) => {
    e.stopPropagation();
    if (!myProfile) return;
    const updatedBookmarks = await updateBookmarks(commentData._id);
    myProfile.bookmarks = updatedBookmarks;
    setIsBookmarked(myProfile.bookmarks.includes(commentData._id));
    sessionStorage.setItem('profile', JSON.stringify(myProfile));
  };

  const loadUserProfile = (uid) => {
    const path = `/profile/${uid}`;
    navigate(path);
  };

  useEffect(() => {
    getData(commentId);
  }, [commentId]);

  const deleteCommentCb = () => {
    setIsEdited(true);
    setOriginalCommentData(commentData);
    setIsDeleted(true);
  };

  const onSaveEdit = async () => {
    await deleteComment(originalCommentData._id);
    setProfileData(null);
    setIsEdited(false);
    setFooterOpen(false);
  };

  const onCancelEdit = () => {
    setIsEdited(false);
    setCommentData(originalCommentData);
    setFooterOpen(false);
    setIsDeleted(false);
  };

  const handleEditCb = (e) => {
    e.stopPropagation();
    setFooterOpen(!footerOpen);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <>
      {!isDeleted &&
      <div>
        {!(profileData && commentData) ? <ReactLoading type="spin" color="black" /> :
        <div className='flex flex-row space-x-3 px-4 py-3 border-primary-container_border_color'>
          <img src={profileData.profilePicture} className="cursor-pointer w-11 h-11 rounded-full" onClick={() => loadUserProfile(profileData._id)} />
          <div className="flex flex-col w-full">
            <div className="flex cursor-pointer" onClick={() => loadUserProfile(profileData._id)}>
              <div className="flex flex-row justify-between text-sm w-full">
                <div className="flex flex-row space-x-2">
                  <span className="ml-1 font-bold text-black">{profileData.name}</span>
                  <span className="ml-2 text-primary-gray_colors">@{profileData.tag}</span>
                  <span className="text-primary-gray_colors">• {formatDistance(new Date(commentData.metadata.timestamp), new Date())} ago</span>
                </div>
                <div className="flex flex-row align-text-end justify-end align-end">
                  {myProfile && commentData && commentData.uid === myProfile._id && <FaEdit className="w-6 h-4 text-green-500" onClick={(e) => handleEditCb(e)}/>}
                </div>
              </div>
            </div>
            <div className="ml-1 cursor-pointer">
              <div className="items-center text-black overflow-hidden flex-wrap max-w-xl" onClick={(e) => loadThread(e, commentData)}>
                {commentData.rating && <div className="mt-2">
                  <Rating
                    name="read-only"
                    readOnly
                    value={commentData.rating || 0}
                  />
                </div>}
                {commentData.subtext && <div className="text-sm italic text-primary-gray_colors">{commentData.subtext}</div>}
                {commentData.text}
                {/* Created parent class vs using comment again to prevent issues with recursive calls */}
                {hasParentComment && <Parent className="max-w-xl" comment={commentData.parent}/>}
                {hasParentBookshelf && <div className='rounded bg-slate-200 mb-3 mt-3 p-2 max-w-xl'><Bookshelf bookshelfId={commentData.pid}/></div>}
                {hasParentBook && <div className='rounded bg-slate-200 mb-3 mt-3 p-2 max-w-xl'><IndividualBookDisplay bid={commentData.pid}/></div>}
              </div>

              <ul className="flex justify-between mt-2">
                <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-like group cursor-pointer">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-like_hover cursor-pointer" onClick={(e) => updateLikesCb(e)}>
                    {isLiked && <FaHeart className="fill-primary-like stroke-2 w-5 h-5"/>}
                    {!isLiked && <FaRegHeart className="w-5 h-5"/>}
                  </div>
                  <span>{commentData.metadata.likes}</span>
                </li>

                <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-reply group cursor-pointer" onClick={(e) => loadThread(e, commentData)}>
                  <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-reply_hover">
                    <FaRegComment className="w-5 h-5"/>
                  </div>
                  <span>{commentData.metadata.replies}</span>
                </li>

                <li className="flex items-center text-sm space-x-0 text-primary-gray_colors hover:text-primary-retweet group cursor-pointer">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-retweet_hover" onClick={(e) => updateBookmarksCb(e)}>
                    {isBookmarked && <FaBookmark className="fill-primary-retweet w-5 h-5"/>}
                    {!isBookmarked && <FaRegBookmark className="w-5 h-5"/>}
                  </div>
                </li>

                <li className="flex items-center text-sm space-x-0 text-primary-gray_colors group cursor-pointer">
                  <div className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 group-hover:bg-primary-tweets_hover_colors1 cursor-pointer">
                    <CopyToClipboard text={`https://pageturner.herokuapp.com/thread/${commentData._id}`} onCopy={() => setCopied(true)}>
                      <button>{copied ? <div className="m-2">Link Copied</div> : <Share />}</button>
                    </CopyToClipboard>
                  </div>
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>}
      </div>}
      {footerOpen && <div className="flex justify-center -mt-1 mb-3">
        {isEdited ?
        <div>
          <div className="text-sm italic p-3">
            Post Deleted
          </div>
          <div>
            <button className="text-sm font-bold text-green-500 rounded-full border-2 border-green-500 transform transition-colors duration-200 hover:bg-green-500 hover:text-white pt-1 pb-1 pl-2 pr-2" onClick={onSaveEdit}>Save</button>
            <button className="ml-3 text-sm font-bold text-slate-400 rounded-full border-2 border-slate-400 transform transition-colors duration-200 hover:bg-slate-400 hover:text-white pt-1 pb-1 pl-2 pr-2" onClick={onCancelEdit}>Cancel</button>
          </div>
        </div> :
               <button className="flex inline-block p-2 rounded-full bg-red-400" onClick={deleteCommentCb}>
                 <FaTrash className="inline-block h-full text-white align-middle align-text-middle"/>
               </button>}
      </div>}
    </>
  );
};
