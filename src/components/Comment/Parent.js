import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getProfile} from '../../api';

export const Parent = ({commentData}) => {
  const navigate = useNavigate();

  console.log('parentData', commentData);
  const [parentProfileData, setProfileData] = useState({
    name: 'whatever',
  });

  const getUserData = async (uid) => {
    const profile = await getProfile(uid);
    console.log('profile', profile);
    setProfileData(profile);
  };

  useEffect(() => {
    console.log('commentData.uid', commentData.uid);
    getUserData(commentData.uid);
  }, []);

  const loadParentThread = (e, clickedCommentData) => {
    e.stopPropagation(); // otherwise comment component registers a click as it's own
    const path = `/thread?commentId=${clickedCommentData.commentId}`;
    navigate(path);
  };

  return (
    <>
      <div className='flex space-x-3 px-4 py-3 mt-2 rounded border-primary-container_border_color bg-slate-200' onClick={(e) => loadParentThread(e, commentData)}>
        <div className="flex-1">
          <div className="flex items-center text-sm space-x-2">
            <span className="ml-1 font-bold text-black">{parentProfileData.name}</span>
            <span className="ml-2 text-primary-gray_colors">@{parentProfileData.tag}</span>
            <span className="text-primary-gray_colors">2h</span>
          </div>
          <div className="ml-1">
            <div className="items-center text-black overflow-hidden">
              {commentData.text}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
