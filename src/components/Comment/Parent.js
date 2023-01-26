import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getProfile} from '../../api';
import {getComment} from '../../api';
import ReactLoading from 'react-loading';

export const Parent = ({commentId}) => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [commentData, setCommentData] = useState(null);

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

  useEffect(() => {
    getData(commentId);
  }, [commentId]);

  const loadParentThread = (e, clickedCommentData) => {
    e.stopPropagation(); // otherwise comment component registers a click as it's own
    const path = `/thread/${clickedCommentData._id}`;
    navigate(path);
  };

  const loadUserProfile = (e, uid) => {
    e.stopPropagation();
    const path = `/profile?uid=${uid}`;
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
            <div className="items-center text-black overflow-hidden">
              {commentData.text}
            </div>
          </div>
        </div>
      </div>)}
    </>
  );
};
