import {React, useEffect, useState} from 'react';
import {TrendingEntry} from './TrendingEntry';
import {getTrends} from '../../api';

export const Trending = () => {
  const [trends, setTrends] = useState([]);

  const loadTrends = async () => {
    const newTrends = await getTrends();
    setTrends(newTrends);
  };


  useEffect(() => {
    loadTrends();
  }, []);


  return (
    <>
      <div className="items-center p-3 m-3 mt-4 bg-slate-200 rounded-xl">
        <div className="flex items-center justify-between text-black">
          <span className="text-xl font-bold">Trending</span>
        </div>
        <div className="mb-3 mt-3">
          {trends.map((trendData, index) =>
            (<div key={index}>
              <TrendingEntry rank={index} title={trendData.title} postcount={trendData.postcount}/>
            </div>
            ))}
          {/* <TrendingEntry rank={1} title={'Obama\'s 2023 Reading List'} postcount={'15.8K'}/>
          <TrendingEntry rank={2} title={'Reese\'s Book Club'} postcount={'14.8K'}/>
          <TrendingEntry rank={3} title={'Book Riot - The Podcast'} postcount={'13.8K'}/>
          <TrendingEntry rank={4} title={'Forever, Interrupted'} postcount={'12.8K'}/> */}
        </div>
        <div className="p-2 transform transition-colors duration-2 bg-slate-200">
          <span className=" text-primary-button">Show more</span>
        </div>
      </div>
    </>
  );
};
