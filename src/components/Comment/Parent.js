import {React} from 'react';
import {useNavigate} from 'react-router-dom';

export const Parent = ({commentData}) => {
  const navigate = useNavigate();

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
            <span className="ml-1 font-bold text-black">{commentData.displayName}</span>
            <span className="ml-2 text-primary-gray_colors">@{commentData.username}</span>
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
