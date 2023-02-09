import {React, useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  FormControl,
  Input,
} from '@chakra-ui/react';
import {getBookshelves, addBookToBookshelf, createBookshelf} from '../../api';
import {FaPlus} from 'react-icons/fa';
import {IconButton} from '@chakra-ui/react';

export const BookshelfPopup = ({bid, useIcon}) => {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [bookshelves, setBookshelves] = useState([]);
  const profile = useState(JSON.parse(sessionStorage.getItem('profile')))[0];
  const [selectedBookshelf, setSelectedBookshelf] = useState('Choose from existing');
  const [selectedBookshelfId, setSelectedBookshelfId] = useState('');
  const [newBookshelfName, setNewBookshelfName] = useState('');
  const [addToBookshelfText, setAddToBookshelfText] = useState('Add to Bookshelf');

  const handleClose = () => {
    setShow(false);
    setSelectedBookshelf('Choose from existing');
    setSelectedBookshelfId('');
    setNewBookshelfName('');
    setAddToBookshelfText('Add to Bookshelf');
  };

  const handleSubmit = async () => {
    setAddToBookshelfText('Adding...');
    if (selectedBookshelfId.length == 0 && newBookshelfName.length == 0) {
      alert('Please select an existing bookshelf or create a new one');
      return;
    }
    if (selectedBookshelfId.length != 0) {
      await addBookToBookshelf(bid, selectedBookshelfId);
    } else if (newBookshelfName.length != 0) {
      const newBookshelfId = await createBookshelf(newBookshelfName, profile._id, 'user');
      await addBookToBookshelf(bid, newBookshelfId);
    }
    handleClose();
  };

  const handleShow = () => {
    setShow(true);
  };

  const dropdownClass = `dropdown-menu${showDropdown ? ' show' : ''}`;

  const toggleShowDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const updateSelectedBookshelf = (bookshelf) => {
    setSelectedBookshelf(bookshelf.name);
    setSelectedBookshelfId(bookshelf._id);
    setShowDropdown(false);
  };

  const updateNewBookshelfName = (e) => {
    setNewBookshelfName(e.target.value);
    if (e.target.value.length > 0) {
      setSelectedBookshelf('Choose from existing'); // Reset selected bookshelf
    }
  };

  const fetchBookshelves = async () => {
    if (!profile) return;
    // TODO: stop sequential fetching
    // TODO: add ability for book club
    const loadedBookshelves = await getBookshelves(profile._id, 'user');
    // console.log(bookshelfIds);
    // const loadedBookshelves = [];
    // for (const bookshelfId of bookshelfIds) {
    //   const bookshelfData = await getBookshelf(bookshelfId);
    //   loadedBookshelves = [...loadedBookshelves, bookshelfData];
    //   console.log(bookshelfData);
    // }
    // console.log('loadedBookshelves', loadedBookshelves);
    setBookshelves(loadedBookshelves);
  };

  const collapseDropdown = () => {
    // If you click anywhere else on modal, collapse dropdown
    setShowDropdown(false);
  };

  useEffect(() => {
    fetchBookshelves();
  }, [bid]);

  return (
    <div onClick={collapseDropdown}>
      {useIcon ? (<IconButton size='sm' icon={<FaPlus />} onClick={handleShow} />) :
      (<button className="font-bold w-36 mt-3 mr-3 text-primary-button wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:border-primary-button hover:text-white" onClick={handleShow}>
          Add to Bookshelf
      </button>)}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Bookshelf</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div className="dropdown">
                <button className="font-bold p-3 text-slate-500 wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-slate-500 transform transition-colors duration-200 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={(e) => toggleShowDropdown(e)}>
                  {selectedBookshelf}
                </button>
                <div className={dropdownClass} aria-labelledby="dropdownMenuButton">
                  {bookshelves && bookshelves.map((bookshelfData, index) =>
                    (<div className="cursor-pointer ml-2 mb-2" key={index} onClick={() => updateSelectedBookshelf(bookshelfData)}>
                      {bookshelfData.name}
                      <div className="border-b mr-3 mt-2 border-slate-300"/>
                    </div>
                    ))}
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label>Or create new:</Form.Label>
              <FormControl>
                <Input className="border border-slate-300 rounded-full pt-2 pb-2 pl-4" placeholder='Bookshelf Title' id='name' value={newBookshelfName} onChange={(e) => updateNewBookshelfName(e)} />
              </FormControl>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="font-bold w-16 mr-3 text-red-400 wrap-text text-sm rounded-full shadow-sm py-2 hover:bg-red-600 hover:text-white border-2 border-red-600 transform transition-colors duration-200" onClick={handleClose}>
            Cancel
          </button>
          <button className="font-bold w-36 mr-3 text-primary-button wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:border-primary-button hover:text-white" onClick={handleSubmit}>
            {addToBookshelfText}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
