import {React, useState, useEffect} from 'react';
import {getBookClubs, createGroup, getTopClubs} from '../../api';
import {useNavigate} from 'react-router-dom';
import ReactGA from 'react-ga';

export const BookClubsPage = () => {
  const navigate = useNavigate();
  const storedProfile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [tagExists, setTagExists] = useState(false);
  const [bookClubs, setBookClubs] = useState([]);
  const [leftColumn, setLeftColumn] = useState([]);
  const [rightColumn, setRightColumn] = useState([]);
  const [trendingLeftColumn, setTrendingLeftColumn] = useState([]);
  const [trendingRightColumn, setTrendingRightColumn] = useState([]);
  /**
   * fake book club account for backup/development purposes
   */
  const fakeBookClub = {
    id: '63d054f5374f6dbf32cb8cba',
    banner_picture: 'https://dcmp.org/seriesposterimages/series_4.jpg',
    tag: 'magic.school.bus',
    name: 'Miss Frizzle\'s Classroom',
    description: 'Our class emphasizes experiential learning with our magic school bus, but we also do plenty of reading! Take a look at this school year\'s reading list.',
    members: Array.from(Array(23).keys()),
    admins: Array.from(Array(2).keys()),
    posts: Array.from(Array(104).keys()),
    bookshelves: Array.from(Array(6).keys()),
    creator_id: 'MissFrizzle',
    private: true,
  };

  /**
   * gets the session user's book clubs
   */
  const retrieveBookClubsFromUid = async () => {
    const uid = storedProfile._id;
    const response = await getBookClubs(uid);
    const retrievedBookClubs = response['result'];
    if (retrievedBookClubs) {
      setBookClubs(retrievedBookClubs);
    } else {
      setBookClubs([fakeBookClub, fakeBookClub, fakeBookClub]);
    }
  };

  const loadBookClubHome = (e, clubId) => {
    e.stopPropagation();
    const path = `/book-clubs/${clubId}`;
    navigate(path);
  };

  // Split bookClubs into two maps of alternating indexes for each column
  useEffect(() => {
    if (bookClubs.length > 0) {
      const leftColumn = [];
      const rightColumn = [];
      for (let i = 0; i < bookClubs.length; i++) {
        if (i % 2 === 0) {
          leftColumn.push(bookClubs[i]);
        } else {
          rightColumn.push(bookClubs[i]);
        }
      }
      setLeftColumn(leftColumn);
      setRightColumn(rightColumn);
    }
  }, [bookClubs]);

  /**
  * Gets the top public book clubs
  */
  const retrieveTopClubs = async () => {
    const response = await getTopClubs();
    const trendingClubs = response.result;
    console.log(trendingClubs);
    if (trendingClubs.length > 0) {
      const leftTrendingCol = [];
      const rightTrendingCol = [];
      for (let i = 0; i < trendingClubs.length; i++) {
        if (i % 2 === 0) {
          leftTrendingCol.push(trendingClubs[i]);
        } else {
          rightTrendingCol.push(trendingClubs[i]);
        }
      }
      setTrendingLeftColumn(leftTrendingCol);
      setTrendingRightColumn(rightTrendingCol);
    }
  };

  /**
   * finds the user's book clubs every time the page loads
   */
  useEffect(() => {
    if (storedProfile) {
      retrieveBookClubsFromUid();
    }
    retrieveTopClubs();
    ReactGA.pageview(window.location.pathname);
  }, []);

  const renderGroups = () => {
    return (
      <div className="row flex justify-center align-middle w-full">
        <div className="border-b border-slate-300 mb-4"/>
        <div className="font-bold text-xl pt-30 ml-4 mb-3">
          {!storedProfile ? 'Sign in to see your bookclubs!' : leftColumn.length>0 ? 'Your Bookclubs:' : 'You are not in any bookclubs yet. Join one or create your own!'}
        </div>
        <div className="col-md-6 flex flex-col w-1/2">
          {leftColumn.map((groupData) =>
            (<div key={groupData._id} className="mb-3 w-full cursor-pointer" onClick={(e) => loadBookClubHome(e, groupData._id)}>
              <div className="w-full block rounded overflow-hidden bg-white shadow-lg mb-3">
                <img className="w-full h-28 object-none" src={groupData.banner_picture} alt="Group Banner Picture"/>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{groupData.name}</div>
                  <p className="text-gray-400 text-base">
                    {'@' + groupData.tag}
                  </p>
                  <p className="text-gray-700 text-base">
                    {groupData.description}
                  </p>
                </div>
              </div>
            </div>
            ))}
        </div>
        <div className="col-md-6 flex flex-col w-1/2">
          {rightColumn.map((groupData) =>
            (<div key={groupData._id} className="mb-3 w-full cursor-pointer" onClick={(e) => loadBookClubHome(e, groupData._id)}>
              <div className="w-full block rounded overflow-hidden bg-white shadow-lg mb-3">
                <img className="w-full h-28 object-none" src={groupData.banner_picture} alt="Group Banner Picture"/>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{groupData.name}</div>
                  <p className="text-gray-400 text-base">
                    {'@' + groupData.tag}
                  </p>
                  <p className="text-gray-700 text-base">
                    {groupData.description}
                  </p>
                </div>
              </div>
            </div>
            ))}
        </div>
        <div className="border-b border-slate-300 m-4"/>
        <div className="row flex justify-center align-middle w-full">
          <div className="font-bold text-xl mb-3 pt-30">
              Explore Popular Bookclubs:
          </div>
          <div className="col-md-6 flex flex-col w-1/2">
            {trendingLeftColumn.map((groupData) =>
              (<div key={groupData._id} className="mb-3 w-full cursor-pointer" onClick={(e) => loadBookClubHome(e, groupData._id)}>
                <div className="w-full block rounded overflow-hidden bg-white shadow-lg mb-3">
                  <img className="w-full h-28 object-none" src={groupData.banner_picture} alt="Group Banner Picture"/>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{groupData.name}</div>
                    <p className="text-gray-400 text-base">
                      {'@' + groupData.tag}
                    </p>
                    <p className="text-gray-700 text-base">
                      {groupData.description}
                    </p>
                  </div>
                </div>
              </div>
              ))}
          </div>
          <div className="col-md-6 flex flex-col w-1/2">
            {trendingRightColumn.map((groupData) =>
              (<div key={groupData._id} className="mb-3 w-full cursor-pointer" onClick={(e) => loadBookClubHome(e, groupData._id)}>
                <div className="w-full block rounded overflow-hidden bg-white shadow-lg mb-3">
                  <img className="w-full h-28 object-none" src={groupData.banner_picture} alt="Group Banner Picture"/>
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{groupData.name}</div>
                    <p className="text-gray-400 text-base">
                      {'@' + groupData.tag}
                    </p>
                    <p className="text-gray-700 text-base">
                      {groupData.description}
                    </p>
                  </div>
                </div>
              </div>
              ))}
          </div>
        </div>
      </div>);
  };

  /**
   * toggles the createGroup variable
   */
  const toggleCreatingGroup = () => {
    setCreatingGroup(!creatingGroup);
  };

  /**
   * handles creating a new group when the user has typed in a tag and submits
   */
  const handleCreateGroup = async () => {
    const defaultProfile = {
      banner_picture: 'https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=30&auto=format&w=754&h=502&fit=crop&dpr=2',
      tag: newTag,
      name: storedProfile.name + '\'s New Group',
      description: 'Click here to edit your new group!',
      members: [storedProfile._id],
      admins: [storedProfile._id],
      posts: Array.from(Array(0).keys()),
      bookshelves: Array.from(Array(0).keys()),
      creator_id: storedProfile._id,
      private: false,
    };
    const response = await createGroup(defaultProfile);

    if (!response) {
      toggleCreatingGroup();
      setTagExists(false);
      window.location.reload();
    } else {
      setTagExists(true);
    }
  };

  /**
   * keeps track of what the user is typing as their potential tag
   * @param {*} e whatever the user is actively typing
   */
  const handleTagChange = (e) => {
    setNewTag(e.target.value);
  };

  /**
   * renders the functionality for creating a group
   * @return {JSX} renderings of creating a new group depending on user status, valid tag entry, etc
   */
  const renderCreateGroup = () => {
    if (storedProfile) { // user is logged in
      if (creatingGroup) { // user is actively creating a group (form is showing)
        return (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Tag
              </label>
              <input value= {newTag} onChange={handleTagChange} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter a tag for your new group"></input>
              <p className="text-red-500 text-xs italic">{tagExists ? 'This tag is already taken.' :''}</p>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleCreateGroup}>
                Create Group
              </button>
              <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={toggleCreatingGroup}>
                Cancel
              </button>
            </div>
          </form>
        );
      } else { // user is logged in but not creating a group
        return (
          <>
            <div className="flex flex-row w-full justify-between p-4">
              <div className="bg-white font-bold text-3xl text-black">
                Book Clubs
              </div>
              <button className="wrap-text mr-3 text-green-500 rounded-full shadow-md py-2 px-4 border-2 border-green-500 transform transition-colors duration-200 hover:bg-green-500 hover:text-white" onClick={toggleCreatingGroup}>
                Create Group
              </button>
            </div>
          </>
        );
      }
    } else { // user is not logged in
      return (
        <>
          <div className="flex flex-row w-full justify-between p-4">
            <div className="bg-white font-bold text-3xl text-black">
              Book Clubs
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="h-full bg-white pt-10">
      {renderCreateGroup()}
      <div className="min-h-screen mx-auto max-w-7xl mt-1 flex">
        <div className="h-full w-full bg-white">
          {renderGroups(bookClubs)}
        </div>
      </div>
    </div>
  );
};
