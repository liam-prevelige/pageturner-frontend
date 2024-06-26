import {React, useEffect} from 'react';
import ReactGA from 'react-ga';

import {BackNav} from '../BackNav/BackNav';

export const FakeProfilePage = () => {
  const profile = {
    id: 1,
    tag: 'yourtag',
    name: 'Your Name',
    description: 'Welcome to PageTurner! By signing in, you can begin to create your own profile page, complete with bookshelves and posts.',
    friends: Array.from(Array(9473).keys()),
    following: Array.from(Array(891).keys()),
    followers: Array.from(Array(891).keys()),
    profilePicture: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg',
    cover: 'https://cdn-image.staticsfly.com/i/photobooks/WF327823_1-up_make_it_yours.jpg?impolicy=resize&width=960',
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl mt-1 flex">
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
      <div className="absolute left-1/3 ml-16 top-1/3 justify-center align-center text-align-center">
        <div className="bg-slate-300 bg-opacity-90 rounded p-10">
          <div className="relative w-auto my-6 mx-auto">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex p-2 border-b border-gray-300">
                <h3 className="text-lg font-semibold">Sign In with Google to see more from PageTurner!</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
