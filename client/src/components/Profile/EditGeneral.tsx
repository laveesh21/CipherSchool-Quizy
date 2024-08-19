import React, { useState } from "react";
import axios from "axios";

const EditGeneral: React.FC = () => {

  const domain = import.meta.env.VITE_REACT_APP_DOMAIN as string;

  const [username, setUsername] = useState<string>("");
  const [fullname, setFullName] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const updatedUser = {
      username,
      fullname,
      summary,
    };

    try {
      const response = await axios.patch(
        `${domain}/profile/update`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.log("ERROR WHILE UPDATING")
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="px-4 text-white">
      <h2 className="text-3xl font-semibold text-white">About</h2>
      <p className="text-gray-300">
        Set up your ApexDevs profile. Provide additional information like your
        name and a brief summary which can tell other devs more about you and help others to know more about you.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-start my-10 gap-2">
        <h2 className="text-sm text-white">GENERAL</h2>
        <div className="bg-gray-600 w-full h-[1px] mb-2" />

        {/* Username Field */}
        <div className="w-full mb-4">
          <label className="text-xs text-gray-300">USERNAME</label>
          <input
            type="text"
            className="w-full h-10 bg-zinc-800 px-4 py-2"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Full Name Field */}
        <div className="w-full mb-4">
          <label className="text-xs text-gray-300">FULL NAME</label>
          <input
            type="text"
            className="w-full h-10 bg-zinc-800 px-4 py-2"
            placeholder="Enter your full name"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Summary Field */}
        <h2 className="text-sm text-white mt-5">SUMMARY</h2>
        <div className="bg-gray-600 w-full h-[1px] mb-2" />

        <div className="w-full mb-4">
          <textarea
            className="w-full h-24 bg-zinc-800 px-4 py-2"
            placeholder="Write a brief summary about yourself"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditGeneral;

