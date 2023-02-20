import {React, useState} from 'react';
import {Search} from '../Search';
import {ShareBox} from '../ShareBox/ShareBox';
// import {ThreadView} from '../ThreadView/ThreadView';
import {Timeline} from '../Comment/Timeline';
import {Switch, ChakraProvider} from '@chakra-ui/react';
import {FaGlobeAmericas, FaUser} from 'react-icons/fa';

export const HomePage = () => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];

  const changeTimeline = (e) => {
    console.log(e.target.checked);
    window.dispatchEvent(new CustomEvent('timelineChange', {detail: e.target.checked}));
  };
  return (
    <>
      <div className="min-h-screen max-w-7xl flex">
        <main className="flex-1 flex flex-col">
          <>
            <Search />
            <div className="h-full border-r w-full border-l">
              <div className="flex flex-row w-full justify-between border-slate-300 border-b border-slate-300 p-4">
                <div className="bg-white font-bold text-3xl text-black">
                  Home
                </div>
                <div className="flex flex-row pt-2">
                  <FaGlobeAmericas className="mr-2 w-5 h-5"/>
                  <ChakraProvider resetCSS={false}>
                    <Switch disabled={profile===null} onChange={(e) => changeTimeline(e)}/>
                  </ChakraProvider>
                  <FaUser className="ml-2 w-5 h-5"/>
                </div>
              </div>
              <div className="relative z-20 flex space-x-4 px-4 py-2 border-b border-slate-300">
                <ShareBox />
              </div>
              <div className='relative z-10'>
                <Timeline />
              </div>
            </div>
          </>
        </main>
      </div>
    </>
  );
};
