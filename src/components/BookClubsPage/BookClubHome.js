import {React, useEffect, useState} from 'react';
import {ClubShareBox} from './ClubShareBox';
import {ClubTimeline} from './ClubTimeline';
import {useNavigate, useParams} from 'react-router-dom';
import {getBookClub} from '../../api';
import {FaArrowRight} from 'react-icons/fa';
import {BackNav} from '../BackNav/BackNav';

export const BookClubHome = () => {
  const navigate = useNavigate();
  const {clubId} = useParams();
  const [club, setClub] = useState(null);
  const [numPosts, setNumPosts] = useState(0);

  const fetchClub = async () => {
    if (!clubId) return;
    const retrievedClub = await getBookClub(clubId);
    setClub(retrievedClub);
  };

  const loadClubProfile = (e) => {
    e.stopPropagation();
    const path = `/book-clubs/${clubId}/about`;
    navigate(path);
  };

  useEffect(() => {
    fetchClub();
  }, [clubId]);

  return (
    <>
      <BackNav/>
      {club && <div className="min-h-screen max-w-7xl flex">
        <main className="flex-1 flex flex-col">
          <div className="h-full border-r w-full border-l">
            <div className="sticky top-0 z-20 flex flex-row w-full justify-between border-slate-300 border-b border-slate-300 p-4" style={{backgroundImage: `url(\'${club.banner_picture}\')`, backgroundSize: 'cover'}}>
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
              <div className="flex flex-col justify-center cursor-pointer" onClick={(e) => loadClubProfile(e)}>
                <div className="flex bg-white rounded p-2">
                  <div className="flex text-sm text-slate-700">More Info </div>
                  <button className="text-white flex ml-3"><FaArrowRight className="h-4 w-4 mt-0.5 text-slate-700 rounded-full"/></button>
                </div>
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
              <ClubTimeline club={club} numPostsCb={setNumPosts} />
            </div>
          </div>
        </main>
      </div>}
    </>
  );
};
