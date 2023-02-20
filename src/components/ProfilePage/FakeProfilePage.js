import {React, useEffect} from 'react';
import ReactGA from 'react-ga';

import {BackNav} from '../BackNav/BackNav';

export const FakeProfilePage = () => {
  const profile = {
    id: 1,
    tag: 'barackobama',
    name: 'Barack Obama',
    description: 'Hey there, it\'s Barack. Former POTUS, dad, and grandfather. I love books, wrote a couple (you may have heard of \'em), and believe in the power of stories to change the world. Let\'s chat about what we\'re reading!',
    friends: Array.from(Array(9473).keys()),
    following: Array.from(Array(891).keys()),
    followers: Array.from(Array(891).keys()),
    profilePicture: 'https://mastersofscale.com/wp-content/uploads/sites/2/2021/05/barack_obama-1.jpg',
    cover: 'https://www.penguinrandomhouse.ca/sites/default/files/2021-07/obamapicks-Summer2021-Hero.jpg',
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
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
                  <img className="rounded-full absolute h-40 w-40 -top-20 border border-4 border-white" src={profile.profilePicture} />
                </div>
                <div id="aboutInfo" className="flex flex-1 flex-col text-black mt-24 ml-5 mr-5">
                  <span className="text-xl font-bold">{profile.name}</span>
                  <span className="text-base text-slate-500">@{profile.tag}</span>
                  <span className="text-base text-black mt-2">{profile.description}</span>

                  <div className="flex flex-row space-x-5">
                    <button className="text-base text-slate-500 mt-2" type="button"><strong className="text-black">{profile.followers.length}</strong> Followers</button>
                    <button className="text-base text-slate-500 mt-2" type="button"><strong className="text-black">{profile.following.length}</strong> Following</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        </main>
      </div >
    </>
  );
};
