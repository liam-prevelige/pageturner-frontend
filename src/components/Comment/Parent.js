import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getProfile} from '../../api';
import {getComment} from '../../api';
import ReactLoading from 'react-loading';
import {Bookshelf} from '../ProfilePage/Bookshelf';
import {Rating} from '@mui/material';
import {IndividualBookDisplay} from './IndividualBookDisplay';

export const Parent = ({comment, commentId}) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [commentData, setCommentData] = useState(comment);
  const [hasParentBookshelf, setHasParentBookshelf] = useState(false);
  const [hasParentBook, setHasParentBook] = useState(false);

  const getData = async (cId) => {
    // We should already have the comment info from props
    if (commentData) {
      setProfileData(commentData.profile);
      return;
    };

    if (!cId) return;
    // Turn on loading state while waiting for API
    setProfileData(null);
    setCommentData(null);
    const comment = await getComment(cId);
    if (!comment) return;
    const profile = await getProfile(comment.uid);
    setProfileData(profile);
    setCommentData(comment);
  };

  useEffect(() => {
    getData(commentId);
  }, [commentId]);

  useEffect(() => {
    if (commentData && commentData.ptype && commentData.ptype === 'bookshelf') {
      setHasParentBookshelf(true);
    }
    if (commentData && commentData.ptype && commentData.ptype === 'book') {
      setHasParentBook(true);
    }
  }, [commentData]);

  const loadParentThread = (e, clickedCommentData) => {
    e.stopPropagation(); // otherwise comment component registers a click as it's own
    const path = `/thread/${clickedCommentData._id}`;
    navigate(path);
  };

  const loadUserProfile = (e, uid) => {
    e.stopPropagation();
    const path = `/profile/${uid}`;
    navigate(path);
  };

  return (
    <>
      {!(profileData && commentData) ? <ReactLoading type="spin" color="black" /> :
      (<div className='flex space-x-3 px-4 py-3 mt-2 rounded border-primary-container_border_color bg-slate-200'>
        <div className="flex-1">
          <div className="flex items-center text-sm space-x-2 cursor-pointer" onClick={(e) => loadUserProfile(e, profileData._id)}>
            <span className="ml-1 font-bold text-black">{profileData.name}</span>
            <span className="ml-2 text-primary-gray_colors">@{profileData.tag}</span>
            <span className="text-primary-gray_colors">2h</span>
          </div>
          <div className="ml-1 cursor-pointer" onClick={(e) => loadParentThread(e, commentData)}>
            {commentData.rating && <div className="mt-2">
              <Rating
                name="read-only"
                readOnly
                value={commentData.rating || 0}
              />
            </div>}
            <div className="items-center text-black overflow-hidden">
              {commentData.text}
            </div>
            {hasParentBookshelf && <div className='rounded bg-slate-200 border border-white mb-3 mt-3 p-2'><Bookshelf bookshelfId={commentData.pid}/></div>}
            {hasParentBook && <div className='rounded bg-slate-200 mb-3 mt-3 p-2'><IndividualBookDisplay bid={commentData.pid}/></div>}
          </div>
        </div>
      </div>)}
    </>
  );
};
