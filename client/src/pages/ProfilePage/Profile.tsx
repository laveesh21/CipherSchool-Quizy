import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { User } from "../../types/User.types";

import ProfileCard from "../../components/Profile/ProfileCard";
import axios from 'axios'


const Profile: React.FC = () => {

  const domain = import.meta.env.VITE_REACT_APP_DOMAIN as string;
  const [user, setUser] = useState<User>({} as User)

  const location = useLocation();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get(`${domain}/profile/user`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(response => setUser(response.data))
        .catch(error => console.error("ERROR AXIOS: ", error))
    }
  }, [location]);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <div className="w-[960px] bg-gray-900 flex justify-center mt-5">

        <div className="w-[960px] h-auto mb-20">
          <Routes>
            <Route path={`/:id`} element={<ProfileCard userData={user} />} />
          </Routes>
        </div>
      </div>
    </div>



  );
};

export default Profile;

