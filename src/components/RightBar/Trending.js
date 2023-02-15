import {React, useEffect, useState} from 'react';
import {TrendingEntry} from './TrendingEntry';
import {getTrends} from '../../api';
import {useNavigate} from 'react-router-dom';

export const Trending = () => {
  const [trends, setTrends] = useState([]);
  const navigate = useNavigate();

  const loadTrends = async () => {
    const newTrends = await getTrends();
    setTrends(newTrends);
  };

  const loadThread = (e, clickedCommentData) => {
    e.stopPropagation();
    const path = `/thread/${clickedCommentData._id}`;
    navigate(path);
  };

  useEffect(() => {
    loadTrends();
  }, []);


  return (
    <>
      <div className="items-center p-3 m-3 mt-4 bg-slate-200 rounded-xl">
        <div className="flex items-center justify-between text-black">
          <span className="text-xl font-bold">Trending Comments</span>
        </div>
        <div className="mb-3 mt-3">
          {trends.map((trendData, index) =>
            (<div key={index} onClick={(e) => loadThread(e, trendData)}>
              <TrendingEntry rank={index+1} title={trendData.displayName} postcount={trendData.metadata.likes}/>
            </div>
            ))}
        </div>
        <div className="p-2 transform transition-colors duration-2 bg-slate-200">
          <span className=" text-primary-button">Show more</span>
        </div>
      </div>
    </>
  );
};
