import {React, useRef, useState, useEffect} from 'react';
import FocusLock from 'react-focus-lock';
// import {createBookshelf} from '../../api';
import {FaListAlt} from 'react-icons/fa';
import {SearchIcon} from '../../assets/Icons';

import {
  ChakraProvider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  FormControl,
  FormLabel,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
// import {FaPlus} from 'react-icons/fa';

import {getBookshelves} from '../../api';

// 2. Create the form
const Form = ({firstFieldRef, onCancel}) => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [allBookshelves, setAllBookshelves] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const fetchBookshelves = async () => {
    if (!profile) return;
    const loadedBookshelves = await getBookshelves(profile._id, 'user');
    setAllBookshelves(loadedBookshelves);
    setBookshelves(loadedBookshelves);
  };

  const attachSelectedBookshelf = (bookshelfData) => {
    window.dispatchEvent(new CustomEvent('attachBookshelf', {detail: bookshelfData}));
    setSearchInput('');
    setBookshelves(allBookshelves);
    onCancel();
  };

  useEffect(() => {
    fetchBookshelves();
  }, []);

  // Handler for text change in search bar
  const handleInputChange = async (newInput) => {
    // Update search bar text
    setSearchInput(newInput);

    // If searchInput not empty, filter books
    if (newInput) {
      // Prepare searchString by removing quotes, escaping special characters
      let searchString = newInput;
      searchString = searchString.replace(/^["'](.+(?=["']$))["']$/, '$1');
      searchString = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // Use regular expressions to perform a case-insensitive search
      const searchRegex = new RegExp(searchString, 'i');

      setBookshelves(allBookshelves.filter((bookshelf) => searchRegex.test(bookshelf.name)));
    } else {
      setBookshelves(allBookshelves);
    }
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel htmlFor='name'>
          Attach Bookshelf
          <div className="border-b mr-3 mt-2 mb-2 border-black"/>
        </FormLabel>
        <div className="flex items-center space-x-5 p-1 m-3 rounded-full bg-slate-200 text-black focus-within:ring-2 focus-within:ring-primary-button focus:ring-1">
          <SearchIcon />
          <div className="w-full">
            <input
              className="focus:outline-none bg-transparent w-full"
              type="text"
              placeholder="Search for books..."
              value={searchInput}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>
        </div>
        {bookshelves && bookshelves.length === 0 && <div className="text-sm italic">No bookshelves found</div>}
        {bookshelves && bookshelves.map((bookshelfData) =>
          (<div key={bookshelfData._id}>
            <div className="cursor-pointer p-2 text-sm hover:bg-slate-300" onClick={() => attachSelectedBookshelf(bookshelfData)}>
              {bookshelfData.name}
            </div>
            <div className="border-b mr-3 mt-2 mb-2 border-slate-300"/>
          </div>
          ))}
      </FormControl>
    </Stack>
  );
};

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
export const AttachBookshelfPopup = () => {
  const {onOpen, onClose, isOpen} = useDisclosure();
  const firstFieldRef = useRef(null);

  return (
    <ChakraProvider resetCSS={false}>
      <Popover
        isOpen={isOpen}
        // initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='bottom'
        closeOnBlur={true}
        dataContainer='body'
      >
        <PopoverTrigger>
          <button className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-slate-300 cursor-pointer">
            <FaListAlt className="h-5 w-7 text-primary-button" />
          </button>
        </PopoverTrigger>
        <Box zIndex='popover'>
          <PopoverContent p={5}>
            <FocusLock returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverCloseButton />
              <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
            </FocusLock>
          </PopoverContent>
        </Box>
      </Popover>
    </ChakraProvider>
  );
};
