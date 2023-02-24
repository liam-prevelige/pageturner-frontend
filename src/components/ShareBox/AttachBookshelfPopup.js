import {React, useRef, useState, useEffect} from 'react';
import FocusLock from 'react-focus-lock';
// import {createBookshelf} from '../../api';
import {ListIcon} from '../../assets/Icons';

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
  const [bookshelves, setBookshelves] = useState([]);

  // const submitBookshelf = async () => {
  //   await createBookshelf(name, profile._id, 'user');
  //   onCancel();
  // };

  const fetchBookshelves = async () => {
    if (!profile) return;
    const loadedBookshelves = await getBookshelves(profile._id, 'user');
    setBookshelves(loadedBookshelves);
  };

  const attachSelectedBookshelf = (bookshelfData) => {
    window.dispatchEvent(new CustomEvent('attachBookshelf', {detail: bookshelfData}));
    onCancel();
  };

  useEffect(() => {
    fetchBookshelves();
  }, []);

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel htmlFor='name'>
          Attach Bookshelf
          <div className="border-b mr-3 mt-2 mb-2 border-black"/>
        </FormLabel>
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
        placement='auto'
        closeOnBlur={true}
        dataContainer='body'
      >
        <PopoverTrigger>
          <button className="flex items-center justify-center w-9 h-9 rounded-full transform transition-colors duration-2 hover:bg-slate-300 cursor-pointer">
            <ListIcon />
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
