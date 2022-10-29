import React from 'react';
import './profilecard.css';

export const ProfileCard = ({profileImgUrl, name, userComment}) => {
  return (
    <div className='profile__card'>
      <img className='profile__picture' src={profileImgUrl}/>
      <h4>
        {name}
      </h4>
      <h6>
        {userComment}
      </h6>
    </div>
  );
};
