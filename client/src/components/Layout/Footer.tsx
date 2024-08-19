import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-600 pb-4  ">
      <div className="container mx-auto text-center border-b border-gray-700 py-4">
        <p>&copy; 2024 Quizy. All Rights Reserved.</p>
      </div>
      <div className="container mx-auto text-center mt-4">
        <ul className="flex justify-center space-x-4">
          <li><Link to="/about" className="hover:text-white">About</Link></li>
          <li>|</li>
          <li><a href="#" className="hover:text-white">Contact</a></li>
          <li>|</li>
          <li><a href="#" className="hover:text-white">Report</a></li>
          <li>|</li>
          <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          <li>|</li>
          <li><a href="#" className="hover:text-pink-500">Instagram</a></li>
          <li>|</li>
          <li><a href="#" className="hover:text-blue-500">Discord</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

