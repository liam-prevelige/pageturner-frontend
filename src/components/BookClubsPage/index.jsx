import {React, useState, useEffect} from 'react';

import {getBookClubs} from '../../api';

export const BookClubsPage = () => {
  const storedProfile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];

  const fakeBookClub = {
    id: '63d054f5374f6dbf32cb8cba',
    banner_picture: 'https://dcmp.org/seriesposterimages/series_4.jpg',
    tag: 'magic.school.bus',
    name: 'Miss Frizzle\'s Classroom',
    description: 'Our class emphasizes experiential learning with our magic school bus, but we also do plenty of reading! Take a look at this school year\'s reading list.',
    members: Array.from(Array(23).keys()),
    admins: Array.from(Array(2).keys()),
    posts: Array.from(Array(104).keys()),
    bookshelves: Array.from(Array(6).keys()),
    creator_id: 'MissFrizzle',
    private: true,
  };

  const [bookClubs, setBookClubs] = useState([]);

  const retrieveBookClubsFromUid = async () => {
    const uid = storedProfile._id;
    const response = await getBookClubs(uid);
    const retrievedBookClubs = response['result'];
    console.log(retrievedBookClubs);
    if (retrievedBookClubs) {
      setBookClubs(retrievedBookClubs);
    } else {
      setBookClubs([fakeBookClub, fakeBookClub, fakeBookClub]);
    }
  };

  useEffect(() => {
    if (storedProfile) {
      retrieveBookClubsFromUid();
    }
  }, []);

  const renderGroups = (bookClubs) => {
    if (storedProfile && bookClubs.length > 0) {
      return (
        bookClubs.map((groupData, index) =>
          (<div key={index}>
            <a href={'/profile?uid=' + groupData._id} className="block rounded overflow-hidden bg-white shadow-lg"> {/** can delete bg-white to get rid of white background, can delete shadow-lg to be less like a card */}
              <img className="w-full h-28 object-none" src={groupData.banner_picture} alt="Group Banner Picture"/>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{groupData.name}</div>
                <p className="text-gray-700 text-base">
                  {groupData.description}
                </p>
              </div>
            </a>
            <div className="border-b ml-3 mr-3 border-slate-300"></div>
          </div>
          ))
      );
    } else if (storedProfile && bookClubs.length == 0) {
      return (<div className="font-bold text-xl mb-2 pt-30">You are not in any book clubs. Join one!</div>);
    } else {
      return (<div className="font-bold text-xl mb-2 pt-30">Sign in or make an account to see your book clubs.</div>);
    }
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl mt-1 flex">
      <div className="bg-slate-100 h-full bg-white pt-10">
        {renderGroups(bookClubs)}
      </div>
    </div>
  );
};
