import React from "react";
import { Link } from "react-router-dom";


const Home: React.FC = () => {



  return (
    <div className="flex bg-zinc-200">

      <Link to="/permission">
        <div className="border border-black w-96 h-20 text-black">
          GO FOR QUIZ
        </div>
      </Link>
    </div >
  );
}

export default Home;

