import {React, useRef, useState} from 'react';
import ReactLoading from 'react-loading';
import FocusLock from 'react-focus-lock';
import {BookPlusIcon, SearchIcon} from '../../assets/Icons';

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

import {searchBooks} from '../../api';

// 2. Create the form
const Form = ({firstFieldRef, onCancel}) => {
  const [searchInput, setSearchInput] = useState('');
  const [books, setBooks] = useState(null);
  const [show, setShow] = useState(false);

  // Handler for text change in search bar
  const handleInputChange = async (newInput) => {
    // Update search bar text
    setSearchInput(newInput);

    // Hide results until the user hits enter
    setShow(false);

    // Clear results to null
    setBooks(null);
  };

  // Hit book search endpoint and manage state until results are available
  const performBookSearch = async () => {
    // Clear books to null
    setBooks(null);

    setShow(true);

    // Get search results for books
    const res = await searchBooks(searchInput);

    // Set books (will change from loading icon to results)
    setBooks(res.books);
  };

  // Execute the content search when the user hits 'enter'
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchInput !== '') {
      performBookSearch();
    }
  };

  const attachSelectedBook = (bookInfo) => {
    window.dispatchEvent(new CustomEvent('attachBook', {detail: bookInfo}));
    onCancel();
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel htmlFor='name'>
          Attach Book
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
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        {show && (books == null ? <div className="flex margin-auto justify-content-center">
          <ReactLoading type="spin" color="black" />
        </div> : <div> {books.map((bookInfo) => <div key={bookInfo.volumeId} className="cursor-pointer p-2 text-sm hover:bg-slate-300" onClick={() => attachSelectedBook(bookInfo)}>
          <div className='flex space-x-3 px-2 py-2 justify-between border-primary-container_border_color cursor-pointer'>
            <div className="flex flex-row space-x-2">
              {'volumeInfo' in bookInfo && 'imageLinks' in bookInfo.volumeInfo && 'smallThumbnail' in bookInfo.volumeInfo.imageLinks &&
            <div className="flex flex-row space-x-2">
              <img className="h-8 object-scale-down" src={bookInfo.volumeInfo.imageLinks.smallThumbnail} />
              <div className="flex flex-col items-left text-sm space-x-2 h-8 justify-center">
                <span className="ml-1 font-bold text-black">{bookInfo.volumeInfo.title}</span>
                <span className="ml-2 text-black">{bookInfo.volumeInfo.authors[0]}</span>
              </div>
            </div>}
            </div>
          </div>
          <div className="border-b mr-3 mt-2 mb-2 border-slate-300"/>
        </div>)}
        </div>)}
      </FormControl>
    </Stack>
  );
};

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
export const AttachBookPopup = () => {
  const {onOpen, onClose, isOpen} = useDisclosure();
  const firstFieldRef = useRef(null);

  return (
    <ChakraProvider resetCSS={false}>
      <Popover
        isOpen={isOpen}
        // initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='auto'
        closeOnBlur={true}
        dataContainer='body'
      >
        <PopoverTrigger>
          <button className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-slate-300 cursor-pointer">
            <BookPlusIcon />
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
