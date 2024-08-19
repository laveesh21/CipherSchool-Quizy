import Navbar from './components/Layout/Navbar';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/ProfilePage/Profile';
// import Footer from './components/Layout/Footer';
import LogIn from './pages/Auth/Login';
import SignUp from './pages/Auth/Signup';
import EditProfile from './pages/ProfilePage/EditProfile';
import Quiz from './pages/Quiz';


function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/profile/:id/edit/*" element={<EditProfile />} />
            <Route path="/auth/log_in" element={<LogIn />} />
            <Route path="/auth/sign_up" element={<SignUp />} />
            <Route path="/quiz/category" element={<Quiz />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  )
}

export default App
