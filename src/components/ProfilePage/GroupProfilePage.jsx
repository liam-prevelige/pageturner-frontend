import {React, useState, useRef, useEffect} from 'react';

import {BackNav} from '../BackNav/BackNav';
import {ProfileTabs} from './ProfileTabs';
import {FaFileUpload} from 'react-icons/fa';
import {updateGroupProfile, removeGroupMember} from '../../api';
import {getGroupProfile} from '../../api';
import ReactGA from 'react-ga';

export const GroupProfilePage = () => {
  const search = window.location.search;
  const queryParams = new URLSearchParams(search);
  const storedProfile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];

  const defaultProfile = {
    banner_picture: 'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=30&auto=format&w=754&h=502&fit=crop&dpr=2',
    tag: 'deafult',
    name: storedProfile.name + '\'s New Group',
    description: 'Click here to edit your new group!',
    members: [storedProfile._id],
    admins: [storedProfile._id],
    posts: Array.from(Array(0).keys()),
    bookshelves: Array.from(Array(0).keys()),
    creator_id: storedProfile._id,
    private: false,
  };

  const [profile, setProfile] = useState(defaultProfile);

  const retrieveProfileFromUid = async () => {
    const id = queryParams.get('id');
    const retrievedProfileArray = await getGroupProfile(id);
    const retrievedProfile = retrievedProfileArray[0];
    if (retrievedProfile) {
      setProfile(retrievedProfile);
    }
  };

  useEffect(() => {
    retrieveProfileFromUid();
    ReactGA.pageview(window.location.pathname);
  }, []);

  const [newProfile, setNewProfile] = useState(profile);
  const [isEditMode, setIsEditMode] = useState(false);

  const coverPicInput = useRef(null);

  /**
   * removes the user (storedProfile) from this book club
   */
  const handleLeaveGroup = async () => {
    const updatedProfile = await removeGroupMember(profile, storedProfile._id);
    setNewProfile(updatedProfile);
    window.location.reload();
  };

  const handleEditProfile = async () => {
    if (isEditMode) {
      let updatedProfile = null;
      updatedProfile = await updateGroupProfile(newProfile);
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
      if (isGroup) {
        setNewProfile({...newProfile, banner_picture: base64Image});
      } else {
        setNewProfile({...newProfile, cover: base64Image});
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerClick = (input) => {
    input.current.click();
  };

  /**
   * renders different button functionality depending on if the user is a group admin, member, non-member
   * @param {*} groupProfile the group profile with a list of members and admins
   * @return {jsx} different button layout depending on member status and admin status
   */
  const groupButtonOptions = () => {
    // TODO: add functionality to buttons
    if (profile.members.includes(storedProfile._id)) {
      if (profile.admins.includes(storedProfile._id)) {
        return (
          <div>
            <button className="mt-3 mr-3 text-primary-button rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white" onClick={handleEditProfile}>
              {isEditMode ? 'Save Changes' : 'Edit Profile'}
            </button>
            <button className="mt-3 mr-3 text-red-500 rounded-full shadow-md py-2 px-4 border-2 border-red-500 transform transition-colors duration-500 hover:bg-red-500 hover:text-white" onClick={handleLeaveGroup}>
            Leave Group
            </button>
          </div>
        );
      } else {
        return (
          <button className="mt-3 mr-3 text-red-500 rounded-full shadow-md py-2 px-4 border-2 border-red-500 transform transition-colors duration-500 hover:bg-red-500 hover:text-white" onClick={handleLeaveGroup}>
          Leave Group
          </button>
        );
      }
    } else {
      return (
        <button className="mt-3 mr-3 text-primary-button rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white">
          Join Group
        </button>
      );
    }
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

              {!isEditMode ? <img className="h-64 w-full object-cover" src={profile.banner_picture} /> :
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

              {groupButtonOptions()}

              <div id="aboutInfo" className="flex flex-1 flex-col text-black mt-6 ml-5 mr-5">
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
                  <button className="text-base text-slate-500 mt-2"><strong className="text-black">{profile.members.length}</strong>{(profile.members.length == 1 ? ' Member' : ' Members')}</button>
                  <button className="text-base text-slate-500 mt-2"><strong className="text-black">{profile.admins.length}</strong>{(profile.members.length == 1 ? ' Admin' : ' Admins')}</button>
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
