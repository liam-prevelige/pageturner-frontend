import {React} from 'react';
import {useNavigate} from 'react-router-dom';

export const UserSearchResult = (userInfo) => {
  const navigate = useNavigate();

  const loadUserProfile = (uid) => {
    const path = `/profile?uid=${uid}`;
    navigate(path);
  };

  return (
    <div className='flex space-x-3 px-4 py-3 border-primary-container_border_color'>
      <img src={userInfo.userInfo.profilePicture} className="cursor-pointer w-11 h-11 rounded-full" onClick={() => loadUserProfile(userInfo.userInfo._id)} />
      <div className="flex-1">
        <div className="flex items-center text-sm space-x-2 cursor-pointer" onClick={() => loadUserProfile(userInfo.userInfo._id)}>
          <span className="ml-1 font-bold text-black">{userInfo.userInfo.name}</span>
          <span className="ml-2 text-primary-gray_colors">@{userInfo.userInfo.tag}</span>
        </div>
      </div>
    </div>
  );
};

export const BookshelfSearchResult = () => {
  return (
    <div>
      Hello
    </div>
  );
};

export const GroupSearchResult = (groupInfo) => {
  const navigate = useNavigate();

  const loadGroup = (gid) => {
    // TODO fix the path below
    const path = `/group?id=${gid}`;
    navigate(path);
  };

  return (
    <div className='flex space-x-3 px-4 py-3 border-primary-container_border_color'>
      <img src={groupInfo.groupInfo.banner_picture} className="cursor-pointer w-11 h-11 rounded-full" onClick={() => loadGroup(groupInfo.groupInfo._id)} />
      <div className="flex-1">
        <div className="flex items-center text-sm space-x-2 cursor-pointer" onClick={() => loadGroup(groupInfo.groupInfo._id)}>
          <span className="ml-1 font-bold text-black">{groupInfo.groupInfo.name}</span>
        </div>
      </div>
    </div>
  );
};
