import React from "react";
import { Link } from "react-router-dom";
import QuizImg from "../assets/quiz.jpg";

const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-green-300">

      <Link to="/permission">
        <div className="flex items-center justify-center text-2xl border-white border-4 w-96 h-20 text-white font-semibold z-10 relative bg-black rounded-lg shadow-lg">
          <p className="relative z-10">CLICK TO START QUIZ</p>
          <div className="absolute inset-0 rounded-lg border-2 border-white opacity-60 blur-sm filter"></div>
        </div>
      </Link>

      <div className="absolute inset-0">
        <img
          src={QuizImg}
          alt="Quiz"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
}

export default Home;

