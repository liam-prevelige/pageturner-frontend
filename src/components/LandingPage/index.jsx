import React from 'react';
import {DynamicSearch} from '../DynamicSearch';
import {getSearch} from '../../api';

/**
 * Component containing the landing page
 * @return {JSX} for landing page component
 */
export const LandingPage = () => {
  return (
    <div>
      <div className="row justify-content-center h1">Get Started</div>
      <div className="row justify-content-center">
        <DynamicSearch searchFn={getSearch} placeholder="Enter the title of a book you enjoyed" />
      </div>
    </div>
  );
};
