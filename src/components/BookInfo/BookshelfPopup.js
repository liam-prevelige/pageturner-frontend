import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';

export const BookshelfPopup = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="font-bold w-36 mt-3 mr-3 text-primary-button wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:border-primary-button hover:text-white" onClick={handleShow}>
          Add to Bookshelf
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Bookshelf</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div className="dropdown">
                <button className="font-bold p-3 text-slate-500 wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-slate-500 transform transition-colors duration-200 hover:bg-slate-500 hover:text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Choose from existing
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Or create new:</Form.Label>
              <FormControl>
                <FormLabel htmlFor='name'>New Bookshelf</FormLabel>
                <Input placeholder='Title' id='name' onChange={(e) => setName(e.target.value)} />
              </FormControl>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="font-bold w-16 mt-3 mr-3 text-red-400 wrap-text text-sm rounded-full shadow-sm py-2 hover:bg-red-600 hover:text-white border-2 border-red-600 transform transition-colors duration-200" onClick={handleClose}>
            Cancel
          </button>
          <button className="font-bold w-36 mt-3 mr-3 text-primary-button wrap-text text-sm rounded-full shadow-sm py-2 border-2 border-primary-button transform transition-colors duration-200 hover:bg-primary-button hover:border-primary-button hover:text-white" onClick={handleClose}>
            Add to Bookshelf
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
