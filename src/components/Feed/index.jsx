import {PostContainer} from './PostContainer';
import {PreferenceList} from './PreferenceList';
import {ProfileCard} from './ProfileCard';
import React from 'react';

export const Feed = () => {
  return (
    <div>
      <PreferenceList />
      <ProfileCard profileImgUrl='genericprofilepic.jpg' name='Darrell Steward' userComment='I love Goblet of Fire so much! Check it out!'/>
      <PostContainer />
    </div>
  );
};
