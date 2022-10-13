import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='bookfinder__header section__padding' id="home">
      <div className='bookfinder__header-content'>
        <h1 className='gradient__text'>Book Finder</h1>

        <div className='bookfinder__header-content__input'>
          <input type="book" placeholder='Tell us the name of the last book you enjoyed' /> 
          <button type="button">Get Started </button>
        </div>

      </div>
    </div>
  )
};

export default Header