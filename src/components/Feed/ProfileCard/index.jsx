import React from 'react';
import './profilecard.css';

export const ProfileCard = ({profileImgUrl, name, userComment}) => {
  return (
    <div className='profile__card'>
      <img className='profile__picture' src={profileImgUrl}/>
      <h4 color='charcoal'>
        {name}
      </h4>
      <h6 color='charcoal'>
        {userComment}
      </h6>
    </div>
  );
};
