import {React} from 'react';

import {useNavigate} from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa';

export const BackNav = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row m-2">
        <button className="ml-3 mr-5" onClick={() => navigate(-1)}><FaArrowLeft/></button>
        <div className="flex flex-col">
          <span className="text-base text-black font-bold mr-3">Adem Can Certel</span>
          <span className="text-sm text-slate-700 mr-3">10 posts</span>
        </div>
      </div>
    </>
  );
};
