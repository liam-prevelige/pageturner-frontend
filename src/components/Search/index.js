import React, {useState} from 'react';
import {SearchIcon} from '../../assets/Icons';

export const Search = () => {
  const [searchInput, setSearchInput] = useState('');

  return (<div className="flex items-center space-x-5 p-3 m-3 rounded-full bg-slate-200 text-black focus-within:ring-2 focus-within:ring-primary-button focus:ring-1">
    <SearchIcon />
    <div>
      <input
        className="focus:outline-none bg-transparent w-full"
        type="text"
        placeholder="Search PageTurner"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </div>
  </div>);
};
