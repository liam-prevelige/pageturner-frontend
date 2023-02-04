import {React, useState, useRef, useEffect} from 'react';

import {BackNav} from '../BackNav/BackNav';
import {ProfileTabs} from './ProfileTabs';
import {FaFileUpload} from 'react-icons/fa';
import {updateProfile} from '../../api';
import {getProfile} from '../../api';

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

  const fakeProfile = {
    id: 1,
    tag: 'barackobama',
    name: 'Barack Obama',
    bio: 'Hey there, it\'s Barack. Former POTUS, dad, and grandfather. I love books, wrote a couple (you may have heard of \'em), and believe in the power of stories to change the world. Let\'s chat about what we\'re reading!',
    friends: Array.from(Array(9473).keys()),
    following: Array.from(Array(891).keys()),
    profilePicture: 'https://mastersofscale.com/wp-content/uploads/sites/2/2021/05/barack_obama-1.jpg',
    cover: 'https://www.penguinrandomhouse.ca/sites/default/files/2021-07/obamapicks-Summer2021-Hero.jpg',
  };

  const [profile, setProfile] = useState((isMyProfile && storedProfile) ? storedProfile : fakeProfile);

  const retrieveProfileFromUid = async () => {
    const uid = queryParams.get('uid');
    const retrievedProfile = await getProfile(uid);
    console.log(retrievedProfile);
    if (retrievedProfile) {
      setProfile(retrievedProfile);
    }
  };

  useEffect(() => {
    if (!isMyProfile) {
      retrieveProfileFromUid();
    }
  }, []);

  const [newProfile, setNewProfile] = useState(profile);
  const [isEditMode, setIsEditMode] = useState(false);

  const coverPicInput = useRef(null);
  const profilePicInput = useRef(null);

  const handleEditProfile = async () => {
    if (isEditMode) {
      let updatedProfile = null;
      updatedProfile = await updateProfile(newProfile);
      sessionStorage.setItem('profile', JSON.stringify(updatedProfile));
      console.log('Updated profile: ', updatedProfile);
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
              {profile &&
                <div className="flex flex-col float-right font-bold">
                  {isMyProfile ?
                  (<button className="mt-3 mr-3 text-primary-button rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white" onClick={handleEditProfile}>
                    {isEditMode ? 'Save Changes' : 'Edit Profile'}
                  </button>) :
                  (<button className="mt-3 mr-3 text-primary-button rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white">
                    Add Friend
                  </button>)}
                </div>}

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
                  <button className="text-base text-slate-500 mt-2"><strong className="text-black">{profile.friends.length}</strong> Friends</button>
                  <button className="text-base text-slate-500 mt-2"><strong className="text-black">{profile.following.length}</strong> Following</button>
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
