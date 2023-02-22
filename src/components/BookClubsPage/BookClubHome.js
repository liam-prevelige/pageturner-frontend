import {React} from 'react';
import {ShareBox} from '../ShareBox/ShareBox';
import {Timeline} from '../Comment/Timeline';
import {useParams} from 'react-router-dom';

export const BookClubHome = () => {
  const {clubId} = useParams();
  const [club, setClub] = useState(null);

  const fetchClub = async () => {
    if (!clubId) return;
    const retrievedClub = await getClub(clubId);
    setClub(retrievedClub);
  };

  useEffect(() => {
    fetchClub();
  }, [clubId]);

  return (
    <>
      <div className="min-h-screen max-w-7xl flex">
        <main className="flex-1 flex flex-col">
          <div className="h-full border-r w-full border-l">
            <div className="flex flex-row w-full justify-between border-slate-300 border-b border-slate-300 p-4">
              <div className="bg-white font-bold text-3xl text-black">
                {club.name}
              </div>
              <div className="flex flex-row pt-2">
              </div>
            </div>
            <div className="relative z-20 flex space-x-4 px-4 py-2 border-b border-slate-300">
              <ShareBox />
            </div>
            <div className='relative z-10'>
              <Timeline />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
