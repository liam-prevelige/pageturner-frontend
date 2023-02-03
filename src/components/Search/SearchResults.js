import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getProfile} from '../../api';

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

export const BookshelfSearchResult = ({bookshelfInfo}) => {
  const navigate = useNavigate();

  const [userInfo, setUser] = useState(null);

  const loadUserProfile = (uid) => {
    const path = `/profile?uid=${uid}`;
    navigate(path);
  };

  const loadBookshelf = (id) => {
    // TODO fix this path
    const path = `/profile?id=${id}`;
    navigate(path);
  };

  const getUser = async (uid) => {
    if (!uid) return;
    setUser(null);
    const profile = await getProfile(uid);
    setUser(profile);
  };

  useEffect(() => {
    getUser(bookshelfInfo.ownerId);
  }, [bookshelfInfo]);

  return (
    (userInfo != null) && (<div className='flex space-x-3 px-4 py-3 border-primary-container_border_color'>
      <img src={userInfo.profilePicture} className="cursor-pointer w-11 h-11 rounded-full" onClick={() => loadUserProfile(userInfo._id)} />
      <div className="flex-1">
        <div className="flex items-center text-sm space-x-2 cursor-pointer" onClick={() => loadBookshelf(bookshelfInfo._id)}>
          <span className="ml-1 font-bold text-black">{bookshelfInfo.name}</span>
          <span className="ml-2 text-primary-gray_colors">@{userInfo.tag}</span>
        </div>
      </div>
    </div>)
  );
};

export const GroupSearchResult = (groupInfo) => {
  const navigate = useNavigate();

  const loadGroup = (gid) => {
    const path = `/group-profile?id=${gid}`;
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

export const BookSearchResult = ({bookInfo}) => {
  const navigate = useNavigate();


  const loadBook = (uid) => {
    // TODO fix this path
    const path = `/profile?id=${uid}`;
    navigate(path);
  };

  return (
    <div className='flex space-x-3 px-4 py-3 border-primary-container_border_color'>
      <img src={bookInfo.volumeInfo.imageLinks.smallThumbnail} className="cursor-pointer w-11 h-11" onClick={() => loadBook(bookInfo.id)} />
      <div className="flex-1">
        <div className="flex items-center text-sm space-x-2 cursor-pointer" onClick={() => loadBook(bookInfo.id)}>
          <span className="ml-1 font-bold text-black">{bookInfo.volumeInfo.title}</span>
          <span className="ml-2 font-bold text-black">by {bookInfo.volumeInfo.authors[0]}</span>
        </div>
      </div>
    </div>
  );
};
