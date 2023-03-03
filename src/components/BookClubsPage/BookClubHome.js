import {React, useEffect, useState} from 'react';
import {ClubShareBox} from './ClubShareBox';
import {ClubTimeline} from './ClubTimeline';
import {useNavigate, useParams} from 'react-router-dom';
import {getBookClub, getPostCount, changeClubMember} from '../../api';
import {FaArrowRight} from 'react-icons/fa';
import {BackNav} from '../BackNav/BackNav';

export const BookClubHome = () => {
  const navigate = useNavigate();
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const {clubId} = useParams();
  const [club, setClub] = useState(null);
  const [numPosts, setNumPosts] = useState(0);

  const fetchClub = async () => {
    if (!clubId) return;
    const retrievedClub = await getBookClub(clubId);
    setClub(retrievedClub);
  };

  const handleChangeMembership = async () => {
    if (!profile || !club) return;
    const updatedClub = await changeClubMember(club._id);
    setClub(updatedClub);
  };

  const loadClubProfile = (e) => {
    e.stopPropagation();
    const path = `/book-clubs/${clubId}/about`;
    navigate(path);
  };

  const updatePostCount = async () => {
    if (!club) return;
    const numPosts = await getPostCount(club._id, 'club');
    setNumPosts(numPosts);
  };

  useEffect(() => {
    updatePostCount();
  }, [club]);

  useEffect(() => {
    fetchClub();
  }, [clubId]);

  return (
    <>
      <BackNav/>
      {club && <div className="min-h-screen max-w-7xl flex">
        <main className="flex-1 flex flex-col">
          <div className="h-full border-r w-full border-l">
            <div className="flex flex-row w-full justify-between border-slate-300 border-b border-slate-300 p-4" style={{backgroundImage: `url(\'${club.banner_picture}\')`, backgroundSize: 'cover'}}>
              <div className='flex flex-col bg-white rounded p-3'>
                <div className="font-bold text-3xl text-black mb-1">
                  {club.name}
                </div>
                <div className="text-xl text-slate-600 mb-1">
                  @{club.tag}
                </div>
                <div className="text-sm text-slate-600">
                  {club.members.length} Members&nbsp; • &nbsp;{numPosts} Posts
                </div>
              </div>
              <div className="flex flex-col justify-center items-center cursor-pointer">
                <div className="flex bg-white rounded p-2" onClick={(e) => loadClubProfile(e)}>
                  <div className="flex text-sm text-slate-700">More Info </div>
                  <button className="text-white flex ml-3"><FaArrowRight className="h-4 w-4 mt-0.5 text-slate-700 rounded-full"/></button>
                </div>
                {profile && !(club.members.includes(profile._id)) &&
                <div className="bg-white rounded-full mt-3 border-2 border-primary-button">
                  <button className="text-sm button-tweet wrap-text justify-center text-primary-button rounded-full shadow-sm justify-center py-2 px-3 transform transition-colors duration-200 hover:bg-primary-button hover:text-white" disabled={!profile} onClick={handleChangeMembership}>
                    Join Club
                  </button>
                </div>}
              </div>
            </div>
            <div className="flex flex-row w-full justify-between border-slate-300 border-b border-slate-300 p-4">
              <div className="bg-white font-bold text-3xl text-black">
                Recent Activity
              </div>
            </div>
            <div className="relative z-10 flex space-x-4 px-4 py-2 border-b border-slate-300">
              <ClubShareBox club={club} />
            </div>
            <div className='relative z-0'>
              <ClubTimeline club={club} />
            </div>
          </div>
        </main>
      </div>}
    </>
  );
};
