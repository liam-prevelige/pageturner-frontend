import React, {useState} from 'react';
import Svg from '../../assets/Icons';

export const SearchIcon = () => {
  return (
    <Svg className="h-5 w-5 text-gray-500">
      <g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g>
    </Svg>
  );
};

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
