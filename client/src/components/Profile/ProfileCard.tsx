import React from 'react';
import TempImage from '../../assets/what.jpeg'; // Update with actual path
import { User } from '../../types/User.types';
import { Link } from 'react-router-dom';

interface ProfileCardProps {
  userData: User;
}


const ProfileCard: React.FC<ProfileCardProps> = ({ userData }) => {
  const user: User = userData

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.setItem('isAuthenticated', 'false')
    window.location.href = "/";
  }

  return (
    <div className=" flex items-start justify-between gap-8 p-6 px-10 bg-gray-900 text-white rounded-lg shadow-lg auto">
      {/* Leftmost section with image */}
      <div className="flex-shrink-0 w-60 h-60 bg-gray-800  overflow-hidden">
        <img src={TempImage} alt="Profile" className="w-full h-full object-cover" />
      </div>

      {/* Middle section with name, username, and bio */}
      <div className="flex-1 mx-6">
        <div className="text-2xl font-semibold">{user.fullname}</div>
        <div className="text-gray-400">{user.username}</div>
        <div className="mt-4 text-gray-300">
          <p>
            {user.summary}
          </p>
        </div>
      </div>

      {/* Rightmost section with popularity and edit button */}
      <div className="flex flex-col items-start gap-4">
        <div className="bg-transparent py-2 flex gap-3 items-end">
          <span className="text-xl font-bold ">Popularity</span>
          <div className="text-xl font-bold text-white bg-orange-600  rounded-full p-4 py-px">1203</div>
        </div>
        <Link to={`/profile/${user._id}/edit/general`}>
          <div className="px-4 py-1 bg-gray-700 text-white text-lg font-semibold rounded-sm hover:bg-green-600">
            Edit Profile
          </div>
        </Link>
        <button
          className="px-4 py-1 bg-gray-700 text-white text-lg font-semibold rounded-sm hover:bg-green-600"
          onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;

