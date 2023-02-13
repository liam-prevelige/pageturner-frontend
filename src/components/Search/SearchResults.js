import {React, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {getProfile} from '../../api';
import {BookshelfPopup} from '../BookInfo/BookshelfPopup';

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

  const loadBook = (bid) => {
    // TODO fix this path
    const path = `/book-info?id=${bid}`;
    navigate(path);
  };

  return (
    <>
      <div className='flex space-x-3 px-4 py-3 justify-between border-primary-container_border_color cursor-pointer'>
        <div className="flex flex-row space-x-2" onClick={() => loadBook(bookInfo.id)}>
          {'volumeInfo' in bookInfo && 'imageLinks' in bookInfo.volumeInfo && 'smallThumbnail' in bookInfo.volumeInfo.imageLinks &&
        <div className="flex flex-row space-x-2">
          <img className="h-14 object-scale-down" src={bookInfo.volumeInfo.imageLinks.smallThumbnail} />
          <div className="flex flex-col items-left text-sm space-x-2 h-14 justify-center">
            <span className="ml-1 font-bold text-black">{bookInfo.volumeInfo.title}</span>
            <span className="ml-2 text-black">{bookInfo.volumeInfo.authors[0]}</span>
          </div>
        </div>}
        </div>
        <div>
          <BookshelfPopup bid={bookInfo.id} useIcon={true}/>
        </div>
      </div>
      <div className="border-b m-3 border-slate-300"/>
    </>
  );
};
