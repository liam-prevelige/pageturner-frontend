import {React, useState} from 'react';

import {BackNav} from '../BackNav/BackNav';
import {ProfileTabs} from './ProfileTabs';
// export const Banner = styled.div`
//   flex-shrink: 0;
//   width: 100%;
//   height: min(33vw, 199px);
//   background-image: url('https://1.bp.blogspot.com/-lg73Nw76yCc/V9_EnSSngLI/AAAAAAAAWxY/bQtB8s4wWPsvzsac3xZYbP--23d-KugzwCLcB/s1600/StarCIO%2BLess%2BCode.jpg');
//   position: relative;
// `;

// Fake cover: https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg
// Fake profile: https://www.billionsinstitute.com/wp-content/uploads/2014/10/Jennifer-Circle-Headshot-300X300.png

export const ProfilePage = () => {
  const userProfile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];

  const fakeProfile = {
    id: 1,
    tag: 'barackobama',
    name: 'Barack Obama',
    bio: 'Hey there, it\'s Barack. Former POTUS, dad, and grandfather. I love books, wrote a couple (you may have heard of \'em), and believe in the power of stories to change the world. Let\'s chat about what we\'re reading!',
    friends: 1000,
    following: 100,
    profilePicture: 'https://mastersofscale.com/wp-content/uploads/sites/2/2021/05/barack_obama-1.jpg',
    cover: 'https://www.penguinrandomhouse.ca/sites/default/files/2021-07/obamapicks-Summer2021-Hero.jpg',
  };

  const profile = userProfile || fakeProfile;

  return (
    <div className="min-h-screen mx-auto max-w-7xl mt-1 flex">
      <main className="flex flex-col">
        <>
          <div className="profile">
            <div className="profile-info">
              <div className="profile-head">
                <BackNav profile={profile}/>
              </div>
              <img className="h-64 w-full object-cover" src={profile.cover} />

              <div className="relative ml-10">
                <img className="rounded-full absolute h-40 w-40 -top-20 border-4 border-white" src={profile.profilePicture} />
              </div>
              {profile && <div className="flex flex-col float-right font-bold">
                <button className="mt-3 mr-3 text-primary-button rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white">
                  Edit Profile
                </button>
              </div>}

              <div id="aboutInfo" className="flex flex-1 flex-col text-black mt-24 ml-5 mr-5">
                <span className="text-xl font-bold">{profile.name}</span>
                <span className="text-base text-slate-500">@{profile.tag}</span>
                <span className="text-base text-black mt-2">{profile.description}</span>
                <div className="flex flex-row space-x-5">
                  <button className="text-base text-slate-500 mt-2"><strong className="text-black">{profile.friends.length}</strong> Friends</button>
                  <button className="text-base text-slate-500 mt-2"><strong className="text-black">{profile.following.length}</strong> Following</button>
                </div>
              </div>
            </div>
          </div>
          <ProfileTabs />
        </>
      </main>
    </div >
  );
};
