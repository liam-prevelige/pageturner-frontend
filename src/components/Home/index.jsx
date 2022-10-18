/*
 * Example major component / page 
 */

import { Header } from './Header';

export const Home = () => {    
  return (
    <div className="App">
      <div className='gradient_bg'>
        <Header />
      </div>
    </div>
  );
}