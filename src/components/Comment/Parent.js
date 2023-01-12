import {React} from 'react';

export const Parent = ({content, contentType}) => {
  return (
    <>
      {contentType==='text' &&
        <img className="mt-3 rounded-xl w-full h-full" src={content.image}/>
      }
    </>
  );
};
