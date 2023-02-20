import {React, useEffect} from 'react';
import {Search} from '../Search';
import {ShareBox} from '../ShareBox/ShareBox';
// import {ThreadView} from '../ThreadView/ThreadView';
import {Timeline} from '../Comment/Timeline';
import ReactGA from 'react-ga';

export const HomePage = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <>
      <div className="min-h-screen max-w-7xl flex">
        <main className="flex-1 flex flex-col">
          <>
            <Search />
            <div className="h-full border-r border-l border-slate-300">
              {/* <header className="sticky-top flex justify-between items-center p-4 border-b border-slate-300 bg-white"> */}
              <span className="relative z-0 sticky-top flex justify-between items-center p-4 border-b border-slate-300 bg-white font-bold text-3xl text-black">Home</span>
              {/* </header> */}
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
