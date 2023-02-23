import {React, useState, useEffect} from 'react';
import {Search} from '../Search';
import {ShareBox} from '../ShareBox/ShareBox';
import {Timeline} from '../Comment/Timeline';
import {Switch, ChakraProvider} from '@chakra-ui/react';
import {FaGlobeAmericas, FaUser} from 'react-icons/fa';
import ReactGA from 'react-ga';
import introJs from 'intro.js';
import 'intro.js/introjs.css';

export const HomePage = () => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];

  useEffect(() => {
    ReactGA.pageview(window.location.pathname);

    // Initialize Intro.js and define the steps for the pop-ups
    introJs()
        .setOptions({
          steps: [
            {
              title: 'Welcome to Pageturner!',
              intro: 'Thank you for visiting our site. Our goal is to promote reading by fostering meaningful interactions centered around books.',
              position: 'bottom',
            },
            {
              element: document.querySelector('.profilepage'),
              title: 'Profile Page',
              intro: 'Your profile is a space to highlight your personal information, posts, reviews, bookshelves, and likes. When you\'re ready to edit your profile, simply click on this tab.',
              position: 'right',
            },
            {
              element: document.querySelector('.searchbar'),
              title: 'Search Content',
              intro: 'Discover fascinating content with our search bar! Search results are divided into People, Groups, Bookshelves, Comments, and Books. Give it a try and find your first book!',
              position: 'bottom',
            },
          ],
        })
        .start();
  }, []);

  const changeTimeline = (e) => {
    window.dispatchEvent(new CustomEvent('timelineChange', {detail: e.target.checked}));
  };

  return (
    <>
      <div className="mainpage min-h-screen max-w-7xl flex">
        <main className="flex-1 flex flex-col">
          <>
            <Search className='searchbar'/>
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
                <ShareBox className='profilepage'/>
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
