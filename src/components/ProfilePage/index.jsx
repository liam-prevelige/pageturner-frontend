import {React, useState, useRef, useEffect} from 'react';
import ReactGA from 'react-ga';

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
  postNotification,
} from '../../api';
import {Auth} from '../Auth/Auth';
import {FakeProfilePage} from './FakeProfilePage';
import {FollowModal} from './FollowModal';

export const ProfilePage = () => {
  const search = window.location.search;
  const queryParams = new URLSearchParams(search);
  const storedProfile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];

  if (!storedProfile && !queryParams.get('uid')) {
    return (<FakeProfilePage />);
  }

  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const isMyProfile = !queryParams.has('uid') || (storedProfile && queryParams.get('uid') === storedProfile._id);
  const [profile, setProfile] = useState((isMyProfile && storedProfile) ? storedProfile : null);
  const [newEditedProfile, setNewEditedProfile] = useState(profile);
  const [isEditMode, setIsEditMode] = useState(false);

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

  const retrieveProfileFromStorage = async () => {
    if (!storedProfile) {
      return;
    }
    const retrievedProfile = await getProfile(storedProfile._id);
    if (retrievedProfile) {
      sessionStorage.setItem('profile', JSON.stringify(retrievedProfile));
      const followers = await getFollowers(storedProfile._id);
      retrievedProfile.followers = followers;
      const following = await getFollowing(storedProfile._id);
      retrievedProfile.following = following;
      setProfile(retrievedProfile);
    }
  };

  useEffect(() => {
    if (!isMyProfile) {
      retrieveProfileFromUid();
    } else {
      retrieveProfileFromStorage();
    }
    ReactGA.pageview(window.location.pathname);
  }, [queryParams]);

  const coverPicInput = useRef(null);
  const profilePicInput = useRef(null);

  const handleFollowUser = async () => {
    const uid = queryParams.get('uid');
    await addFollower(uid);
    await postNotification(uid, null, storedProfile._id, false, 'follow');
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
      updatedProfile = await updateProfile(newEditedProfile);
      sessionStorage.setItem('profile', JSON.stringify(updatedProfile));
      setNewEditedProfile(updatedProfile);
      window.location.reload();
    } else {
      setNewEditedProfile(profile);
    }
    setIsEditMode(!isEditMode);
  };

  const handleNameChange = (e) => {
    setNewEditedProfile({...newEditedProfile, name: e.target.value});
  };

  const handleTagChange = (e) => {
    setNewEditedProfile({...newEditedProfile, tag: e.target.value});
  };

  const handleDescriptionChange = (e) => {
    setNewEditedProfile({...newEditedProfile, description: e.target.value});
  };

  // TODO: Use variable to remove duplicate code for both images
  const handleCoverPicChange = (newImage) => {
    // Convert image to base64 encoded binary data and save in newEditedProfile
    const file = newImage;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setNewEditedProfile({...newEditedProfile, cover: base64Image});
    };
    reader.readAsDataURL(file);
  };

  const handleProfilePicChange = (newImage) => {
    // Convert image to base64 encoded binary data and save in newEditedProfile
    const file = newImage;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setNewEditedProfile({...newEditedProfile, profilePicture: base64Image});
    };
    reader.readAsDataURL(file);
  };

  const triggerClick = (input) => {
    input.current.click();
  };

  const handleResetStates = () => {
    setShowFollowersModal(false);
    setShowFollowingModal(false);
  };

  const renderEditFollow = () => {
    if (!profile) {
      return null;
    }
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
    } else if (storedProfile) {
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
  };

  return (
    <>
      {profile && (<div className="min-h-screen mx-auto max-w-7xl mt-1 flex" onClick={handleResetStates}>
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
                        <img className="h-64 w-full object-cover" src={newEditedProfile.cover} />

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
                        <img className="rounded-full h-40 w-40" src={newEditedProfile.profilePicture} />
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
                      value={newEditedProfile.name}
                      onChange={handleNameChange}/>
                  }
                  {!isEditMode ?
                    <span className="text-base text-slate-500">@{profile.tag}</span> :
                    <input className="text-base mt-2 rounded p-2 text-slate-500 border border-slate-300"
                      type="text"
                      placeholder={profile.tag}
                      value={newEditedProfile.tag}
                      onChange={handleTagChange}/>
                  }
                  {!isEditMode ?
                    <span className="text-base text-black mt-2">{profile.description}</span> :
                    <input className="text-base mt-2 rounded p-2 text-slate-500 border border-slate-300"
                      type="text"
                      placeholder={profile.description}
                      value={newEditedProfile.description}
                      onChange={handleDescriptionChange}/>
                  }

                  <div className="flex flex-row space-x-5">
                    <button className="text-base text-slate-500 mt-2" type="button" onClick={handleOpenFollowersModal}><strong className="text-black">{profile.followers.length}</strong> Followers</button>
                    <button className="text-base text-slate-500 mt-2" type="button" onClick={handleOpenFollowingModal}><strong className="text-black">{profile.following.length}</strong> Following</button>
                    {showFollowersModal && <FollowModal title={'Followers'} users={profile.followers}/>}
                    {showFollowingModal && <FollowModal title={'Following'} users={profile.following}/>}
                  </div>
                </div>
              </div>
            </div>
            <ProfileTabs userId={profile._id} />
          </>
        </main>
      </div >)}
    </>
  );
};
