import {React, useState, useRef, useEffect} from 'react';

import {BackNav} from '../BackNav/BackNav';
import {ProfileTabs} from './ProfileTabs';
import {FaFileUpload} from 'react-icons/fa';
import {
  updateProfile,
  getProfile,
  addFollower,
  removeFollower,
  getFollowers,
  getFollowing,
} from '../../api';
import {Auth} from '../Auth/Auth';

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
  const search = window.location.search;
  const queryParams = new URLSearchParams(search);
  const isMyProfile = !queryParams.has('uid');
  const storedProfile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const fakeProfile = {
    id: 1,
    tag: 'barackobama',
    name: 'Barack Obama',
    bio: 'Hey there, it\'s Barack. Former POTUS, dad, and grandfather. I love books, wrote a couple (you may have heard of \'em), and believe in the power of stories to change the world. Let\'s chat about what we\'re reading!',
    friends: Array.from(Array(9473).keys()),
    following: Array.from(Array(891).keys()),
    followers: Array.from(Array(891).keys()),
    profilePicture: 'https://mastersofscale.com/wp-content/uploads/sites/2/2021/05/barack_obama-1.jpg',
    cover: 'https://www.penguinrandomhouse.ca/sites/default/files/2021-07/obamapicks-Summer2021-Hero.jpg',
  };

  const [profile, setProfile] = useState((isMyProfile && storedProfile) ? storedProfile : fakeProfile);

  const retrieveProfileFromUid = async () => {
    const uid = queryParams.get('uid');
    const retrievedProfile = await getProfile(uid);
    if (retrievedProfile) {
      const followers = await getFollowers(uid);
      retrievedProfile.followers = followers;
      const following = await getFollowing(uid);
      retrievedProfile.following = following;
      setProfile(retrievedProfile);
    }
  };

  const updateSessionProfile = async () => {
    if (!storedProfile) {
      return;
    }
    const retrievedProfile = await getProfile(storedProfile._id);
    if (retrievedProfile) {
      sessionStorage.setItem('profile', JSON.stringify(retrievedProfile));
      storedProfile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
      const followers = await getFollowers(uid);
      retrievedProfile.followers = followers;
      const following = await getFollowing(uid);
      retrievedProfile.following = following;
      setProfile(retrievedProfile);
    }
  };

  useEffect(() => {
    if (!isMyProfile) {
      retrieveProfileFromUid();
    } else {
      updateSessionProfile();
    }
  }, []);

  const [newProfile, setNewProfile] = useState(profile);
  const [isEditMode, setIsEditMode] = useState(false);

  const coverPicInput = useRef(null);
  const profilePicInput = useRef(null);

  const handleFollowUser = async () => {
    const uid = queryParams.get('uid');
    await addFollower(uid);
    window.location.reload();
  };

  const handleUnfollowUser = async () => {
    const uid = queryParams.get('uid');
    await removeFollower(uid);
    window.location.reload();
  };

  const handleOpenFollowersModal = async () => {
    const followers = await getFollowers(profile._id);
    profile.followers = followers;
    setShowFollowersModal(true);
  };

  const handleOpenFollowingModal = async () => {
    const following = await getFollowing(profile._id);
    profile.following = following;
    setShowFollowingModal(true);
  };

  const handleEditProfile = async () => {
    if (isEditMode) {
      let updatedProfile = null;
      updatedProfile = await updateProfile(newProfile);
      sessionStorage.setItem('profile', JSON.stringify(updatedProfile));
      setNewProfile(updatedProfile);
      window.location.reload();
    } else {
      setNewProfile(profile);
    }
    setIsEditMode(!isEditMode);
  };

  const handleNameChange = (e) => {
    setNewProfile({...newProfile, name: e.target.value});
  };

  const handleTagChange = (e) => {
    setNewProfile({...newProfile, tag: e.target.value});
  };

  const handleDescriptionChange = (e) => {
    setNewProfile({...newProfile, description: e.target.value});
  };

  // TODO: Use variable to remove duplicate code for both images
  const handleCoverPicChange = (newImage) => {
    // Convert image to base64 encoded binary data and save in newProfile
    const file = newImage;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setNewProfile({...newProfile, cover: base64Image});
    };
    reader.readAsDataURL(file);
  };

  const handleProfilePicChange = (newImage) => {
    // Convert image to base64 encoded binary data and save in newProfile
    const file = newImage;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setNewProfile({...newProfile, profilePicture: base64Image});
    };
    reader.readAsDataURL(file);
  };

  const triggerClick = (input) => {
    input.current.click();
  };

  const renderEditFollow = () => {
    if (profile) {
      if (isMyProfile) {
        return (
          <div className='flex flex-col'>
            <button className="mt-3 mr-3 text-primary-button font-bold rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white" onClick={handleEditProfile}>
              {isEditMode ? 'Save Changes' : 'Edit Profile'}
            </button>
            {profile && <div className="flex flex-row justify-end mt-1">
              <Auth triggerReload = {() => {
                reloadPageFunc();
              }}/>
            </div>}
          </div>
        );
      } else {
        if (!profile.followers.includes(storedProfile._id) && !profile.followers.some((e) => String(e._id) === String(storedProfile._id))) {
          return (
            <button className="mt-3 mr-3 text-primary-button rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white" onClick={handleFollowUser}>
              Follow
            </button>
          );
        } else {
          return (
            <button className="mt-3 mr-3 text-red-500 rounded-full shadow-md py-2 px-4 border-2 border-red-500 transform transition-colors duration-500 hover:bg-red-500 hover:text-white" onClick={handleUnfollowUser}>
              Unfollow
            </button>
          );
        }
      }
    }


    {profile &&
      <div className="flex flex-col float-right font-bold">
        {isMyProfile ?
        (<>
          <button className="mt-3 mr-3 text-primary-button rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white" onClick={handleEditProfile}>
            {isEditMode ? 'Save Changes' : 'Edit Profile'}
          </button>
        </>) :
        (<button className="mt-3 mr-3 text-primary-button rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white" onClick={handleFollowUser}>
          Follow
        </button>)}
      </div>;}
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl mt-1 flex">
      <main className="flex flex-col">
        <>
          <div className="profile">
            <div className="profile-info">
              <div className="profile-head">
                <BackNav profile={profile}/>
              </div>

              {!isEditMode ? <img className="h-64 w-full object-cover" src={profile.cover} /> :
                    (
                      <div className="h-64 w-full object-cover">
                        <img className="h-64 w-full object-cover" src={newProfile.cover} />

                        <div className="relative flex flex-row justify-center -top-64 h-64 object-center w-full object-cover bg-slate-300 bg-opacity-30" onClick={() => triggerClick(coverPicInput)}>
                          <div className="flex flex-col justify-center">
                            <FaFileUpload className="h-20 w-20"/>
                          </div>
                        </div>
                        <input
                          type="file"
                          className='invisible'
                          ref={coverPicInput}
                          onChange={(event) => {
                            handleCoverPicChange(event.target.files[0]);
                          }}
                        />
                      </div>
                    )
              }

              <div className="relative ml-10">
                {!isEditMode ? <img className="rounded-full absolute h-40 w-40 -top-20 border border-4 border-white" src={profile.profilePicture} /> :
                    (
                      <div className="rounded-full absolute h-40 w-40 -top-20 border border-4 border-white">
                        <img className="rounded-full h-40 w-40" src={newProfile.profilePicture} />
                        <div className="relative flex flex-row justify-center -top-40 -ml-1 h-40 w-40 rounded-full object-cover" onClick={() => triggerClick(profilePicInput)}>
                          <div className="flex flex-col rounded-full justify-center">
                            <FaFileUpload className="h-20 w-20"/>
                          </div>
                        </div>
                        <input
                          type="file"
                          className='invisible'
                          ref={profilePicInput}
                          onChange={(event) => {
                            handleProfilePicChange(event.target.files[0]);
                          }}
                        />
                      </div>
                    )
                }
              </div>
              <div className="float-right">
                {renderEditFollow()}
              </div>
              <div id="aboutInfo" className="flex flex-1 flex-col text-black mt-24 ml-5 mr-5">
                {!isEditMode ?
                    <span className="text-xl font-bold">{profile.name}</span> :
                    <input className="text-xl font-bold rounded p-2 text-slate-500 border border-slate-300"
                      type="text"
                      placeholder={profile.name}
                      value={newProfile.name}
                      onChange={handleNameChange}/>
                }
                {!isEditMode ?
                    <span className="text-base text-slate-500">@{profile.tag}</span> :
                    <input className="text-base mt-2 rounded p-2 text-slate-500 border border-slate-300"
                      type="text"
                      placeholder={profile.tag}
                      value={newProfile.tag}
                      onChange={handleTagChange}/>
                }
                {!isEditMode ?
                    <span className="text-base text-black mt-2">{profile.description}</span> :
                    <input className="text-base mt-2 rounded p-2 text-slate-500 border border-slate-300"
                      type="text"
                      placeholder={profile.description}
                      value={newProfile.description}
                      onChange={handleDescriptionChange}/>
                }

                <div className="flex flex-row space-x-5">
                  <button className="text-base text-slate-500 mt-2" type="button" onClick={handleOpenFollowersModal}><strong className="text-black">{profile.followers.length}</strong> Followers</button>
                  <button className="text-base text-slate-500 mt-2" type="button" onClick={handleOpenFollowingModal}><strong className="text-black">{profile.following.length}</strong> Following</button>
                  {showFollowersModal ? (
                    <>
                      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                              <h3 className="text-3xl font=semibold">Followers</h3>
                            </div>
                            <div className="relative p-6 flex-auto">
                              {
                              // eslint-disable-next-line arrow-parens
                                profile.followers.map((user, index) => (
                                // eslint-disable-next-line react/jsx-key
                                  <div key={index}>
                                    <a href={'/profile?uid=' + profile.followers[index]._id} className='flex space-x-3 px-1 py-1 border-primary-container_border_color'>
                                      <img src={profile.followers[index].profilePicture} className="cursor-pointer w-11 h-11 rounded-full" onClick={() => loadUserProfile(profileData._id)} />
                                      <div className="flex-1">
                                        <div className="flex items-center text-sm space-x-2 cursor-pointer" onClick={() => loadUserProfile(profileData._id)}>
                                          <span className="ml-1 font-bold text-black">{profile.followers[index].name}</span>
                                          <span className="ml-2 text-primary-gray_colors">@{profile.followers[index].tag}</span>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                ))
                              }
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => setShowFollowersModal(false)}
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                  {showFollowingModal ? (
                    <>
                      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                              <h3 className="text-3xl font=semibold">Following</h3>
                            </div>
                            <div className="relative p-3 flex-auto">
                              {
                              // eslint-disable-next-line arrow-parens
                                profile.following.map((user, index) => (
                                // eslint-disable-next-line react/jsx-key
                                  <div key={index}>
                                    <a href={'/profile?uid=' + profile.following[index]._id} className='flex space-x-3 px-1 py-1 border-primary-container_border_color'>
                                      <img src={profile.following[index].profilePicture} className="cursor-pointer w-11 h-11 rounded-full" onClick={() => loadUserProfile(profileData._id)} />
                                      <div className="flex-1">
                                        <div className="flex items-center text-sm space-x-2 cursor-pointer" onClick={() => loadUserProfile(profileData._id)}>
                                          <span className="ml-1 font-bold text-black">{profile.following[index].name}</span>
                                          <span className="ml-2 text-primary-gray_colors">@{profile.following[index].tag}</span>
                                        </div>
                                      </div>
                                    </a>
                                  </div>
                                ))
                              }
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                              <button
                                className="text-red-500 background-transparent font-bold uppercase px-2 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                onClick={() => setShowFollowingModal(false)}
                              >
                                Dismiss
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <ProfileTabs uid={profile._id} />
        </>
      </main>
    </div >
  );
};
