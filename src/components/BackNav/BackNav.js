import {React, useState, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa';
import {getPostCount} from '../../api';

export const BackNav = ({profile, type}) => {
  const navigate = useNavigate();
  const [numPosts, setNumPosts] = useState(0);

  const navigateBack = () => {
    navigate(-1);
  };

  const updatePostCount = async () => {
    if (!profile || !type) return;
    const numPosts = await getPostCount(profile._id, type);
    setNumPosts(numPosts);
  };

  useEffect(() => {
    updatePostCount();
  }, [profile]);

  return (
    <>
      {(window.location.pathname!='/') && (<div className="flex flex-row m-2">
        <button className="flex items-center justify-center ml-3 mr-3 h-9 w-9 justify-center rounded-full transform transition-colors duration-2 hover:bg-slate-300 cursor-pointer" onClick={navigateBack}><FaArrowLeft/></button>
        {profile && <div className="flex flex-col">
          <span className="text-base text-black font-bold mr-3">{profile.name}</span>
          <span className="text-sm text-slate-700 mr-3">{numPosts} Posts</span>
        </div>}
      </div>)}
    </>
  );
};
