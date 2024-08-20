import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { User } from '../../types/User.types';

const Navbar: React.FC = () => {

  const domain = import.meta.env.VITE_SERVER_URL as string;
  const [user, setUser] = useState<User>({} as User)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {

    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      const token = localStorage.getItem("token");
      if (token) {
        axios.get(`${domain}/profile/user`, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(response => setUser(response.data))
          .catch(error => console.error("ERROR AXIOS: ", error));
      }
    } else {
      setIsAuthenticated(false);
    }
  }
    , []);



  return (
    <div className="w-full bg-zinc-800 h-12 flex justify-between items-center p-4 border-b border-gray-700">
      <Link to="/" className="flex items-center" id="logo">
        <div className="text-2xl text-green-500 font-bold">Quizy</div>
      </Link>

      <ul className="flex gap-6">
        <li className="text-white hover:text-green-600 transition duration-300">
          <Link to="/">Home</Link>
        </li>
      </ul>

      <div className="flex gap-3" id="profile">
        {isAuthenticated ? (
          <Link to={`/profile/${user._id}`}>
            <div className=" text-white hover:text-green-600 transition duration-300">
              Profile
            </div>
          </Link>
        ) : (
          <Link to="/auth/log_in">
            <div className=" text-white hover:text-green-600 transition duration-300">
              Login
            </div>
          </Link>
        )}
      </div>
      {/* <div className=''> */}
      {/**/}
      {/* </div> */}
    </div >
  );
}

export default Navbar;
