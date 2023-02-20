import {React} from 'react';
import {useNavigate} from 'react-router-dom';

export const FollowModal = ({title, users}) => {
  const navigate = useNavigate();

  const loadUserProfile = (e, uid) => {
    const path = `/profile/${uid}`;
    navigate(path);
  };

  return (
    <>
      <div className="flex justify-center items-center overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex p-2 border-b border-gray-300">
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <div className="relative p-2 flex-auto">
              {
                users.map((user) => (
                  <div key={user._id}>
                    <div className="flex items-center text-sm space-x-2 cursor-pointer mb-1" onClick={(e) => loadUserProfile(e, user._id)}>
                      <span className="ml-1 font-bold text-black">{user.name}</span>
                      <span className="ml-2 text-primary-gray_colors">@{user.tag}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
