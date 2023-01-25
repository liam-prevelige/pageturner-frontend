import {React} from 'react';

import {useNavigate} from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa';

export const BackNav = ({profile}) => {
  const navigate = useNavigate();
  return (
    <>
      {(window.location.pathname!='/') && (<div className="flex flex-row m-2">
        <button className="flex items-center justify-center ml-3 mr-3 h-9 w-9 justify-center rounded-full transform transition-colors duration-2 hover:bg-slate-300 cursor-pointer" onClick={() => navigate(-1)}><FaArrowLeft/></button>
        {profile && <div className="flex flex-col">
          <span className="text-base text-black font-bold mr-3">{profile.name}</span>
          <span className="text-sm text-slate-700 mr-3">0 Posts</span>
        </div>}
      </div>)}
    </>
  );
};
