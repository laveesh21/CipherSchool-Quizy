import React, { useState, FormEvent } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { Link, useNavigate } from 'react-router-dom';

const inputBorder = "w-full p-2 px-5 rounded-full bg-transparent border-2 border-gray-400 text-white placeholder-gray-400 focus:border-gray-400 focus:outline-none";

const SignUp: React.FC = () => {
  const domain = import.meta.env.VITE_SERVER_URL as string;
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [agreement, setAgreement] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!fullname || !username || !email || !password || agreement !== true) {
      alert('Please fill in all fields and agree to the terms.');
      return;
    }

    try {
      const response = await axios.post(`${domain}/auth/register`, {
        username,
        email,
        password,
        fullname,
      });

      console.log('Signup successful:', response.data);
      navigate('/auth/log_in');

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex justify-center my-36 text-white">
      <div className="w-[600px] p-8 rounded-lg bg-zinc-900 shadow-white-soft">
        <h1 className="text-center text-3xl font-extrabold mb-6">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className='flex justify-between gap-5'>

            <div className="">
              <label htmlFor="username" className="ml-3 text-sm">Username:</label>
              <input
                type="text"
                className={`${inputBorder}`}
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="">
              <label htmlFor="fullname" className="ml-3 text-sm">Full Name:</label>
              <input
                type="text"
                className={`${inputBorder}`}
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="ml-3 text-sm">Email ID:</label>
            <input
              type="email"
              className={`${inputBorder}`}
              id="emailInput"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="ml-3 text-sm">Password:</label>
            <input
              type="password"
              className={`${inputBorder}`}
              id="passwordInput"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agreement"
              name="agreement"
              checked={agreement}
              onChange={(e) => setAgreement(e.target.checked)}
              className="accent-green-600 scale-125"
              required
            />
            <label htmlFor="agreement" className='text-sm'>
              I agree to the <a href="https://google.com" className="text-sm text-green-600 hover:underline">terms and conditions.</a>
            </label>
          </div>

          <div className='w-full text-center'>
            <button
              className="w-1/2 py-2 text-white rounded-full bg-green-600 text-lg font-semibold shadow-md hover:bg-green-700 focus:outline-none"
              type="submit">
              Sign Up
            </button>
          </div>
          <div className="text-center text-sm mt-5">
            Alredy have an account?{" "}
            <Link to="/auth/log_in" className="font-medium text-green-600 hover:underline">
              Login
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SignUp;
