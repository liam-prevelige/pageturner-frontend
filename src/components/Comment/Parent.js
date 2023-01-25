import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getProfile} from '../../api';

export const Parent = ({commentData}) => {
  const navigate = useNavigate();

  const [parentProfileData, setProfileData] = useState({
    name: 'whatever',
  });

  const getUserData = async (uid) => {
    const profile = await getProfile(uid);
    setProfileData(profile);
  };

  useEffect(() => {
    getUserData(commentData.uid);
  }, []);

  const loadParentThread = (e, clickedCommentData) => {
    e.stopPropagation(); // otherwise comment component registers a click as it's own
    const path = `/thread?commentId=${clickedCommentData.commentId}`;
    navigate(path);
  };

  const loadUserProfile = (e, uid) => {
    e.stopPropagation();
    const path = `/profile?uid=${uid}`;
    navigate(path);
  };

  return (
    <>
      <div className='flex space-x-3 px-4 py-3 mt-2 rounded border-primary-container_border_color bg-slate-200'>
        <div className="flex-1">
          <div className="flex items-center text-sm space-x-2 cursor-pointer" onClick={(e) => loadUserProfile(e, parentProfileData._id)}>
            <span className="ml-1 font-bold text-black">{parentProfileData.name}</span>
            <span className="ml-2 text-primary-gray_colors">@{parentProfileData.tag}</span>
            <span className="text-primary-gray_colors">2h</span>
          </div>
          <div className="ml-1 cursor-pointer" onClick={(e) => loadParentThread(e, commentData)}>
            <div className="items-center text-black overflow-hidden">
              {commentData.text}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
