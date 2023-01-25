import {React} from 'react';
import {Search} from '../../assets/Icons';
import {ShareBox} from '../ShareBox/ShareBox';
import {ThreadView} from '../ThreadView/ThreadView';

export const HomePage = () => {
  return (
    <>
      <div className="min-h-screen max-w-7xl flex">
        <main className="flex-1 flex flex-col">
          <>
            <div className="flex items-center space-x-5 p-3 m-3 rounded-full bg-slate-200 text-black focus-within:ring-2 focus-within:ring-primary-button focus:ring-1">
              <Search />
              <div>
                <input className="focus:outline-none bg-transparent w-full" type="text" placeholder="Search PageTurner"/>
              </div>
            </div>
            <div className="h-full border-r border-l border-slate-300">
              <header className="sticky-top flex justify-between items-center p-4 border-b border-slate-300 bg-white">
                <span className="font-bold text-3xl text-black">Home</span>
              </header>
              <div className="flex space-x-4 px-4 py-2 border-b border-slate-300">
                <ShareBox />
              </div>
              <ThreadView commentId={'a'}/>
            </div>
          </>
        </main>
      </div>
    </>
  );
};
