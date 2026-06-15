import './App.css'

import { Routes, Route, Link } from 'react-router-dom'

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import CreateComment from "./pages/CreateComment"
import MyPost from "./pages/MyPost"
import Profile from "./pages/Profile"
import Upload from "./pages/Upload"
import Friends from "./pages/Friends"



function App() {

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/create-comment/:postId" element={<CreateComment />} /> 
        <Route path="/my-posts" element={<MyPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/friends" element={<Friends />} />
        </Routes>
      </>
  )
}

export default App
