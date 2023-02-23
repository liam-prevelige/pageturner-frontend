import {React, useRef, useState} from 'react';
import FocusLock from 'react-focus-lock';
import {createBookshelf, postComment} from '../../api';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Button,
  ButtonGroup,
  Stack,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import {FaPlus} from 'react-icons/fa';

// 2. Create the form
const Form = ({firstFieldRef, onCancel}) => {
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [name, setName] = useState('');

  const submitBookshelf = async () => {
    const newBookshelfId = await createBookshelf(name, profile._id, 'user');
    window.dispatchEvent(new Event('bookshelfCreated'));
    postComment('global', newBookshelfId, 'bookshelf', 'Created a new bookshelf');
    onCancel();
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel htmlFor='name'>New Bookshelf</FormLabel>
        <Input ref={firstFieldRef} placeholder='Title' id='name' onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <ButtonGroup display='flex' justifyContent='flex-end'>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button isDisabled={name.length == 0} colorScheme='teal' onClick={submitBookshelf}>
          Create
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
export const PopoverForm = () => {
  const {onOpen, onClose, isOpen} = useDisclosure();
  const firstFieldRef = useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={true}
        className="relative z-20"
      >
        <PopoverTrigger>
          <IconButton size='sm' icon={<FaPlus />} />
        </PopoverTrigger>
        <PopoverContent p={5} zIndex={50}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={onClose} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

// render(<PopoverForm />);
