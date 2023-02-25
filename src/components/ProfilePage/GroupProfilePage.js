import {React, useState, useRef, useEffect} from 'react';

import {BackNav} from '../BackNav/BackNav';
import {ClubTimeline} from '../BookClubsPage/ClubTimeline';
import {FaFileUpload} from 'react-icons/fa';
import {useParams} from 'react-router-dom';
import {changeClubMember, getProfilesFromIds, updateGroupProfile} from '../../api';
import {getGroupProfile} from '../../api';
import ReactGA from 'react-ga';
import {ChakraProvider, Tabs, TabList, TabPanels, Tab, TabPanel} from '@chakra-ui/react'; // https://chakra-ui.com/docs/components/tabs/usage
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {FollowModal} from '../ProfilePage/FollowModal';
import ReactLoading from 'react-loading';

export const GroupProfilePage = () => {
  const {clubId} = useParams();
  const storedProfile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const theme = createTheme();
  const [profile, setProfile] = useState(null);
  const [adminObjects, setAdminObjects] = useState([]);
  const [memberObjects, setMemberObjects] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);

  const retrieveProfileFromUid = async () => {
    const retrievedProfileArray = await getGroupProfile(clubId);
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
  const [showAdminsModal, setShowAdminsModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);

  const coverPicInput = useRef(null);

  const handleChangeMembership = async () => {
    if (!storedProfile) return;
    const updatedProfile = await changeClubMember(profile._id);
    setProfile(updatedProfile);
  };

  useEffect(() => {
  }, [profile]);

  const handleOpenAdminsModal = async () => {
    setLoadingModal(true);
    const admins = await getProfilesFromIds(profile.admins);
    setAdminObjects(admins);
    setShowAdminsModal(true);
    setLoadingModal(false);
  };

  const handleOpenMembersModal = async () => {
    setLoadingModal(true);
    const members = await getProfilesFromIds(profile.members);
    setMemberObjects(members);
    setShowMembersModal(true);
    setLoadingModal(false);
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

  const handleCoverPicChange = (newImage) => {
    // Convert image to base64 encoded binary data and save in newEditedProfile
    const file = newImage;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setNewProfile({...newProfile, banner_picture: base64Image});
    };
    reader.readAsDataURL(file);
  };

  const triggerClick = (input) => {
    input.current.click();
  };

  const handleResetStates = () => {
    setShowMembersModal(false);
    setShowAdminsModal(false);
  };

  /**
   * renders different button functionality depending on if the user is a group admin, member, non-member
   * @param {*} groupProfile the group profile with a list of members and admins
   * @return {jsx} different button layout depending on member status and admin status
   */
  const groupButtonOptions = () => {
    // TODO: add functionality to buttons
    if (storedProfile && profile.members.includes(storedProfile._id)) {
      if (storedProfile && profile.admins.includes(storedProfile._id)) {
        return (
          <div className="flex flex-col">
            <button className="mt-3 mr-3 text-primary-button rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white" onClick={handleEditProfile}>
              {isEditMode ? 'Save Changes' : 'Edit Book Club'}
            </button>
            <button className="mt-3 mr-3 text-red-500 rounded-full wrap-content shadow-md py-2 px-4 border-2 border-red-500 transform transition-colors duration-500 hover:bg-red-500 hover:text-white" onClick={handleChangeMembership}>
              Leave Group
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <button className="mt-3 mr-3 text-red-500 rounded-full shadow-md py-2 px-4 border-2 border-red-500 transform transition-colors duration-500 hover:bg-red-500 hover:text-white" onClick={handleChangeMembership}>
            Leave Group
            </button>
          </div>
        );
      }
    } else {
      return (
        <div>
          <button className="mt-3 mr-3 text-primary-button rounded-full shadow-md py-2 px-4 border-2 border-primary-button transform transition-colors duration-500 hover:bg-primary-button hover:text-white" disabled={!profile} onClick={handleChangeMembership}>
            Join Group
          </button>
        </div>
      );
    }
  };

  return (
    <>
      {profile &&
      <div className="min-h-screen mx-auto max-w-7xl mt-1 flex" onClick={handleResetStates}>
        <main className="flex flex-col">
          <>
            <div className="profile">
              <div className="profile-info">
                <div className="profile-head">
                  <BackNav profile={profile} type={'club'}/>
                </div>

                {!isEditMode ? <img className="h-64 w-full object-cover rounded" src={profile.banner_picture} /> :
                    (
                        <div className="h-64 w-full object-cover">
                          <img className="h-64 w-full object-cover" src={newProfile.banner_picture} />

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
                <div className="flex flex-row">
                  <div id="aboutInfo" className="flex flex-1 flex-col text-black mt-3 ml-5 mr-5">
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
                      <button className="text-base text-slate-500 mt-2" onClick={handleOpenAdminsModal}><strong className="text-black">{profile.admins.length}</strong>{(profile.members.length == 1 ? ' Admin' : ' Admins')}</button>
                      <button className="text-base text-slate-500 mt-2" onClick={handleOpenMembersModal}><strong className="text-black">{profile.members.length}</strong>{(profile.members.length == 1 ? ' Member' : ' Members')}</button>
                      {showAdminsModal && <FollowModal title={'Admins'} users={adminObjects}/>}
                      {showMembersModal && <FollowModal title={'Members'} users={memberObjects}/>}
                      {loadingModal && <ReactLoading type="spin" color="black" />}
                    </div>
                  </div>
                  {groupButtonOptions()}
                </div>
              </div>
            </div>
            <ThemeProvider theme={theme}>
              <ChakraProvider resetCSS={false}>
                <Tabs isFitted className="m-3" variant='line' colorScheme='cyan'>
                  <TabList>
                    <Tab>Posts</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel width={'710px'}>
                      <ClubTimeline club={profile} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ChakraProvider>
            </ThemeProvider>
          </>
        </main>
      </div >}
    </>
  );
};
